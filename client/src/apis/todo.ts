import { http } from '@/apis';
import { Todo, TodoIdGenerator } from '@/store';
import { renameKeys } from '@/utils/common';

interface TodoRequestModel {
    uuid: string;
    title: string;
    category: {
        id: string;
        name: string;
    };
    completed: boolean;
}

const getTodos = async (): Promise<Todo[]> => {
    const { data } = await http.get<Todo[]>('/todo/all');
    return data;
};

const createTodo = async (todo: Todo): Promise<Todo> => {
    const req: TodoRequestModel = renameKeys(todo, { id: 'uuid' });
    const { data } = await http.post<Todo>('/todo/create', req);
    return data;
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
    const req: TodoRequestModel = renameKeys(todo, { id: 'uuid' });
    const { data } = await http.post<Todo>('/todo/update', req);
    console.log('data', data);
    return data;
};

const deleteTodoById = async (id: string): Promise<Todo> => {
    const { data } = await http.delete<Todo>(`/todo/delete/${id}`);
    return data;
};

export const TodoAPI = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodoById
};
