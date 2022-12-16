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
            const todos = await this.todoService.getTodosByUserId(payload.uid);
            return todos.map((todo) => {
                return {
                    id: todo.uuid,
                    category: {
                        id: todo.Category.uuid,
                        name: todo.Category.name
                    },
                    order: todo.order,
                    completed: todo.completed,
                    title: todo.title,
                    createdAt: todo.createdAt,
                    updatedAt: todo.updatedAt,
                    linkedEvents: todo.LinkedEvents.map((event) => event.uuid)
                };
            });
        } else {
            return [];
        }
    }

    /**
     * @FIXME avoid use this
     * @param req
     * @param id
     */
    @Get('/:id')
    async getTodo(@Req() req: Req, @PathParams('id') id: number): Promise<TodoResponseModel | null | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoById(id);
            if (todo?.userId === payload.userId) {
                const { Category /*FIXME*/, ...rest } = todo;
                $log.warn('CAT ', Category);
                return {
                    category: { id: Category.uuid, name: Category.name },
                    completed: rest.completed,
                    id: rest.uuid,
                    linkedEvents: rest.LinkedEvents.map((e) => e.uuid),
                    order: rest.order,
                    title: rest.title,
                    createdAt: rest?.createdAt,
                    updatedAt: rest.updatedAt
                };
            }
        }
    }

    @Post('/create')
    async create(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoResponseModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const created = await this.todoService.createTodo(payload.username, todo);
            const { Category } = created;
            return {
                category: { id: Category.uuid, name: Category.name },
                completed: created.completed,
                createdAt: created.createdAt,
                id: created.uuid,
                linkedEvents: created.LinkedEvents.map((e) => e.uuid),
                order: created.order,
                title: created.title,
                updatedAt: created.updatedAt
            };
        }
    }

    @Get('/delete/:uuid')
    @Delete('/delete/:uuid')
    async delete(@Req() req: Req, @PathParams('uuid') uuid: string): Promise<TodoResponseModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoByUUID(uuid);
            if (todo && todo?.userId === payload.uid) {
                const deleted = await this.todoService.deleteTodoById(todo.id);
                const { Category } = deleted;
                return {
                    category: { id: Category.uuid, name: Category.name },
                    completed: deleted.completed,
                    createdAt: deleted.createdAt,
                    id: deleted.uuid,
                    linkedEvents: deleted.LinkedEvents.map((e) => e.uuid),
                    order: deleted.order,
                    title: deleted.title,
                    updatedAt: deleted.updatedAt
                };
            } else {
                throw new BadRequest('Todo not found');
            }
        }
    }

    @Post('/update')
    async update(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoResponseModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const exist = await this.todoService.getTodoByUUID(todo.uuid);
            if (exist && exist?.userId === payload.uid) {
                const updated = await this.todoService.updateTodo(todo);
                return {
                    category: { id: updated?.Category.uuid, name: updated?.Category.name },
                    completed: updated.completed,
                    createdAt: updated.createdAt,
                    id: updated.uuid,
                    linkedEvents: updated.LinkedEvents.map((e) => e.uuid),
                    order: updated.order,
                    title: updated.title,
                    updatedAt: updated.updatedAt
                };
            } else {
                throw new BadRequest('Todo not found');
            }
        }
    }
}
