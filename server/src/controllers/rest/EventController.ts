import { Controller, Inject } from '@tsed/di';
import { JwtAuth } from '@/decorators/JwtAuth';
import { EventService } from '@/services/EventService';
import { Delete, Get, Post } from '@tsed/schema';
import { $log, PathParams, Req } from '@tsed/common';
import { extractJwtPayload } from '@/config/jwt';
import { BodyParams } from '@tsed/platform-params';
import { EventModel } from '@/models';
import { BadRequest } from '@tsed/exceptions';
import { EventRequestModel, EventResponseModel } from '@/interfaces/EventInterface';
import { create } from 'domain';

@JwtAuth()
@Controller('/event')
export class EventController {
    @Inject()
    private eventService: EventService;

    @Get('/')
    @Get('/all')
    async getEvents(@Req() req: Req): Promise<EventResponseModel[]> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const events = await this.eventService.getEventsByUsername(payload.username);
            return events.map((e) => {
                return {
                    id: e.uuid,
                    desc: e.description || '',
                    title: e.title,
                    start: e.start,
                    end: e.end,
                    allDay: e.allDay,
                    completed: e.completed,
                    updatedAt: e.updatedAt,
                    createdAt: e.createdAt,
                    linkedTodos: e.LinkedTodos?.map((todo) => todo.uuid)
                };
            });
        } else {
            return [];
        }
    }

    @Get('/:id')
    async getEvent_deprecated(@Req() req: Req, @PathParams('id') id: number): Promise<EventModel | null | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.getEventById(id); // return nothing if not found
        }
    }

    @Post('/create')
    async createEvent(@Req() req: Req, @BodyParams() event: EventRequestModel): Promise<EventResponseModel> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const created = await this.eventService.create(payload.username, event);
            return {
                id: created.uuid,
                desc: created.description || '',
                title: created.title,
                start: created.start,
                end: created.end,
                allDay: created.allDay,
                completed: created.completed,
                updatedAt: created.updatedAt,
                linkedTodos: created.LinkedTodos?.map((todo) => todo.uuid)
            };
        } else {
            throw new BadRequest('Invalid event');
        }
    }

    @Post('/update')
    async updateEvent(@Req() req: Req, @BodyParams() event: EventRequestModel): Promise<EventResponseModel> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const exist = await this.eventService.getEventByUUID(event.uuid);
            if (exist?.userId === payload.uid) {
                // update event itself
                const updated = await this.eventService.update(event);
                // update linked todos
                await this.eventService.updateLinkedTodos(updated);
                // update linked events of the linked todos
                await this.eventService.updateLinkedEvents(updated);

                return {
                    id: updated.uuid,
                    desc: updated.description || '',
                    title: updated.title,
                    start: updated.start,
                    end: updated.end,
                    allDay: updated.allDay,
                    completed: updated.completed,
                    updatedAt: updated.updatedAt,
                    linkedTodos: updated.LinkedTodos?.map((todo) => todo.uuid)
                };
            }
        }
        throw new BadRequest('Invalid event');
    }

    @Post('/update/batch')
    async updateEvents(@Req() req: Req, @BodyParams() events: EventRequestModel[]) {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.updateEvents(events);
        }
    }

    @Delete('/delete/:uuid')
    async deleteEvent(@Req() req: Req, @PathParams('uuid') uuid: string): Promise<EventModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const event = await this.eventService.getEventByUUID(uuid);
            if (event?.userId === payload.uid) {
                return this.eventService.deleteEvent(event.id);
            }
        }
    }

    @Post('/delete')
    async deleteEvents(@Req() req: Req, @BodyParams() uuids: string[]) {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.deleteEventsByUUIDs(uuids);
        }
    }
}
