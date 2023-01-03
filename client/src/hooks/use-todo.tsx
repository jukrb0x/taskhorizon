import useSWR, { KeyedMutator } from 'swr';

import { TodoAPI, http } from '@/apis';
import { EventClient } from '@/hooks/use-event';
import { CalendarEvent, useEventStore, useTodoStore } from '@/store';
import useAppConfigStore from '@/store/config-store';
import { Todo } from '@/store/todo-store';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

// ---------
// CLIENT-SIDE FUNCTIONS
// ---------

/**
 * @description update linked events title and completed status if there is any linked event
 * @description only make local store change but the server is on charge of the actual updates
 * @param todo
 */
const locallyUpdateLinkedEventsToTodo = (todo: Todo) => {
    const events: CalendarEvent[] = todo.linkedEvents.map(
        (eventId) => useEventStore.getState().getEventById(eventId) as CalendarEvent
    );
    const newEvents = events.map((event) => ({
        ...event,
        title: todo.title,
        completed: todo.completed
    }));

    events && EventClient.setEvents(newEvents, false);
};

/**
 * @TODO visualization performance [#32](https://github.com/jukrb0x/taskhorizon/issues/32)
 * 1. add this action to action stack, pending status
 * 2. add todo to the local store
 * 3. Promise return successful, update stack status to success
 * 4. Promise return failed, update stack status to failed
 * 5. if failed, remove todo from local store
 */
const addTodo = async (todo: Todo, data: Todo[] | undefined, mutate: KeyedMutator<Todo[]>) => {
    data && (await mutate([...data, todo]));
    useTodoStore.getState().addTodo(todo);
    await TodoAPI.createTodo(todo);
};

/**
 * @description [Client Action] SetTodo
 * @description local store update --> local linked mutation --> server atomic action
 * @param i
 * @param todo
 * @param data
 * @param mutate
 */
const setTodo = async (
    id: string,
    todo: Todo,
    data?: Todo[] | undefined,
    mutate?: KeyedMutator<Todo[]>
) => {
    useTodoStore.getState().setTodo(id, todo);
    locallyUpdateLinkedEventsToTodo(todo);
    const updated = await TodoAPI.updateTodo(todo);
    mutate && (await mutate(data?.map((t) => (t.id === id ? updated : t))));
    return updated;
};

const toggleTodoCompleted = async (id: string) => {
    const toggled = useTodoStore.getState().toggleCompleted(id);
    await setTodo(toggled.id, toggled);
};

const removeTodo = async (id: string, data?: Todo[] | undefined, mutate?: KeyedMutator<Todo[]>) => {
    const { removeTodo } = useTodoStore.getState();
    data && mutate && (await mutate(data.filter((todo) => todo.id !== id)));
    // remove the todo will also remove the linked events in the server
    await TodoAPI.deleteTodoById(id);
    // remove the linked events in local store for visual consistency
    await EventClient.removeEvents(removeTodo(id).linkedEvents, false);
};

export const useTodo = (shouldFetch = true) => {
    const { offlineMode } = useAppConfigStore();
    const { data, error, isLoading, mutate } = useSWR<Todo[]>(
        !offlineMode ? '/todo/all' : null,
        fetcher,
        {
            onSuccess: (data) => compareWithStore(data)
        }
    );

    // ---------
    // STORE
    // ---------
    const { getEventById } = useEventStore();
    const {
        todoList,
        addTodo: addTodoInternal,
        setTodo: setTodoInternal,
        removeTodo: removeTodoInternal,
        dragItem,
        setDragItem,
        clearDragItem,
        getTodoById
    } = useTodoStore();

    const compareWithStore = (todos: Todo[]) => {
        if (todos) {
            todos.forEach((todo) => {
                const storeTodo = getTodoById(todo.id);
                if (!storeTodo) {
                    addTodoInternal(todo);
                } else if (storeTodo.updatedAt !== todo.updatedAt) {
                    setTodoInternal(todo.id, todo);
                }
            });

            // remove todos that are not in the server
            todoList.forEach((todo) => {
                if (!todos.find((t) => t.id === todo.id)) {
                    removeTodoInternal(todo.id);
                }
            });
        }
    };

    const addTodoWrapper = async (todo: Todo) => {
        await addTodo(todo, data, mutate);
    };

    const setTodoWrapper = async (id: string, newTodo: Todo) => {
        await setTodo(id, newTodo, data, mutate);
    };

    const toggleTodoCompletedWrapper = async (id: string) => {
        await toggleTodoCompleted(id);
    };

    const removeTodoWrapper = async (id: string) => {
        await removeTodo(id, data, mutate);
    };

    return {
        todoList,
        dragItem,
        setDragItem,
        clearDragItem,
        setTodo: setTodoWrapper,
        addTodo: addTodoWrapper,
        toggleCompleted: toggleTodoCompletedWrapper,
        removeTodo: removeTodoWrapper,
        getEventById
    };
};

export const TodoClient = {
    addTodo,
    setTodo,
    removeTodo,
    updateLinkedEventsToTodo: locallyUpdateLinkedEventsToTodo
};
