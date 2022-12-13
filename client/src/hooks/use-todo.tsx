import { useEventStore, useTodoStore } from '@/store';
import { Todo } from '@/store/todo-store';

export const useTodo = () => {
    const {
        eventList,
        setEvent,
        addEvent,
        addLinkedTodo,
        removeEvent,
        toggleCompleted: toggleEventCompleted,
        getEventById
    } = useEventStore();
    const {
        todoList,
        addTodo,
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
    const setTodo = (id: string, todo: Todo) => {
        updateLinkedEvents(setTodoInternal(id, todo));
    };

    const toggleCompleted = (id: string) => {
        const todo = getTodoById(id);
        if (todo) {
            updateLinkedEvents(toggleTodoCompleted(id));
        }
    };

    const removeTodo = (id: string) => {
        removeTodoInternal(id).linkedEvents?.forEach((eventId) => {
            // remove all linked events
            removeEvent(eventId);
        });
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
