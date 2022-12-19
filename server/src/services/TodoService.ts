import { UserService } from '@/services/UserService';
import { Inject, Injectable } from '@tsed/di';
import { TodoCategoriesRepository, TodosRepository, UsersRepository } from '@/repositories';
import { TodoModel } from '@/models';
import { TodoRequestModel } from '@/interfaces/TodoInterface';
import { EventService } from '@/services/EventService';

@Injectable()
export class TodoService {
    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private userRepository: UsersRepository;

    @Inject()
    private userService: UserService;

    @Inject()
    private eventService: EventService;

    @Inject()
    private todoCategoriesRepo: TodoCategoriesRepository;

    async getTodosByUserId(userId: number): Promise<TodoModel[]> {
        return await this.todoRepository.findMany({ where: { userId }, include: { Category: true, LinkedEvents: true } });
    }

    async getTodosByUsername(username: string): Promise<TodoModel[]> {
        const user = await this.userService.findByUsername(username);
        return await this.todoRepository.findMany({
            where: { userId: user.id },
            include: { Category: true, LinkedEvents: true }
        });
    }

    async getTodoById(id: number) {
        return await this.todoRepository.findUnique({ where: { id }, include: { Category: true, LinkedEvents: true } });
    }

    async getTodoByUUID(uuid: string) {
        return await this.todoRepository.findUnique({ where: { uuid } });
    }

    // todo: figure out json validation in tsed (ajv)
    async createTodo(username: string, todo: TodoRequestModel): Promise<TodoModel> {
        const user = await this.userService.findByUsername(username);
        const { category, linkedEvents, ...data } = todo;
        return await this.todoRepository.create({
            data: {
                ...data,
                User: { connect: { id: user.id } },
                Category: {
                    connect: {
                        uuid: category.id
                    }
                },
                LinkedEvents: {
                    connect: (linkedEvents?.map((eventUUID) => ({ uuid: eventUUID })) as []) || []
                }
            },
            include: { Category: true, LinkedEvents: true }
        });
    }

    async updateTodo(todo: TodoRequestModel): Promise<TodoModel> {
        const { category, linkedEvents, ...data } = todo;
        // const todoCategory = await this.todoCategoriesRepo.findUnique({ where: { uuid: category.id } });
        return await this.todoRepository.update({
            where: { uuid: data.uuid },
            data: {
                ...data,
                // categoryId: todoCategory?.id,
                Category: {
                    connect: {
                        uuid: category.id
                    }
                },
                LinkedEvents: {
                    connect: linkedEvents.map((eventUUID) => ({ uuid: eventUUID })) as []
                },
                updatedAt: new Date()
            },
            include: { Category: true, LinkedEvents: true }
        });
    }

    /**
     * @description Deletes a todo and its linked events and returns the deleted todo
     * @TODO logically delete the todo is better
     * @param id
     */
    async deleteTodoById(id: number) {
        const deleted = await this.todoRepository.delete({ where: { id }, include: { Category: true, LinkedEvents: true } });
        // keep the consistency of the data structure in the server-side
        // delete the todo and its linked events
        await this.eventService.deleteEventsByUUIDs(deleted.LinkedEvents.map((event) => event.uuid));
        return deleted;
    }
}
