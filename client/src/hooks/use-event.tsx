import { Todo, useEventStore, useTodoStore } from '@/store';
import { CalendarEvent } from '@/store/event-store';
import { EventAPI } from '@/apis/event';
import { http, TodoAPI } from '@/apis';
import useSWR, { KeyedMutator } from 'swr';
import { setTodo, useTodo } from '@/hooks/use-todo';

const fetcher = (url: string) => {
    // http.interceptors.response.clear(); // clear all notification
    return http.get(url).then((res) => res.data);
};

export const addEvent: (
    event: CalendarEvent,
    data: CalendarEvent[] | undefined,
    mutate: KeyedMutator<CalendarEvent[]>
) => Promise<CalendarEvent | undefined> = async (event: CalendarEvent) => {
    const created = await EventAPI.createEvent(event);
    if (created) {
        useEventStore.getState().addEvent(event);
        return event;
    }
};

/**
 * @param id
 * @param newEvent
 * @param drilldown
 * @description update the event, and it's linked todos, the linked events of linked todos will also be updated ONLY for the title and description.
 */
export const setEvent = async (
    id: string,
    newEvent: CalendarEvent,
    propagation = false,
    data?: CalendarEvent[] | undefined,
    mutate?: KeyedMutator<CalendarEvent[]>
) => {
    // await mutate([...eventList.filter((event) => event.id !== id), newEvent]);
    useEventStore.getState().setEvent(id, newEvent);
    if (propagation) {
        await updateLinkedTodosToEvent(newEvent);
        await updateLinkedEventsToEvent(newEvent);
    }
    return await EventAPI.updateEvent(newEvent); // update the event itself
};

export const setEvents = async (events: CalendarEvent[], useAPI: boolean) => {
    const { getEventById, setEvent } = useEventStore.getState();
    events.forEach((event) => {
        const exist = getEventById(event.id);
        if (exist) {
            setEvent(event.id, event);
            if (useAPI) EventAPI.updateEvent(event);
        } else {
            throw new Error('Event not found');
        }
    });
};

export const removeEvents = async (ids: string[], useAPI: boolean) => {
    const { removeEvents } = useEventStore.getState();
    removeEvents(ids);
    if (useAPI) await EventAPI.deleteEvents(ids);
};

export const removeEvent = async (
    id: string,
    data?: CalendarEvent[] | undefined,
    mutate?: KeyedMutator<CalendarEvent[]>
) => {
    const { getTodoById, removeLinkedEvent, removeTodo } = useTodoStore.getState();
    const { eventList, removeEvent } = useEventStore.getState();

    mutate && (await mutate(eventList.filter((event) => event.id !== id)));
    const removedEvent = removeEvent(id);
    // remove the event linkage from its linked todos,
    // usually it's only ONE linked todo on ONE event
    removedEvent.linkedTodos?.forEach((todoId) => {
        const todo = getTodoById(todoId);
        if (todo?.linkedEvents?.length == 0) {
            // remove the linked todo if it has no linked events
            removeTodo(todoId);
            TodoAPI.deleteTodoById(todoId);
        } else {
            // remove the linkage in the linked todos
            const updated = removeLinkedEvent(todoId, removedEvent.id);
            TodoAPI.updateTodo(updated);
        }
    });
    return EventAPI.deleteEventById(id);
    // return removedEvent;
};

/**
 * @param id
 * @description Toggle Event completed status
 * @description Event (n - 1) Todo
 * @description Linked Todos (1) will be checked when all linked events (n) is completed
 */
const toggleEventCompleted = (id: string) => {
    const { getEventById, toggleCompleted } = useEventStore.getState();
    const { getTodoById } = useTodoStore.getState();
    const event = getEventById(id);
    if (event) {
        const toggledEvent = toggleCompleted(id);
        // process linked todos, usually it's only one linked todo for one event
        toggledEvent.linkedTodos?.forEach(async (todoId) => {
            const todo = getTodoById(todoId) as Todo;
            const uncompletedEvents = todo?.linkedEvents?.filter((eventId) => {
                const event = getEventById(eventId);
                return !event?.completed;
            });
            if (uncompletedEvents?.length == 0) {
                // all linked events are completed
                const next = {
                    ...todo,
                    completed: true
                };
                await setTodo(todoId, next, false);
            } else {
                const next = {
                    ...todo,
                    completed: false
                };
                await setTodo(todoId, next, false);
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
        const todo = useTodoStore.getState().getTodoById(todoId);
        if (todo) {
            const next = {
                ...todo,
                title: event.title,
                completed: event.completed
            };
            await useTodoStore.getState().setTodo(todoId, next);
            await TodoAPI.updateTodo(next);
        }
    });
};

/**
 * @description update the linked events of linked todos
 * update ONLY TITLE, DESC
 * UPDATE LOGIC: the event --> linked todos --> linked events --> update events
 */
const updateLinkedEventsToEvent = (event: CalendarEvent) => {
    const { getTodoById } = useTodoStore.getState();
    const { getEventById } = useEventStore.getState();
    event.linkedTodos?.forEach((todoId) => {
        getTodoById(todoId)?.linkedEvents?.forEach(async (eventId) => {
            const exist = getEventById(eventId);
            if (exist) {
                const next: CalendarEvent = {
                    ...exist,
                    title: event.title,
                    desc: event.desc
                };
                await setEvent(eventId, next, false);
                await EventAPI.updateEvent(next);
            }
        });
    });
};

export const useEvent = (shouldFetch = true) => {
    const { data, error, isLoading, mutate } = useSWR<CalendarEvent[]>(
        shouldFetch ? '/event/all' : null,
        fetcher,
        {
            onSuccess: (data) => compareWithStore(data)
        }
    );

    // ---------
    // STORE FOR SWR
    // ---------
    const {
        eventList,
        setEvent: setEventInternal,
        addEvent: addEventInternal,
        removeEvent: removeEventInternal,
        getEventById
    } = useEventStore();

    // DATA SWR
    const compareWithStore = (events: CalendarEvent[]) => {
        if (events) {
            events.forEach((event) => {
                // parse date, not pure
                event.start = new Date(event.start);
                event.end = new Date(event.end);

                const storeEvent = getEventById(event.id);
                if (!storeEvent) {
                    // To be considered should directly mutate the store
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

    const addEventWrapper = async (event: CalendarEvent) => {
        return await addEvent(event, data, mutate);
    };

    const toggleEventCompletedWrapper = async (id: string) => {
        toggleEventCompleted(id);
    };

    const setEventWrapper = async (id: string, newEvent: CalendarEvent, propagation?: boolean) => {
        if (propagation === undefined) propagation = true;
        return await setEvent(id, newEvent, propagation, data, mutate);
    };

    const removeEventWrapper = async (id: string) => {
        return await removeEvent(id, data, mutate);
    };

    return {
        eventList,
        setEvent: setEventWrapper,
        addEvent: addEventWrapper,
        toggleCompleted: toggleEventCompletedWrapper,
        removeEvent: removeEventWrapper,
        getEventById
    };
};
