import { Inject, Injectable } from '@tsed/di';
import { EventsRepository } from '@/repositories';
import { UserService } from '@/services/UserService';
import { EventModel } from '@/models';
import { EventRequestModel, EventResponseModel } from '@/interfaces/EventInterface';
import { $log } from '@tsed/common';

@Injectable()
export class EventService {
    @Inject()
    private eventRepository: EventsRepository;

    @Inject()
    private userService: UserService;

    async getEventsByUsername(username: string): Promise<EventResponseModel[]> {
        const user = await this.userService.findByUsername(username);
        const events = await this.eventRepository.findMany({ where: { userId: user.id } });
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
                linkedTodos: e.LinkedTodos?.map((todo) => todo.uuid)
            };
        });
    }

    async getEventById(id: number) {
        return await this.eventRepository.findUnique({ where: { id } });
    }

    async getEventByUUID(uuid: string) {
        return await this.eventRepository.findUnique({ where: { uuid } });
    }

    async getEventsByUUIDs(uuids: string[]) {
        // return await this.eventRepository.findMany({ where: { uuid: { : uuids } } });
    }

    async createEvent(username: string, event: EventRequestModel) {
        const user = await this.userService.findByUsername(username);
        const { linkedTodos, ...data } = event;
        return await this.eventRepository.create({
            data: {
                ...data,
                LinkedTodos: {
                    connect: linkedTodos?.map((todoUUID) => ({ uuid: todoUUID }))
                },
                User: { connect: { id: user.id } }
            }
        });
    }

    async updateEvent(event: EventRequestModel) {
        const { linkedTodos, ...data } = event;
        return await this.eventRepository.update({
            where: { uuid: event.uuid },
            data: {
                ...data,
                LinkedTodos: {
                    connect: linkedTodos?.map((todoUUID) => ({ uuid: todoUUID }))
                },
                updatedAt: new Date()
            }
        });
    }

    /**
     * Deletes an event by id
     * @TODO logically delete
     * @param id
     */
    async deleteEvent(id: number) {
        return await this.eventRepository.delete({ where: { id } });
    }

    async deleteEventsByUUIDs(uuids: string[]) {
        return await this.eventRepository.deleteMany({
            where: {
                uuid: {
                    in: uuids
                }
            }
        });
    }
}
