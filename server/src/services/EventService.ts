import { Inject } from '@tsed/di';
import { EventsRepository } from '@/repositories';
import { UserService } from '@/services/UserService';

export class EventService {
    @Inject()
    private eventRepository: EventsRepository;

    @Inject()
    private userService: UserService;

    async getEventsByUsername(username: string) {
        const user = await this.userService.findByUsername(username);
        return await this.eventRepository.findMany({ where: { userId: user.id } });
    }
}
