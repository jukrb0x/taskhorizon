import { Todo, useEventStore, useTodoStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { EventAPI } from '@/apis/event';
import { http, TodoAPI } from '@/apis';
import useSWR from 'swr';
import { useTodo } from '@/hooks/use-todo';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

/**
 * @description useTodo hook to manage the TodoList and binding with the EventList
 */
export const useEvent = (shouldFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR<CalendarEvent[]>(
        shouldFetch ? '/event/all' : null,
        fetcher,
        {
            onSuccess: (data) => compareWithStore(data)
        }
    );

    const {
        eventList,
        setEvent: setEventInternal,
        addEvent: addEventInternal,
        addLinkedTodo,
        removeEvent: removeEventInternal,
        toggleCompleted: toggleEventCompleted,
        getEventById
    } = useEventStore();
    const {
        todoList,
        addTodo,
        setTodo: setTodoInternal,
        toggleCompleted: toggleTodoCompleted,
        removeTodo: removeTodoInternal,
        setDragItem,
        clearDragItem,
        getTodoById,
        removeLinkedEvent
    } = useTodoStore();

    // DATA SWR

    const compareWithStore = (events: CalendarEvent[]) => {
        if (events) {
            events.forEach((event) => {
                // parse date, not pure
                event.start = new Date(event.start);
                event.end = new Date(event.end);

                const storeEvent = getEventById(event.id);
                if (!storeEvent) {
                    addEventInternal(event);
                } else if (storeEvent.updatedAt !== event.updatedAt) {
                    setEventInternal(event.id, event);
                }
            });

            // remove events that are not in the server
            eventList.forEach((event) => {
                if (!events.find((e) => e.id === event.id)) {
                    removeEventInternal(event.id);
                }
            });
        }
    };

    // CLIENT SIDE FUNCTIONS

    const addEvent: (event: CalendarEvent) => Promise<CalendarEvent | undefined> = async (
        event: CalendarEvent
    ) => {
        const created = await EventAPI.createEvent(event);
        if (created) {
            addEventInternal(event);
            return event;
        }
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
                    setTodoInternal(todoId, { ...todo, completed: true });
                } else {
                    setTodoInternal(todoId, { ...todo, completed: false });
                }
            });
        }
    };

    /**
     * @description update the linked todos when the event is updated
     * @description usually Event has only one linked Todo
     * @param event
     */
    const updateLinkedTodosToEvent = (event: CalendarEvent) => {
        event.linkedTodos?.forEach(async (todoId) => {
            const todo = getTodoById(todoId);
            if (todo) {
                await useTodo(false).setTodo(todoId, {
                    ...todo,
                    title: event.title,
                    completed: event.completed
                });
            }
        });
    };

    /**
     * @description update the linked events of linked todos
     * update ONLY TITLE, DESC
     * UPDATE LOGIC: the event --> linked todos --> linked events --> update events
     */
    const updateLinkedEventsToEvent = (event: CalendarEvent) => {
        event.linkedTodos?.forEach((todoId) => {
            getTodoById(todoId)?.linkedEvents?.forEach(async (eventId) => {
                const toUpdate = {
                    ...(getEventById(eventId) as CalendarEvent),
                    title: event.title,
                    desc: event.desc
                };
                await useEvent(false).setEvent(eventId, event);
                await EventAPI.updateEvent(toUpdate);
            });
        });
    };

    /**
     * @param id
     * @param newEvent
     * @param drilldown
     * @description update the event, and it's linked todos, the linked events of linked todos will also be updated ONLY for the title and description.
     */
    const setEvent = async (id: string, newEvent: CalendarEvent, drilldown = shouldFetch) => {
        // await mutate([...eventList.filter((event) => event.id !== id), newEvent]);
        setEventInternal(id, newEvent);
        const updated = await EventAPI.updateEvent(newEvent); // update the event itself
        if (drilldown) {
            updateLinkedTodosToEvent(newEvent);
            updateLinkedEventsToEvent(newEvent);
        }

        if (updated) {
            // notice that we pass the newEvent to the store, not the updated one
            // because the date in the updated one is string, not Date
        }
        // updateLinkedTodosToEvent(setEventInternal(id, newEvent));

        /*    /!**
             * @description update the linked events of linked todos
             * update ONLY TITLE, DESC
             * UPDATE LOGIC: the event --> linked todos --> linked events --> update events
             *!/
            getEventById(id)?.linkedTodos?.forEach((todoId) => {
                getTodoById(todoId)?.linkedEvents?.forEach((eventId) => {
                    const e = getEventById(eventId) as CalendarEvent;
                    setEventInternal(eventId, {
                        // todo
                        ...e,
                        title: newEvent.title,
                        desc: newEvent.desc
                    });
                });
            });*/
    };

    // TODO
    const removeEvent = async (id: string) => {
        await mutate(eventList.filter((event) => event.id !== id));
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
                removeTodoInternal(todoId);
            }
        });
    };

    return {
        eventList,
        setEvent,
        addEvent,
        addLinkedTodo,
        toggleCompleted,
        removeEvent,
        getEventById
    };
};
