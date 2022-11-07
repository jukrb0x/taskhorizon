import { devtools, persist } from 'zustand/middleware';

// stores
import useTodoStore from '@/store/todo-state';
import useEventStore from '@/store/event-store';
import { StateCreator } from 'zustand';

// love to separate it out, but it's not working now
// looks like have to "initialize" the middleware first

// export const withMiddleware = (store: StateCreator<any>, name: string) => {
//     return devtools(persist(store, { name: name }), {
//         enabled: import.meta.env.MODE === 'development'
//     });
// };

export { useTodoStore, useEventStore };
