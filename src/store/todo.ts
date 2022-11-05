import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { store_env } from '@/store/index';
import { UUID } from '@/utils';

interface Todo {
    id: string;
    completed: boolean;
    title: string;
    linkedEvents?: string[]; // todo
}

interface TodoStoreState {
    todoList: Todo[];
    addTodo: (newTodo: Todo) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

const TodoIdGenerator = () => {
    return UUID() + '-todo:USERNAME';
};

const TodoStore: StateCreator<TodoStoreState> = (set) => ({
    todoList: [],
    addTodo: (newTodo: Todo) =>
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
    devtools(persist(TodoStore, { name: 'todo-store' }), { enabled: store_env.isDev })
);

export type { Todo };
export { TodoIdGenerator };
export default useTodoStore;
