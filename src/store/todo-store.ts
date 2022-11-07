import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UUID } from '@/utils';
import useUserStore from '@/store/user-store';

interface TodoStore {
    id: string;
    completed: boolean;
    title: string;
    linkedEvents?: string[]; // todo
}

interface TodoStoreState {
    todoList: TodoStore[];
    addTodo: (newTodo: TodoStore) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const TodoIdGenerator = () => {
    const username = useUserStore.getState().getUsername();
    return UUID() + `'-todo:${username}`;
};

const TodoStore: StateCreator<TodoStoreState> = (set) => ({
    todoList: [],
    addTodo: (newTodo: TodoStore) =>
        set((state) => ({
            todoList: [...state.todoList, newTodo]
        })),
    removeTodo: (id: string) =>
        set((state) => ({ todoList: state.todoList.filter((todo) => todo.id !== id) })),
    toggleTodo: (id: string) =>
        set((state) => ({
            todoList: state.todoList.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        }))
});

const useTodoStore = create<TodoStoreState>()(
    devtools(persist(TodoStore, { name: 'todo-store' }), {
        enabled: import.meta.env.MODE === 'development'
    })
);
export type { TodoStore };
export { TodoIdGenerator };
export default useTodoStore;
