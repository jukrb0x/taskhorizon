import { EventModel } from '@/models';

export interface EventRequestModel {
    uuid: string;
    title: string;
    allDay: boolean;
    completed: boolean;
    description: string | null;
    start: Date;
    end: Date;
    linkedTodos: string[];
}

export interface EventResponseModel {
    id: string; // uuid
    title: string;
    desc: string;
    start: Date;
    end: Date;
    allDay: boolean;
    completed: boolean;
    linkedTodos: string[];
    updatedAt: Date;
}
