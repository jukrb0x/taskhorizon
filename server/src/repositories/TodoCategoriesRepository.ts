import { isArray } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { Injectable, Inject } from '@tsed/di';
import { PrismaService } from '../services/PrismaService';
import { Prisma, TodoCategory } from '../client';
import { TodoCategoryModel } from '../models';

@Injectable()
export class TodoCategoriesRepository {
    @Inject()
    protected prisma: PrismaService;

    get collection() {
        return this.prisma.todoCategory;
    }

    get groupBy() {
        return this.collection.groupBy.bind(this.collection);
    }

    protected deserialize<T>(obj: null | TodoCategory | TodoCategory[]): T {
        return deserialize<T>(obj, { type: TodoCategoryModel, collectionType: isArray(obj) ? Array : undefined });
    }

    async findUnique(args: Prisma.TodoCategoryFindUniqueArgs): Promise<TodoCategoryModel | null> {
        const obj = await this.collection.findUnique(args);
        return this.deserialize<TodoCategoryModel | null>(obj);
    }

    async findFirst(args: Prisma.TodoCategoryFindFirstArgs): Promise<TodoCategoryModel | null> {
        const obj = await this.collection.findFirst(args);
        return this.deserialize<TodoCategoryModel | null>(obj);
    }

    async findMany(args?: Prisma.TodoCategoryFindManyArgs): Promise<TodoCategoryModel[]> {
        const obj = await this.collection.findMany(args);
        return this.deserialize<TodoCategoryModel[]>(obj);
    }

    async create(args: Prisma.TodoCategoryCreateArgs): Promise<TodoCategoryModel> {
        const obj = await this.collection.create(args);
        return this.deserialize<TodoCategoryModel>(obj);
    }

    async update(args: Prisma.TodoCategoryUpdateArgs): Promise<TodoCategoryModel> {
        const obj = await this.collection.update(args);
        return this.deserialize<TodoCategoryModel>(obj);
    }

    async upsert(args: Prisma.TodoCategoryUpsertArgs): Promise<TodoCategoryModel> {
        const obj = await this.collection.upsert(args);
        return this.deserialize<TodoCategoryModel>(obj);
    }

    async delete(args: Prisma.TodoCategoryDeleteArgs): Promise<TodoCategoryModel> {
        const obj = await this.collection.delete(args);
        return this.deserialize<TodoCategoryModel>(obj);
    }

    async deleteMany(args: Prisma.TodoCategoryDeleteManyArgs) {
        return this.collection.deleteMany(args);
    }

    async updateMany(args: Prisma.TodoCategoryUpdateManyArgs) {
        return this.collection.updateMany(args);
    }

    async aggregate(args: Prisma.TodoCategoryAggregateArgs) {
        return this.collection.aggregate(args);
    }
}
