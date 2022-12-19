import { Inject, Injectable } from '@tsed/di';
import { EventsRepository, TodosRepository } from '@/repositories';
import { UserService } from '@/services/UserService';
import { EventModel } from '@/models';
import { EventRequestModel, EventResponseModel } from '@/interfaces/EventInterface';
import { $log } from '@tsed/common';

@Injectable()
export class EventService {
    @Inject()
    private eventRepository: EventsRepository;

    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private userService: UserService;

    async getEventsByUsername(username: string): Promise<EventModel[]> {
        const user = await this.userService.findByUsername(username);
        return await this.eventRepository.findMany({ where: { userId: user.id } });
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

    async create(username: string, event: EventRequestModel): Promise<EventModel> {
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

    async update(event: EventRequestModel) {
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

    updateEvents(events: EventRequestModel[]) {
        // return Promise.resolve(undefined);
    }

    /**
     * Delete an event and the relation to todos
     * @TODO logically delete
     * @param id
     */
    async deleteEvent(id: number) {
        const event = await this.getEventById(id);
        // disconnect from its linked todos
        if (event) {
            event.LinkedTodos?.forEach((todo) => {
                // usually there is only one linked todo for an event
                this.todoRepository.update({
                    where: { id: todo.id },
                    data: {
                        LinkedEvents: {
                            disconnect: { id: event.id }
                        }
                    }
                });
            });
            return await this.eventRepository.delete({ where: { id } });
        } else {
            throw new Error('Event not found');
        }
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
