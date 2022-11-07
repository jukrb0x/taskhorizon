import create, { StateCreator } from 'zustand';
import { UUID } from '@/utils';
import { devtools, persist } from 'zustand/middleware';

interface EventState {
    id: string;
    title: string;
    desc?: string;
    start: Date;
    end: Date;
    allDay: boolean | undefined;
    linkedTodos?: string[]; // todo
}

interface EventStoreState {
    eventList: EventState[];
    addEvent: (newEvent: EventState) => void;
    setEvent: (id: string, newEvent: EventState) => void;
    removeEvent: (id: string) => void;
}

const EventIdGenerator = () => {
    return UUID() + '-event:USERNAME';
};

const EventStore: StateCreator<EventStoreState> = (set) => ({
    eventList: [],
    addEvent: (newEvent: EventState) =>
        set((state) => ({
            eventList: [...state.eventList, newEvent]
        })),
    setEvent: (id: string, newEvent: EventState) => {
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
    devtools(
        persist(EventStore, {
            name: 'event-store',
            deserialize: (str) => {
                const data = JSON.parse(str);
                data.state.eventList = data.state.eventList.map((event: EventState) => {
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

export type { EventState as CalendarEvent };
export { EventIdGenerator };
export default useEventStore;
