import { EventModel } from '@/models';

export interface TodoRequestModel {
    title: string;
    completed: boolean;
    uuid: string;
    category: {
        id: string;
        name: string;
    };
    order: number | null;
    linkedEvents: string[];
}

/**
 * This Response Model should strictly match the client-side Todo interface
 */
export interface TodoResponseModel {
    id: string;
    order?: number | null;
    category: {
        id: string;
        name: string;
    };
    completed: boolean;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    linkedEvents: string[];
}
