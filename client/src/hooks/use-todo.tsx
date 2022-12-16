import { CalendarEvent, useEventStore, useTodoStore } from '@/store';
import { Todo } from '@/store/todo-store';
import { http, TodoAPI } from '@/apis';
import useSWR, { KeyedMutator } from 'swr';
import { removeEvent, setEvent, useEvent } from '@/hooks/use-event';
import { should } from 'vitest';
import { EventAPI } from '@/apis/event';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

// ---------
// CLIENT-SIDE FUNCTIONS
// ---------

const updateLinkedEventsToTodo = (todo: Todo) => {
    todo.linkedEvents?.forEach(async (eventId) => {
        const event = useEventStore.getState().getEventById(eventId);
        if (event) {
            // TODO useles
            await setEvent(eventId, {
                ...event,
                title: todo.title,
                completed: todo.completed
            });
        }
    });
};

/**
 * @TODO visualization performance [#32](https://github.com/jukrb0x/taskhorizon/issues/32)
 * 1. add this action to action stack, pending status
 * 2. add todo to the local store
 * 3. Promise return successful, update stack status to success
 * 4. Promise return failed, update stack status to failed
 * 5. if failed, remove todo from local store
 */
export const addTodo = async (
    todo: Todo,
    data: Todo[] | undefined,
    mutate: KeyedMutator<Todo[]>
) => {
    // FIXME: when exactly should i mutate...?
    data && (await mutate([...data, todo]));
    useTodoStore.getState().addTodo(todo);
    await TodoAPI.createTodo(todo);
};

export const setTodo = async (
    id: string,
    todo: Todo,
    drillDown = false,
    data?: Todo[] | undefined,
    mutate?: KeyedMutator<Todo[]>
) => {
    // FIXME: if mutate, we have bit of lag to see the change..???
    // data && (await mutate(data.map((t) => (t.id === id ? todo : t))));
    useTodoStore.getState().setTodo(id, todo);
    if (drillDown) {
        updateLinkedEventsToTodo(todo);
    }
    return await TodoAPI.updateTodo(todo);
};

const toggleTodoCompleted = async (id: string, drillDown = false) => {
    // FIXME: mutating cause lag as well as mutating on setTodo
    //        guess it's because of the calculation & re-rendering
    // data && await mutate([
    //     ...data.map((todo) =>
    //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //     )
    // ]);
    const toggled = useTodoStore.getState().toggleCompleted(id);
    if (drillDown) {
        updateLinkedEventsToTodo(toggled);
    }
};

const removeTodo = async (id: string, data?: Todo[] | undefined, mutate?: KeyedMutator<Todo[]>) => {
    const { removeTodo } = useTodoStore.getState();
    data && mutate && (await mutate(data.filter((todo) => todo.id !== id))); // TODO
    removeTodo(id).linkedEvents?.forEach((eventId) => {
        // remove all linked events
        removeEvent(eventId);
    });
    return await TodoAPI.deleteTodoById(id);
};

export const useTodo = (shouldFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR<Todo[]>(
        shouldFetch ? '/todo/all' : null,
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
        getTodoById,
        addLinkedEvent
    } = useTodoStore();

    const compareWithStore = (todos: Todo[]) => {
        console.log('compareWithStore', todos);
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
        await setTodo(id, newTodo, true, data, mutate);
    };

    const toggleTodoCompletedWrapper = async (id: string) => {
        await toggleTodoCompleted(id, true);
    };

    // const removeLinkedEvent = async (todoId: string, eventId: string) => {
    //     removeLinkedEventInternal(todoId, eventId);
    //     // TODO
    //     return await EventAPI.deleteEventById();
    // };
    //
    // TODO try to decouple..
    // const removeEvent = async (id: string) => {
    //     const removedEvent = removeEventInternal(id);
    //
    //     removedEvent.linkedTodos?.forEach((todoId) => {
    //         // remove the event from linked todo,
    //         // usually it's only one linked todo for one event
    //         const updated = removeLinkedEvent(todoId, removedEvent.id);
    //         TodoAPI.updateTodo(updated);
    //     });
    //
    //     // remove all linked todos only if all linked events are removed
    //     removedEvent.linkedTodos?.forEach((todoId) => {
    //         const todo = getTodoById(todoId);
    //         if (todo?.linkedEvents?.length == 0) {
    //             removeTodoInternal(todoId);
    //             TodoAPI.deleteTodoById(todoId);
    //         }
    //     });
    // };

    const removeTodoWrapper = async (id: string) => {
        await removeTodo(id, data, mutate);
    };

    const addLinkedEventWrapper = async (todoId: string, eventId: string) => {
        await TodoAPI.updateTodo(addLinkedEvent(todoId, eventId));
    };

    return {
        todoList,
        dragItem,
        setDragItem,
        clearDragItem,
        addLinkedEvent: addLinkedEventWrapper,
        setTodo: setTodoWrapper,
        addTodo: addTodoWrapper,
        toggleCompleted: toggleTodoCompletedWrapper,
        removeTodo: removeTodoWrapper,
        getEventById
    };
};
