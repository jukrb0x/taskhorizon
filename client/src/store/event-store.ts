import useUserStore from '@/store/user-store';
import { UUID } from '@/utils';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CalendarEvent {
    id: string; // generate inside store
    title: string;
    desc: string;
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean;
    linkedTodos: string[];
    updatedAt?: Date;
    createdAt?: Date;
}

interface EventStoreState {
    eventList: CalendarEvent[];
    addEvent: (newEvent: CalendarEvent) => void;
    setEvent: (id: string, newEvent: CalendarEvent) => CalendarEvent;
    removeEvent: (id: string) => CalendarEvent;
    removeEvents: (ids: string[]) => CalendarEvent[];
    toggleCompleted: (id: string) => CalendarEvent;
    addLinkedTodo: (id: string, todoId: string) => void;
    getEventById: (id: string) => CalendarEvent | undefined;
}

const EventIdGenerator = () => {
    const username = useUserStore.getState().getUsername();
    if (!username) throw new Error('Username not set');
    return UUID() + `-event:${username}`;
};

const EventStore: StateCreator<EventStoreState> = (set, get) => ({
    eventList: [],
    addEvent: (newEvent: CalendarEvent) => {
        set((state) => {
            return {
                eventList: [
                    ...state.eventList,
                    {
                        ...newEvent
                    }
                ]
            };
        });
    },
    setEvent: (id: string, newEvent: CalendarEvent) => {
        set((state) => {
            return {
                eventList: state.eventList.map((event) =>
                    event.id === id
                        ? {
                            ...event,
                            ...newEvent
                        }
                        : event
                )
            };
        });
        return newEvent;
    },
    removeEvent: (id: string) => {
        const removedEvent = get().getEventById(id) as CalendarEvent;
        set((state) => ({ eventList: state.eventList.filter((event) => event.id !== id) }));
        return removedEvent;
    },
    removeEvents: (ids: string[]) => {
        const removedEvents = get().eventList.filter((event) => ids.includes(event.id));
        set((state) => ({ eventList: state.eventList.filter((event) => !ids.includes(event.id)) }));
        return removedEvents;
    },
    toggleCompleted: (id: string) => {
        set((state) => ({
            eventList: state.eventList.map((event) =>
                event.id === id
                    ? {
                        ...event,
                        completed: !event.completed
                    }
                    : event
            )
        }));
        return get().getEventById(id) as CalendarEvent;
    },
    addLinkedTodo: (id: string, todoId: string) =>
        set((state) => {
            return {
                eventList: state.eventList.map((event) =>
                    event.id === id
                        ? {
                            ...event,
                            linkedTodos: [...(event.linkedTodos || []), todoId]
                        }
                        : event
                )
            };
        }),
    getEventById: (id: string) => get().eventList.find((event) => event.id === id)
});

export const useEventStore = create<EventStoreState>()(
    devtools(
        persist(EventStore, {
            name: 'event-store',
            deserialize: (str) => {
                const data = JSON.parse(str);
                data.state.eventList = data.state.eventList.map((event: CalendarEvent) => {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    return event;
                });
                return data;
            }
        }),
        {
            enabled: import.meta.env.MODE === 'development'
        }
    )
);

export type { CalendarEvent };
export { EventIdGenerator };
