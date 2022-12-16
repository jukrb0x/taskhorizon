import { Event } from '../client';
import { Integer, Required, Property, Format, Allow, CollectionOf } from '@tsed/schema';
import { TodoModel } from './TodoModel';
import { UserModel } from './UserModel';

export class EventModel implements Event {
    @Property(Number)
    @Integer()
    @Required()
    id: number;

    @Property(Date)
    @Format('date-time')
    @Required()
    updatedAt: Date;

    @Property(Date)
    @Format('date-time')
    @Required()
    createdAt: Date;

    @Property(String)
    @Required()
    uuid: string;

    @Property(String)
    @Required()
    title: string;

    @Property(String)
    @Allow(null)
    description: string | null;

    @Property(Date)
    @Format('date-time')
    @Required()
    start: Date;

    @Property(Date)
    @Format('date-time')
    @Required()
    end: Date;

    @Property(Boolean)
    @Required()
    allDay: boolean;

    @Property(Boolean)
    @Required()
    completed: boolean;

    @CollectionOf(() => TodoModel)
    @Required()
    LinkedTodos: TodoModel[];

    @Property(() => UserModel)
    @Required()
    User: UserModel;

    @Property(Number)
    @Integer()
    @Required()
    userId: number;
}
