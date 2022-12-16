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
    drillDown = false,
    data?: CalendarEvent[] | undefined,
    mutate?: KeyedMutator<CalendarEvent[]>
) => {
    // await mutate([...eventList.filter((event) => event.id !== id), newEvent]);
    useEventStore.getState().setEvent(id, newEvent);
    if (drillDown) {
        await updateLinkedTodosToEvent(newEvent);
        await updateLinkedEventsToEvent(newEvent);
    }
    return await EventAPI.updateEvent(newEvent); // update the event itself
};

export const removeEvent = async (
    id: string,
    data?: CalendarEvent[] | undefined,
    mutate?: KeyedMutator<CalendarEvent[]>
) => {
    // TODO: use batch remove

    mutate && (await mutate(useEventStore.getState().eventList.filter((event) => event.id !== id)));
    const removedEvent = useEventStore.getState().removeEvent(id);

    removedEvent.linkedTodos?.forEach((todoId) => {
        // remove the event from linked todo,
        // usually it's only one linked todo for one event
        const updated = useTodoStore.getState().removeLinkedEvent(todoId, removedEvent.id);
        TodoAPI.updateTodo(updated);
    });

    // remove all linked todos only if all linked events are removed
    removedEvent.linkedTodos?.forEach((todoId) => {
        const todo = useTodoStore.getState().getTodoById(todoId);
        if (todo?.linkedEvents?.length == 0) {
            useTodoStore.getState().removeTodo(todoId);
            TodoAPI.deleteTodoById(todoId);
        }
    });
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
    event.linkedTodos?.forEach((todoId) => {
        useTodoStore
            .getState()
            .getTodoById(todoId)
            ?.linkedEvents?.forEach(async (eventId) => {
                const exist = useEventStore.getState().getEventById(eventId);
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

    const setEventWrapper = async (id: string, newEvent: CalendarEvent) => {
        return await setEvent(id, newEvent, true, data, mutate);
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
