import { Controller, Inject } from '@tsed/di';
import { JwtAuth } from '@/decorators/JwtAuth';
import { TodoResponseModel, TodoService } from '@/services/TodoService';
import { Delete, Get, Post } from '@tsed/schema';
import { TodoModel } from '@/models';
import { $log, PathParams, Req } from '@tsed/common';
import { extractJwtPayload } from '@/config/jwt';
import { BodyParams } from '@tsed/platform-params';
import { BadRequest } from '@tsed/exceptions';

export interface TodoRequestModel extends Omit<TodoModel, 'updatedAt' | 'createdAt' | 'id'> {
    uuid: string;
    category: {
        id: string;
        name: string;
    };
}

@JwtAuth()
@Controller('/todo')
export class TodoController {
    @Inject()
    private todoService: TodoService;

    @Get('/')
    @Get('/all')
    async getTodos(@Req() req: Req): Promise<TodoResponseModel[]> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.todoService.getTodosByUserId(payload.uid);
        } else {
            return [];
        }
    }

    @Get('/:id')
    async getTodo(@Req() req: Req, @PathParams('id') id: number): Promise<TodoModel | null | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoById(id);
            if (todo?.userId === payload.userId) {
                return todo;
            }
        }
    }

    @Post('/create')
    async create(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.todoService.createTodo(payload.username, todo);
        }
    }

    @Get('/delete/:uuid')
    // @Delete('/delete/:uuid')
    async delete(@Req() req: Req, @PathParams('uuid') uuid: string): Promise<TodoModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoByUUID(uuid);
            $log.warn('todo is', todo);
            if (todo && todo?.userId === payload.uid) {
                return this.todoService.deleteTodoById(todo.id);
            } else {
                throw new BadRequest('Todo not found');
            }
        }
    }

    // @Get('/delete/:id')
}
