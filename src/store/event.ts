import create, { StateCreator } from 'zustand';
import { UUID } from '@/utils';
import { devtools, persist } from 'zustand/middleware';

interface Event {
    id: string;
    title: string;
    desc?: string;
    start: Date;
    end: Date;
    allDay: boolean | undefined;
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
    // fixme: when get from storage the Date type is string
    // find a way to convert it back to Date and store
    // https://docs.pmnd.rs/zustand/integrations/persisting-store-data#getstorage
    devtools(persist(EventStore, { name: 'event-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);

export type { Event as CalendarEvent };
export { EventIdGenerator };
export default useEventStore;
