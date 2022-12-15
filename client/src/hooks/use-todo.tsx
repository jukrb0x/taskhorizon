import { useEventStore, useTodoStore } from '@/store';
import { Todo } from '@/store/todo-store';
import { http, TodoAPI } from '@/apis';
import useSWR from 'swr';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

export const useTodo = () => {
    const { data, error, isLoading, mutate } = useSWR<Todo[]>('/todo/all', fetcher, {
        onSuccess: (data) => compareWithStore(data)
    });

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

    // DATA SWR

    const compareWithStore = (todos: Todo[] /*, addTodoInternal, setTodoInternal*/) => {
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

    // CLIENT SIDE FUNCTIONS

    const updateLinkedEvents = (todo: Todo) => {
        todo.linkedEvents?.forEach((eventId) => {
            const event = getEventById(eventId);
            if (event) {
                // todo
                setEventInternal(eventId, {
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
        const created = await TodoAPI.createTodo(todo);
        if (created) {
            addTodoInternal(todo);
        }
        return created;
    };

    const setTodo = async (id: string, todo: Todo) => {
        const updated = await TodoAPI.updateTodoById(id, todo);
        if (updated) {
            updateLinkedEvents(setTodoInternal(id, todo));
        }
        return updated;
    };

    const toggleCompleted = (id: string) => {
        const todo = getTodoById(id);
        if (todo) {
            updateLinkedEvents(toggleTodoCompleted(id));
        }
    };

    const removeTodo = async (id: string) => {
        const deletedTodo = await TodoAPI.deleteTodoById(id);
        if (deletedTodo) {
            removeTodoInternal(id).linkedEvents?.forEach((eventId) => {
                // remove all linked events
                // TODO remove from use-event
                removeEventInternal(eventId);
            });
        }
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
