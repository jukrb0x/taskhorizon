import { CalendarEvent, EventIdGenerator } from '@/store';
import { http } from './http';
import { renameKeys } from '@/utils/common';

interface CalendarEventRequestModel {
    uuid: string; // id
    title: string;
    description: string;
    allDay: boolean;
    completed: boolean;
    desc: string;
    start: Date;
    end: Date;
    linkedTodos: string[];
}

export class EventAPI {
    static async getEvents(): Promise<CalendarEvent[]> {
        const { data } = await http.get<CalendarEvent[]>('/event/all');
        return data;
    }

    static async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
        const req: CalendarEventRequestModel = renameKeys(event, {
            id: 'uuid',
            desc: 'description'
        });
        const { data } = await http.post<CalendarEvent>('/event/create', req);
        return data;
    }

    static async updateEvent(event: CalendarEvent): Promise<CalendarEvent> {
        const req: CalendarEventRequestModel = renameKeys(event, {
            id: 'uuid',
            desc: 'description'
        });
        const { data } = await http.post<CalendarEvent>('/event/update', req);
        return data;
    }

    static async deleteEventById(id: string): Promise<CalendarEvent> {
        const { data } = await http.get<CalendarEvent>(`/event/delete/${id}`);
        return data;
    }

    static async deleteEvents(ids: string[]): Promise<CalendarEvent[]> {
        // return await Promise.all(ids.map((id) => EventAPI.deleteEventById(id)));
    }
}
