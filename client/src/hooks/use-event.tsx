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
        removeEvent,
        toggleCompleted: toggleEventCompleted
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
        const toggedEvent = toggleEventCompleted(id);
        if (toggedEvent) updateLinkedTodos(toggedEvent);
    };

    const setEvent = (id: string, newEvent: CalendarEvent) => {
        updateLinkedTodos(setEventInternal(id, newEvent));
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
