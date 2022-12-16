import { useEventStore, useTodoStore } from '@/store';
import { Todo } from '@/store/todo-store';
import { http, TodoAPI } from '@/apis';
import useSWR from 'swr';
import { useEvent } from '@/hooks/use-event';
import { should } from 'vitest';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

export const useTodo = (shouldFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR<Todo[]>(
        shouldFetch ? '/todo/all' : null,
        fetcher,
        {
            onSuccess: (data) => compareWithStore(data)
        }
    );

    const {
        eventList,
        setEvent: setEventInternal,
        addEvent,
        addLinkedTodo,
        removeEvent: removeEventInternal,
        toggleCompleted: toggleEventCompleted,
        getEventById
    } = useEventStore();
    const {
        todoList,
        addTodo: addTodoInternal,
        setTodo: setTodoInternal,
        toggleCompleted: toggleTodoCompleted,
        removeTodo: removeTodoInternal,
        dragItem,
        setDragItem,
        clearDragItem,
        getTodoById,
        addLinkedEvent
    } = useTodoStore();

    // ----------------------------
    // DATA SWR
    // ----------------------------

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

    // ----------------------------
    // CLIENT SIDE FUNCTIONS
    // ----------------------------

    const updateLinkedEventsToTodo = (todo: Todo) => {
        todo.linkedEvents?.forEach(async (eventId) => {
            const event = getEventById(eventId);
            if (event) {
                await useEvent(false).setEvent(eventId, {
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
    const addTodo = async (todo: Todo) => {
        // FIXME: when exactly should i mutate...?
        data && (await mutate([...data, todo]));
        addTodoInternal(todo);
        await TodoAPI.createTodo(todo);
    };

    const setTodo = async (id: string, todo: Todo, drilldown = shouldFetch) => {
        // FIXME: if mutate, we have bit of lag to see the change..???
        // data && (await mutate(data.map((t) => (t.id === id ? todo : t))));
        setTodoInternal(id, todo);
        if (drilldown) {
            updateLinkedEventsToTodo(todo);
        }
        return await TodoAPI.updateTodo(todo);
    };

    const toggleCompleted = async (id: string, drilldown = shouldFetch) => {
        // FIXME: mutating cause lag as well as mutating on setTodo
        //        guess it's because of the calculation & re-rendering
        // data && await mutate([
        //     ...data.map((todo) =>
        //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
        //     )
        // ]);
        const toggled = toggleTodoCompleted(id);
        if (drilldown) {
            updateLinkedEventsToTodo(toggled);
        }
    };

    const removeTodo = async (id: string) => {
        // FIXME: same as above
        // data && await mutate(data.filter((todo) => todo.id !== id));
        removeTodoInternal(id).linkedEvents?.forEach((eventId) => {
            // remove all linked events
            useEvent(false).removeEvent(eventId);
        });
        return await TodoAPI.deleteTodoById(id);
    };

    return {
        todoList,
        dragItem,
        setDragItem,
        clearDragItem,
        addLinkedEvent,
        setTodo,
        addTodo,
        toggleCompleted,
        removeTodo,
        getEventById
    };
};
