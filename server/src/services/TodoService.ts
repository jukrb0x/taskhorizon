import { EventService } from '@/services/EventService';
import { UserService } from '@/services/UserService';
import { Inject, Injectable } from '@tsed/di';
import { TodoCategoriesRepository, TodosRepository, UsersRepository } from '@/repositories';
import { Todo } from '@prisma/client';
import { EventModel, TodoModel } from '@/models';
import { $log } from '@tsed/common';
import { TodoRequestModel, TodoResponseModel } from '@/interfaces/TodoInterface';
import { getPrismaClient } from '@prisma/client/runtime';

@Injectable()
export class TodoService {
    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private userRepository: UsersRepository;

    @Inject()
    private userService: UserService;

    @Inject()
    private todoCategoriesRepo: TodoCategoriesRepository;

    async getTodosByUserId(userId: number): Promise<TodoResponseModel[]> {
        const todos = await this.todoRepository.findMany({ where: { userId }, include: { Category: true } });
        return todos.map((todo) => {
            const { Category, User, id, uuid, ...rest } = todo;
            return {
                ...rest,
                id: uuid,
                category: {
                    id: Category.uuid,
                    name: Category.name
                }
            };
        });
    }

    async getTodosByUsername(username: string): Promise<TodoResponseModel[]> {
        const user = await this.userService.findByUsername(username);
        const todos = await this.todoRepository.findMany({ where: { userId: user.id }, include: { Category: true } });
        return todos.map((todo) => {
            const { Category, User, id, uuid, ...rest } = todo;
            return {
                ...rest,
                id: uuid,
                category: {
                    id: Category.uuid,
                    name: Category.name
                }
            };
        });
    }

    async getTodoById(id: number) {
        return this.todoRepository.findUnique({ where: { id } });
    }

    async getTodoByUUID(uuid: string) {
        return this.todoRepository.findUnique({ where: { uuid } });
    }

    // todo: figure out json validation in tsed (ajv)
    async createTodo(username: string, todo: TodoRequestModel) {
        const user = await this.userService.findByUsername(username);
        const { category, ...data } = todo;
        return this.todoRepository.create({
            data: {
                ...data,
                User: { connect: { id: user.id } },
                Category: {
                    connect: {
                        uuid: category.id
                    }
                }
            }
        });
    }

    async updateTodo(todo: TodoRequestModel) {
        const { category, ...data } = todo;
        const todoCategory = await this.todoCategoriesRepo.findUnique({ where: { uuid: category.id } });
        return await this.todoRepository.update({
            where: { uuid: data.uuid },
            data: {
                ...data,
                categoryId: todoCategory?.id,
                updatedAt: new Date()
            }
        });
    }

    /**
     * @TODO logically delete the todo is better
     * @param id
     */
    async deleteTodoById(id: number) {
        return this.todoRepository.delete({ where: { id } });
    }
}
