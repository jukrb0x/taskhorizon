import create, { StateCreator } from 'zustand';
import { store_env } from '@/store/index';
import { UUID } from '@/utils';
import { devtools, persist } from 'zustand/middleware';

interface Event {
    id: string;
    title: string;
    description?: string;
    startAt: Date;
    endAt: Date;
    isAllDay: boolean;
    linkedTodos?: string[]; // todo
}

interface EventStoreState {
    eventList: Event[];
    addEvent: (newEvent: Event) => void;
    setEvent: (id: string, newEvent: Event) => void;
    removeEvent: (id: string) => void;
}

const EventIdGenerator = () => {
    return UUID() + '-event:USERNAME';
};

const EventStore: StateCreator<EventStoreState> = (set) => ({
    eventList: [],
    addEvent: (newEvent: Event) =>
        set((state) => ({
            eventList: [...state.eventList, newEvent]
        })),
    setEvent: (id: string, newEvent: Event) => {
        set((state) => ({
            eventList: state.eventList.map((event) =>
                event.id === id
                    ? {
                        ...event,
                        ...newEvent
                    }
                    : event
            )
        }));
    },
    removeEvent: (id: string) =>
        set((state) => ({ eventList: state.eventList.filter((event) => event.id !== id) }))
});

const useEventStore = create<EventStoreState>()(
    devtools(persist(EventStore, { name: 'event-store' }), { enabled: store_env.isDev })
);

export type { Event };
export { EventIdGenerator };
export default useEventStore;
