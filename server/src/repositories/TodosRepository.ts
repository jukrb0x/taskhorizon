import { isArray } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { Injectable, Inject } from '@tsed/di';
import { PrismaService } from '../services/PrismaService';
import { Prisma, Todo } from '../client';
import { TodoModel } from '../models';

@Injectable()
export class TodosRepository {
    @Inject()
    protected prisma: PrismaService;

    get collection() {
        return this.prisma.todo;
    }

    get groupBy() {
        return this.collection.groupBy.bind(this.collection);
    }

    protected deserialize<T>(obj: null | Todo | Todo[]): T {
        return deserialize<T>(obj, { type: TodoModel, collectionType: isArray(obj) ? Array : undefined });
    }

    async findUnique(args: Prisma.TodoFindUniqueArgs): Promise<TodoModel | null> {
        const obj = await this.collection.findUnique(args);
        return this.deserialize<TodoModel | null>(obj);
    }

    async findFirst(args: Prisma.TodoFindFirstArgs): Promise<TodoModel | null> {
        const obj = await this.collection.findFirst(args);
        return this.deserialize<TodoModel | null>(obj);
    }

    async findMany(args?: Prisma.TodoFindManyArgs): Promise<TodoModel[]> {
        const obj = await this.collection.findMany(args);
        return this.deserialize<TodoModel[]>(obj);
    }

    async create(args: Prisma.TodoCreateArgs): Promise<TodoModel> {
        const obj = await this.collection.create(args);
        return this.deserialize<TodoModel>(obj);
    }

    async update(args: Prisma.TodoUpdateArgs): Promise<TodoModel> {
        const obj = await this.collection.update(args);
        return this.deserialize<TodoModel>(obj);
    }

    async upsert(args: Prisma.TodoUpsertArgs): Promise<TodoModel> {
        const obj = await this.collection.upsert(args);
        return this.deserialize<TodoModel>(obj);
    }

    async delete(args: Prisma.TodoDeleteArgs): Promise<TodoModel> {
        const obj = await this.collection.delete(args);
        return this.deserialize<TodoModel>(obj);
    }

    async deleteMany(args: Prisma.TodoDeleteManyArgs) {
        return this.collection.deleteMany(args);
    }

    async updateMany(args: Prisma.TodoUpdateManyArgs) {
        return this.collection.updateMany(args);
    }

    async aggregate(args: Prisma.TodoAggregateArgs) {
        return this.collection.aggregate(args);
    }
}
