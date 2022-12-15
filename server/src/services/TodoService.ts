import { EventService } from '@/services/EventService';
import { UserService } from '@/services/UserService';
import { Inject, Injectable } from '@tsed/di';
import { TodoCategoriesRepository, TodosRepository, UsersRepository } from '@/repositories';
import { Todo } from '@prisma/client';
import { EventModel, TodoModel } from '@/models';
import { $log } from '@tsed/common';

interface TodoResponseModel {
    order: number | null;
    categoryId: string;
    completed: boolean;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    uuid: string;
    linkedEvents: EventModel[];
}

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
        $log.warn('todos ', todos);
        // restructure todos
        return todos.map((todo) => {
            const { Category, User, id, ...rest } = todo;
            return {
                ...rest,
                categoryId: Category.uuid
            };
        });
    }

    async getTodosByUsername(username: string) {
        const user = await this.userService.findByUsername(username);
        return this.todoRepository.findMany({ where: { userId: user.id } });
    }

    async getTodoById(id: number) {
        return this.todoRepository.findUnique({ where: { id } });
    }

    async getTodoByUUID(uuid: string) {
        return this.todoRepository.findUnique({ where: { uuid } });
    }

    // todo: figure out json validation in tsed (ajv)
    async createTodo(username: string, todo: any /*TodoRequestModel*/) {
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

    async deleteTodoById(id: number) {
        return this.todoRepository.delete({ where: { id } });
    }
}
