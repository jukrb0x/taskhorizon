import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const isDev = import.meta.env.MODE === 'development';

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
    devtools(persist(TodoStore, { name: 'todo-store' }), { enabled: isDev })
);

export type { Todo };
export default useTodoStore;
