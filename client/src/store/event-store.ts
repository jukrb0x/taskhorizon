import create, { StateCreator } from 'zustand';
import { UUID } from '@/utils';
import { devtools, persist } from 'zustand/middleware';
import useUserStore from '@/store/user-store';
import { useTodoStore } from '@/store/index';

interface CalendarEvent {
    id: string; // generate inside store
    title: string;
    desc?: string;
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean;
    linkedTodos?: string[]; // todo
}

interface EventStoreState {
    eventList: CalendarEvent[];
    addEvent: (newEvent: CalendarEvent) => string;
    setEvent: (id: string, newEvent: CalendarEvent) => CalendarEvent;
    removeEvent: (id: string) => void;
    toggleCompleted: (id: string) => CalendarEvent | undefined;
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
        const newId = EventIdGenerator();
        set((state) => {
            return {
                eventList: [
                    ...state.eventList,
                    {
                        ...newEvent,
                        id: newId
                    }
                ]
            };
        });
        return newId;
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
    removeEvent: (id: string) =>
        set((state) => {
            // todo: remove linked todo
            return { eventList: state.eventList.filter((event) => event.id !== id) };
        }),
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
        return get().getEventById(id);
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

const useEventStore = create<EventStoreState>()(
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
export default useEventStore;
