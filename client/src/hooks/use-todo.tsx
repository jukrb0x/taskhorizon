import { useEventStore, useTodoStore } from '@/store';
import { Todo } from '@/store/todo-store';
import { TodoAPI } from '@/apis';

export const useTodo = () => {
    const {
        eventList,
        setEvent,
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

    const updateLinkedEvents = (todo: Todo) => {
        todo.linkedEvents?.forEach((eventId) => {
            const event = getEventById(eventId);
            if (event) {
                setEvent(eventId, {
                    ...event,
                    title: todo.title,
                    completed: todo.completed
                });
            }
        });
    };
    /**
     * @TODO visualization performance
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

    const setTodo = (id: string, todo: Todo) => {
        updateLinkedEvents(setTodoInternal(id, todo));
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
