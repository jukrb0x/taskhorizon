import { EventService } from '@/services/EventService';
import { UserService } from '@/services/UserService';
import { Inject, Injectable } from '@tsed/di';
import { TodosRepository, UsersRepository } from '@/repositories';
import { $log } from '@tsed/common';
import { TodoModel } from '@tsed/prisma';
import { Todo } from '@prisma/client';
import { TodoRequestModel } from '@/controllers/rest';

@Injectable()
export class TodoService {
    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private userRepository: UsersRepository;

    @Inject()
    private userService: UserService;

    async getTodosByUsername(username: string) {
        const user = await this.userService.findByUsername(username);
        return this.todoRepository.findMany({ where: { userId: user.id } });
    }

    async getTodoById(id: number) {
        return this.todoRepository.findUnique({ where: { id } });
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

    async deleteEvent(id: number) {
        return this.todoRepository.delete({ where: { id } });
    }
}
