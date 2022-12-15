import { Todo, TodoIdGenerator } from '@/store';
import { http } from '@/apis';
import { renameKeys } from '@/utils/common';

interface TodoRequest extends Omit<Todo, 'id'> {
    uuid: string;
}

export class TodoApi {
    static async getTodos(): Promise<Todo[]> {
        const { data } = await http.get<Todo[]>('/todo/all');
        console.log(data);
        return data;
    }

    static async createTodo(todo: Todo): Promise<Todo> {
        todo.id = TodoIdGenerator();
        // rename id to uuid
        // const t = { ...todo, uuid: todo.id }
        const t = renameKeys(todo, { id: 'uuid' });
        console.log(t);
        return t;
        // const { data } = await http.post<Todo>('/todo/create', todo);
        // return data;
    }
}
