import { Inject, Injectable } from '@tsed/di';
import { EventsRepository } from '@/repositories';
import { UserService } from '@/services/UserService';
import { EventModel } from '@/models';

@Injectable()
export class EventService {
    @Inject()
    private eventRepository: EventsRepository;

    @Inject()
    private userService: UserService;

    async getEventsByUsername(username: string) {
        const user = await this.userService.findByUsername(username);
        return await this.eventRepository.findMany({ where: { userId: user.id } });
    }

    async getEventById(id: number) {
        return await this.eventRepository.findUnique({ where: { id } });
    }

    async createEvent(username: string, event: any) {
        const user = await this.userService.findByUsername(username);
        return await this.eventRepository.create({ data: { ...event, User: { connect: { id: user.id } } } });
    }

    /**
     * Deletes an event by id
     * @TODO logically delete
     * @param id
     */
    async deleteEvent(id: number) {
        return await this.eventRepository.delete({ where: { id } });
    }

    async deleteEvents(ids: number[]) {
        return await this.eventRepository.deleteMany({ where: { id: { in: ids } } });
    }
}
