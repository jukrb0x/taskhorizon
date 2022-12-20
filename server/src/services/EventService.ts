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
        return await this.eventRepository.findMany({
            where: { userId: user.id },
            include: { LinkedTodos: true },
            orderBy: { createdAt: 'asc' }
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

    async create(username: string, event: EventRequestModel): Promise<EventModel> {
        const user = await this.userService.findByUsername(username);
        const { linkedTodos, ...data } = event;
        const created = await this.eventRepository.create({
            data: {
                ...data,
                LinkedTodos: {
                    connect: linkedTodos?.map((todoUUID) => ({ uuid: todoUUID }))
                },
                User: { connect: { id: user.id } }
            },
            include: {
                LinkedTodos: true
            }
        });
        // refresh the linked todos
        linkedTodos?.forEach((todoUUID) => {
            this.todoRepository.update({
                where: { uuid: todoUUID },
                data: {
                    updatedAt: new Date()
                }
            });
        });

        return created;
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
            },
            include: {
                LinkedTodos: true
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
    async deleteEvent(id: number): Promise<EventModel> {
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
                        },
                        updatedAt: new Date()
                    },
                    include: {
                        LinkedEvents: true
                    }
                });
            });
            return await this.eventRepository.delete({ where: { id: event.id } });
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

    async getLinkedEvents(event: EventModel) {
        const { LinkedTodos } = event;
        const linkedEvents = await this.eventRepository.findMany({
            where: {
                LinkedTodos: {
                    some: {
                        id: {
                            in: LinkedTodos?.map((todo) => todo.id)
                        }
                    }
                }
            },
            include: {
                LinkedTodos: true
            }
        });
        return linkedEvents;
    }

    // update the title and completed status of linked todos with the event
    async updateLinkedTodos(updatedEvent: EventModel) {
        const { LinkedTodos, ...data } = updatedEvent;
        // check if other linked events is completed
        const linkedEvents = await this.getLinkedEvents(updatedEvent);
        let isCompleted = updatedEvent.completed;
        if (linkedEvents.length > 0) {
            isCompleted = linkedEvents.every((event) => event.completed);
        }

        LinkedTodos?.forEach((todo) => {
            this.todoRepository.update({
                where: { id: todo.id },
                data: {
                    title: data.title,
                    completed: isCompleted,
                    updatedAt: new Date()
                }
            });
        });
    }

    // update the title and description to other linked events
    async updateLinkedEvents(updatedEvent: EventModel) {
        const { LinkedTodos, ...data } = updatedEvent;
        const linkedEvents = await this.getLinkedEvents(updatedEvent);
        $log.error('linkedEvents', linkedEvents);
        linkedEvents?.forEach((event) => {
            this.eventRepository.update({
                where: { id: event.id },
                data: {
                    title: data.title,
                    description: data.description,
                    updatedAt: new Date()
                }
            });
        });
    }
}
