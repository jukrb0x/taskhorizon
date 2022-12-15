import { Controller, Inject } from '@tsed/di';
import { JwtAuth } from '@/decorators/JwtAuth';
import { TodoService } from '@/services/TodoService';
import { Get, Post } from '@tsed/schema';
import { TodoModel } from '@/models';
import { PathParams, Req } from '@tsed/common';
import { extractJwtPayload } from '@/config/jwt';
import { BodyParams } from '@tsed/platform-params';

interface TodoRequestModel extends Omit<TodoModel, 'updatedAt' | 'createdAt' | 'id'> {
    uuid: string;
}

@JwtAuth()
@Controller('/todo')
export class TodoController {
    @Inject()
    private todoService: TodoService;

    @Get('/')
    @Get('/all')
    async getTodos(@Req() req: Req): Promise<TodoModel[]> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.todoService.getTodosByUsername(payload.username);
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
    async delete(@Req() req: Req, @PathParams('uuid') id: number): Promise<TodoModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoById(id);
            if (todo?.userId === payload.userId) {
                return this.todoService.deleteEvent(id);
            }
        }
    }

    // @Get('/delete/:id')
}
