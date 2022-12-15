import { Controller, Inject } from '@tsed/di';
import { JwtAuth } from '@/decorators/JwtAuth';
import { TodoService } from '@/services/TodoService';
import { Delete, Get, Post } from '@tsed/schema';
import { TodoModel } from '@/models';
import { $log, PathParams, Req } from '@tsed/common';
import { extractJwtPayload } from '@/config/jwt';
import { BodyParams } from '@tsed/platform-params';
import { BadRequest } from '@tsed/exceptions';
import { TodoRequestModel, TodoResponseModel } from '@/interfaces/TodoInterface';

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
            if (todo && todo?.userId === payload.uid) {
                return this.todoService.deleteTodoById(todo.id);
            } else {
                throw new BadRequest('Todo not found');
            }
        }
    }

    @Post('/update')
    async update(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const exist = await this.todoService.getTodoByUUID(todo.uuid);
            if (exist && exist?.userId === payload.uid) {
                return this.todoService.updateTodoById(exist.id, todo);
            } else {
                throw new BadRequest('Todo not found');
            }
        }
    }
}
