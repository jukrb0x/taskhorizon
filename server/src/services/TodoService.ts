import { EventService } from '@/services/EventService';
import { UserService } from '@/services/UserService';
import { Inject, Injectable } from '@tsed/di';
import { TodosRepository } from '@/repositories';

@Injectable()
export class TodoService {
    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private userService: UserService;

    async getTodosByUsername(username: string) {
        const user = await this.userService.findByUsername(username);
        return this.todoRepository.findMany({ where: { userId: user.id } });
    }

    async getTodoById(id: number) {
        return this.todoRepository.findUnique({ where: { id } });
    }

    // TODO json mapper?
    async createTodo(username: string, todo: any) {
        const user = await this.userService.findByUsername(username);
        return this.todoRepository.create({ ...todo, userId: user.id });
    }

    async deleteEvent(id: number) {
        return this.todoRepository.delete({ where: { id } });
    }
}
