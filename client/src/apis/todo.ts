import { Todo, TodoIdGenerator } from '@/store';
import { http } from '@/apis';
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

export class TodoAPI {
    static async getTodos(): Promise<Todo[]> {
        const { data } = await http.get<Todo[]>('/todo/all');
        return data;
    }

    static async createTodo(todo: Todo): Promise<Todo> {
        const req: TodoRequestModel = renameKeys(todo, { id: 'uuid' });
        console.log(req);
        const { data } = await http.post<Todo>('/todo/create', req);
        return data;
    }

    static async deleteTodoById(id: string): Promise<Todo> {
        const { data } = await http.get<Todo>(`/todo/delete/${id}`);
        return data;
    }
}
