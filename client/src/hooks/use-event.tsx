import { Todo, useEventStore, useTodoStore } from '@/store';
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
        getTodoById,
        removeLinkedEvent
    } = useTodoStore();

    /**
     * @description update the linked todos when the event is updated
     * @description usually Event has only one linked Todo
     * @param event
     */
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

    /**
     * @param id
     * @description Toggle Event completed status
     * @description Event (n - 1) Todo
     * @description Linked Todos (1) will be checked when all linked events (n) is completed
     */
    const toggleCompleted = (id: string) => {
        const event = getEventById(id);
        if (event) {
            const toggledEvent = toggleEventCompleted(id);
            // process linked todos, usually it's only one linked todo for one event
            toggledEvent.linkedTodos?.forEach((todoId) => {
                const todo = getTodoById(todoId) as Todo;
                const uncompletedEvents = todo?.linkedEvents?.filter((eventId) => {
                    const event = getEventById(eventId);
                    return !event?.completed;
                });
                if (uncompletedEvents?.length == 0) {
                    // all linked events are completed
                    setTodo(todoId, { ...todo, completed: true });
                } else {
                    setTodo(todoId, { ...todo, completed: false });
                }
            });
        }
    };

    /**
     * @param id
     * @param newEvent
     * @description update the event and it's linked todos, the linked events of linked todos will also be updated ONLY for the title and description.
     */
    const setEvent = (id: string, newEvent: CalendarEvent) => {
        updateLinkedTodos(setEventInternal(id, newEvent));

        /**
         * update ONLY TITLE, DESC for linked events from linked todos
         * UPDATE LOGIC: the event --> linked todos --> linked events --> update events
         */
        getEventById(id)?.linkedTodos?.forEach((todoId) => {
            getTodoById(todoId)?.linkedEvents?.forEach((eventId) => {
                const e = getEventById(eventId) as CalendarEvent;
                setEventInternal(eventId, {
                    ...e,
                    title: newEvent.title,
                    desc: newEvent.desc
                });
            });
        });
    };

    const removeEvent = (id: string) => {
        const removedEvent = removeEventInternal(id);
        removedEvent.linkedTodos?.forEach((todoId) => {
            // remove the event from linked todo,
            // usually it's only one linked todo for one event
            removeLinkedEvent(todoId, removedEvent.id);
        });
        // remove all linked todos only if all linked events are removed
        removedEvent.linkedTodos?.forEach((todoId) => {
            const todo = getTodoById(todoId);
            if (todo?.linkedEvents?.length == 0) {
                removeTodo(todoId);
            }
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
