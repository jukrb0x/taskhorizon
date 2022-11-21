import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UUID } from '@/utils';
import useUserStore from '@/store/user-store';

interface Todo {
    completed: boolean;
    title: string;
    linkedEvents?: string[]; // todo
}

interface ITodo extends Todo {
    id: string;
}

interface TodoStoreState {
    todoList: ITodo[];
    addTodo: (newTodo: Todo) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const TodoIdGenerator = () => {
    const username = useUserStore.getState().getUsername();
    return UUID() + `'-todo:${username}`;
};

const TodoStore: StateCreator<TodoStoreState> = (set) => ({
    todoList: [],
    addTodo: (newTodo: Todo) =>
        set((state) => {
            const t: ITodo = { ...newTodo, id: TodoIdGenerator() };
            return { todoList: [...state.todoList, t] };
        }),
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
export type { Todo };
export { TodoIdGenerator };
export default useTodoStore;
