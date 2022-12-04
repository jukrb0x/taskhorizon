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
    setEvent: (id: string, newEvent: CalendarEvent) => void;
    removeEvent: (id: string) => void;
    toggleCompleted: (id: string) => void;
    addLinkedTodo: (id: string, todoId: string) => void;
}

const EventIdGenerator = () => {
    const username = useUserStore.getState().getUsername();
    if (!username) throw new Error('Username not set');
    return UUID() + `-event:${username}`;
};

const updateLinkedTodos = (event: CalendarEvent) => {
    event.linkedTodos?.forEach((todoId) => {
        const todo = useTodoStore.getState().getTodoById(todoId);
        if (todo) {
            useTodoStore.getState().setTodo(todoId, {
                ...todo,
                title: event.title,
                completed: event.completed
            });
        }
    });
};

const EventStore: StateCreator<EventStoreState> = (set) => ({
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
            updateLinkedTodos(newEvent);
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
    },
    removeEvent: (id: string) =>
        set((state) => ({ eventList: state.eventList.filter((event) => event.id !== id) })),
    toggleCompleted: (id: string) =>
        set((state) => {
            // toggle linked todos
            // need to secure the state is the same when linking
            state.eventList.map((event) => {
                if (event.id === id) {
                    event.linkedTodos?.forEach((todoId) => {
                        useTodoStore.getState().toggleCompleted(todoId);
                    });
                }
            });
            return {
                eventList: state.eventList.map((event) =>
                    event.id === id
                        ? {
                            ...event,
                            completed: !event.completed
                        }
                        : event
                )
            };
        }),
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
        })
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
