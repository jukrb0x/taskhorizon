import { Todo } from '../client';
import { Integer, Required, Property, Format, CollectionOf, Allow } from '@tsed/schema';
import { EventModel } from './EventModel';
import { TodoCategoryModel } from './TodoCategoryModel';
import { UserModel } from './UserModel';

export class TodoModel implements Todo {
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

    @Property(Boolean)
    @Required()
    completed: boolean;

    @CollectionOf(() => EventModel)
    @Required()
    LinkedEvents: EventModel[];

    @Property(() => TodoCategoryModel)
    @Required()
    Category: TodoCategoryModel;

    @Property(Number)
    @Integer()
    @Required()
    categoryId: number;

    @Property(Number)
    @Integer()
    @Allow(null)
    order: number | null;

    @Property(() => UserModel)
    @Required()
    User: UserModel;

    @Property(Number)
    @Integer()
    @Required()
    userId: number;
}
