import { isArray } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { Injectable, Inject } from '@tsed/di';
import { PrismaService } from '../services/PrismaService';
import { Prisma, Event } from '../client';
import { EventModel } from '../models';

@Injectable()
export class EventsRepository {
    @Inject()
    protected prisma: PrismaService;

    get collection() {
        return this.prisma.event;
    }

    get groupBy() {
        return this.collection.groupBy.bind(this.collection);
    }

    protected deserialize<T>(obj: null | Event | Event[]): T {
        return deserialize<T>(obj, { type: EventModel, collectionType: isArray(obj) ? Array : undefined });
    }

    async findUnique(args: Prisma.EventFindUniqueArgs): Promise<EventModel | null> {
        const obj = await this.collection.findUnique(args);
        return this.deserialize<EventModel | null>(obj);
    }

    async findFirst(args: Prisma.EventFindFirstArgs): Promise<EventModel | null> {
        const obj = await this.collection.findFirst(args);
        return this.deserialize<EventModel | null>(obj);
    }

    async findMany(args?: Prisma.EventFindManyArgs): Promise<EventModel[]> {
        const obj = await this.collection.findMany(args);
        return this.deserialize<EventModel[]>(obj);
    }

    async create(args: Prisma.EventCreateArgs): Promise<EventModel> {
        const obj = await this.collection.create(args);
        return this.deserialize<EventModel>(obj);
    }

    async update(args: Prisma.EventUpdateArgs): Promise<EventModel> {
        const obj = await this.collection.update(args);
        return this.deserialize<EventModel>(obj);
    }

    async upsert(args: Prisma.EventUpsertArgs): Promise<EventModel> {
        const obj = await this.collection.upsert(args);
        return this.deserialize<EventModel>(obj);
    }

    async delete(args: Prisma.EventDeleteArgs): Promise<EventModel> {
        const obj = await this.collection.delete(args);
        return this.deserialize<EventModel>(obj);
    }

    async deleteMany(args: Prisma.EventDeleteManyArgs) {
        return this.collection.deleteMany(args);
    }

    async updateMany(args: Prisma.EventUpdateManyArgs) {
        return this.collection.updateMany(args);
    }

    async aggregate(args: Prisma.EventAggregateArgs) {
        return this.collection.aggregate(args);
    }
}
