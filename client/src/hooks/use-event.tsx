import { useEventStore, useTodoStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';

/**
 * @description useTodo hook to manage the TodoList and binding with the EventList
 */
export const useEvent = () => {
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
        addTodo,
        setTodo,
        toggleCompleted: toggleTodoCompleted,
        removeTodo,
        setDragItem,
        clearDragItem,
        getTodoById
    } = useTodoStore();

    const updateLinkedTodos = (event: CalendarEvent) => {
        event.linkedTodos?.forEach((todoId) => {
            const todo = getTodoById(todoId);
            if (todo) {
                setTodo(todoId, {
                    ...todo,
                    title: event.title,
                    completed: event.completed
                });
            }
        });
    };

    const toggleCompleted = (id: string) => {
        const event = getEventById(id);
        if (event) {
            updateLinkedTodos(toggleEventCompleted(id));
        }
    };

    const setEvent = (id: string, newEvent: CalendarEvent) => {
        updateLinkedTodos(setEventInternal(id, newEvent));
    };
    const removeEvent = (id: string) => {
        removeEventInternal(id).linkedTodos?.forEach((todoId) => {
            removeTodo(todoId);
        });
    };

    return {
        eventList,
        setEvent,
        addEvent,
        addLinkedTodo,
        toggleCompleted,
        removeEvent
    };
};
