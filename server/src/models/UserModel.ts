import { User } from '../client';
import { Integer, Required, Property, Format, Email, Description, CollectionOf } from '@tsed/schema';
import { TodoModel } from './TodoModel';
import { EventModel } from './EventModel';
import { TodoCategoryModel } from './TodoCategoryModel';

export class UserModel implements User {
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
    @Email()
    @Description('Email of the user')
    email: string;

    @Property(String)
    @Required()
    username: string;

    @Property(String)
    @Required()
    password: string;

    @CollectionOf(() => TodoModel)
    @Required()
    Todo: TodoModel[];

    @CollectionOf(() => EventModel)
    @Required()
    Event: EventModel[];

    @CollectionOf(() => TodoCategoryModel)
    @Required()
    TodoCategory: TodoCategoryModel[];
}
