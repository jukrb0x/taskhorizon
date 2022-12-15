import { CalendarEvent, EventIdGenerator } from '@/store';
import { http } from './http';
import { renameKeys } from '@/utils/common';

interface CalendarEventRequestModel extends Omit<CalendarEvent, 'id'> {
    uuid: string;
    description: string;
}

export class EventAPI {
    // static async getEvents(): Promise<CalendarEvent[]> {
    //
    // }

    static async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
        const req = renameKeys(event, { id: 'uuid', description: 'desc' });
        req.uuid = EventIdGenerator();
        console.log(req);
        const { data } = await http.post<CalendarEvent>('/event/create', event);
        return data;
    }
}
