import { TodoCategory } from '../client';
import { Integer, Required, Property, Format, CollectionOf } from '@tsed/schema';
import { UserModel } from './UserModel';
import { TodoModel } from './TodoModel';

export class TodoCategoryModel implements TodoCategory {
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
    name: string;

    @Property(() => UserModel)
    @Required()
    User: UserModel;

    @Property(Number)
    @Integer()
    @Required()
    userId: number;

    @CollectionOf(() => TodoModel)
    @Required()
    Todo: TodoModel[];
}
