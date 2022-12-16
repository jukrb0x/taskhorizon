import { Controller, Inject } from '@tsed/di';
import { JwtAuth } from '@/decorators/JwtAuth';
import { EventService } from '@/services/EventService';
import { Get, Post } from '@tsed/schema';
import { PathParams, Req } from '@tsed/common';
import { extractJwtPayload } from '@/config/jwt';
import { BodyParams } from '@tsed/platform-params';
import { EventModel } from '@/models';
import { BadRequest } from '@tsed/exceptions';
import { EventRequestModel, EventResponseModel } from '@/interfaces/EventInterface';

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
            return this.eventService.getEventsByUsername(payload.username);
        }
        return [];
    }

    @Get('/:id')
    async getEvent(@Req() req: Req, @PathParams('id') id: number): Promise<EventModel | null | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.getEventById(id); // return nothing if not found
        }
    }

    @Post('/create')
    async createEvent(@Req() req: Req, @BodyParams() event: EventRequestModel): Promise<EventModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.createEvent(payload.username, event);
        }
    }

    @Post('/update')
    async updateEvent(@Req() req: Req, @BodyParams() event: EventRequestModel): Promise<EventModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            // check ownership
            const exist = await this.eventService.getEventByUUID(event.uuid);
            if (exist?.userId === payload.uid) {
                return this.eventService.updateEvent(event);
            } else {
                throw new BadRequest('Invalid event');
            }
        }
    }

    @Get('/delete/:uuid')
    async deleteEvent(@Req() req: Req, @PathParams('uuid') uuid: number): Promise<EventModel | undefined> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const event = await this.eventService.getEventByUUID(uuid);
            if (event?.userId === payload.uid) {
                return this.eventService.deleteEvent(event.id);
            }
        }
    }

    @Post('/delete')
    async deleteEvents(@Req() req: Req, @BodyParams() ids: number[]) {
        const payload = extractJwtPayload(req);
        if (payload) {
            return this.eventService.deleteEvents(ids);
        }
    }
}
