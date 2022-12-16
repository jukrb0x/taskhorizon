import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UUID } from '@/utils';
import useUserStore from '@/store/user-store';

interface Todo {
    id: string;
    completed: boolean;
    title: string;
    linkedEvents: string[]; // Todo
    category: {
        id: string;
        name: string;
    };
    updatedAt?: Date;
    createdAt?: Date;
    order?: number;
}

interface TodoStoreState {
    todoList: Todo[];
    addTodo: (newTodo: Todo) => void;
    setTodo: (id: string, newTodo: Todo) => Todo;
    removeTodo: (id: string) => Todo;
    getTodoById: (id: string) => Todo | undefined;
    toggleCompleted: (id: string) => Todo;
    dragItem: Todo | null;
    setDragItem: (item: Todo) => void;
    clearDragItem: () => void;
    addLinkedEvent: (id: string, eventId: string) => Todo;
    removeLinkedEvent: (id: string, eventId: string) => Todo;
}

const TodoIdGenerator = () => {
    const username = useUserStore.getState().getUsername();
    return UUID() + `-todo:${username}`;
};

const TodoStore: StateCreator<TodoStoreState> = (set, get) => ({
    todoList: [],
    addTodo: (newTodo: Todo) =>
        set((state) => {
            return {
                todoList: [
                    ...state.todoList,
                    {
                        ...newTodo
                        // id: TodoIdGenerator()
                    }
                ]
            };
        }),
    setTodo: (id, newTodo) => {
        set((state) => ({
            todoList: state.todoList.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        ...newTodo
                    }
                    : todo
            )
        }));
        return newTodo;
    },
    removeTodo: (id: string) => {
        const removedTodo = get().getTodoById(id) as Todo;
        set((state) => ({ todoList: state.todoList.filter((todo) => todo.id !== id) }));
        return removedTodo;
    },
    toggleCompleted: (id: string) => {
        set((state) => ({
            todoList: state.todoList.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed
                    }
                    : todo
            )
        }));
        return get().getTodoById(id) as Todo;
    },
    getTodoById: (id: string) => get().todoList.find((todo) => todo.id === id),
    dragItem: null,
    setDragItem: (item: Todo) => set(() => ({ dragItem: item })),
    clearDragItem: () => set(() => ({ dragItem: null })),
    addLinkedEvent: (id: string, eventId: string) => {
        set((state) => ({
            todoList: state.todoList.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        linkedEvents: [...(todo.linkedEvents || []), eventId]
                    }
                    : todo
            )
        }));
        return get().getTodoById(id) as Todo;
    },
    removeLinkedEvent: (id: string, eventId: string) => {
        set((state) => {
            return {
                todoList: state.todoList.map((todo) =>
                    todo.id === id
                        ? {
                            ...todo,
                            linkedEvents: (todo.linkedEvents || []).filter((id) => id !== eventId)
                        }
                        : todo
                )
            };
        });
        return get().getTodoById(id) as Todo;
    }
});

export const useTodoStore = create<TodoStoreState>()(
    devtools(
        persist(TodoStore, {
            name: 'todo-store',
            partialize: (state) => ({
                todoList: state.todoList
            })
        }),
        {
            enabled: import.meta.env.MODE === 'development'
        }
    )
);
export type { Todo };
export { TodoIdGenerator };
