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
import { EventService } from '@/services/EventService';
import { EventsRepository, TodosRepository } from '@/repositories';

@JwtAuth()
@Controller('/todo')
export class TodoController {
    @Inject()
    private todoService: TodoService;

    @Inject()
    private eventService: EventService;

    @Inject()
    private eventRepo: EventsRepository;

    @Get('/')
    @Get('/all')
    async getTodos(@Req() req: Req): Promise<TodoResponseModel[]> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todos = await this.todoService.getTodosByUserId(payload.uid);
            return todos.map((todo) => ({
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
            }));
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
    async getTodo_deprecated(@Req() req: Req, @PathParams('id') id: number): Promise<TodoResponseModel | null | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoById(id);
            if (todo && todo?.userId === payload.userId) {
                const { Category, ...rest } = todo;
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
    async create(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoResponseModel> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const created = await this.todoService.create(payload.username, todo);
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
        throw new BadRequest('Cannot create todo');
    }

    /**
     * @description Delete a todo by uuid, the linked events will be deleted too.
     * @param req
     * @param uuid
     */
    @Delete('/delete/:uuid')
    async delete(@Req() req: Req, @PathParams('uuid') uuid: string): Promise<TodoResponseModel> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const todo = await this.todoService.getTodoByUUID(uuid);
            if (todo && todo?.userId === payload.uid) {
                // delete the todo
                const deleted = await this.todoService.deleteTodoById(todo.id);
                // delete linked events
                await this.eventService.deleteEventsByUUIDs(deleted.LinkedEvents.map((event) => event.uuid));
                return {
                    // return deleted todo
                    category: { id: deleted.Category.uuid, name: deleted.Category.name },
                    completed: deleted.completed,
                    createdAt: deleted.createdAt,
                    id: deleted.uuid,
                    linkedEvents: deleted.LinkedEvents.map((e) => e.uuid),
                    order: deleted.order,
                    title: deleted.title,
                    updatedAt: deleted.updatedAt
                };
            }
        }
        throw new BadRequest('Todo not found');
    }

    /**
     * @description Update a todo by uuid, the title and completed status will be synced to linked events if there is any.
     * @param req
     * @param todo
     */
    @Post('/update')
    async update(@Req() req: Req, @BodyParams() todo: TodoRequestModel): Promise<TodoResponseModel> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const exist = await this.todoService.getTodoByUUID(todo.uuid);
            if (exist && exist?.userId === payload.uid) {
                // update todo itself
                const updated = await this.todoService.updateTodo(todo);
                // the todo dominates the linked events
                // sync title, completed to linked events
                updated.LinkedEvents.forEach((event) => {
                    this.eventRepo.update({
                        where: { id: event.id },
                        data: {
                            title: updated.title,
                            completed: updated.completed
                        }
                    });
                });

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
            }
        }

        throw new BadRequest('Todo not found');
    }
}
