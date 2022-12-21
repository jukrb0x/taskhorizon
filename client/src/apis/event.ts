import { CalendarEvent, EventIdGenerator } from '@/store';
import { renameKeys } from '@/utils/common';

import { http } from './http';

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

const getEvents = async (): Promise<CalendarEvent[]> => {
    const { data } = await http.get<CalendarEvent[]>('/event/all');
    return data;
};

const createEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
    const req: CalendarEventRequestModel = renameKeys(event, {
        id: 'uuid',
        desc: 'description'
    });
    const { data } = await http.post<CalendarEvent>('/event/create', req);
    return data;
};

const updateEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
    const req: CalendarEventRequestModel = renameKeys(event, {
        id: 'uuid',
        desc: 'description'
    });
    const { data } = await http.post<CalendarEvent>('/event/update', req);
    return data;
};

// TODO: DO NOT USE ME
const updateEvents = async (events: CalendarEvent[]): Promise<CalendarEvent[]> => {
    const req: CalendarEventRequestModel[] = events.map((event) => {
        return renameKeys(event, { id: 'uuid', desc: 'description' });
    });
    const { data } = await http.post('/event/update/batch', req);
    return data;
};

const deleteEventById = async (id: string): Promise<CalendarEvent> => {
    const { data } = await http.delete<CalendarEvent>(`/event/delete/${id}`);
    return data;
};

const deleteEvents = async (ids: string[]): Promise<CalendarEvent[]> => {
    const { data } = await http.post('/event/delete', ids);
    return data;
};
export const EventAPI = {
    getEvents,
    createEvent,
    updateEvent,
    updateEvents,
    deleteEventById,
    deleteEvents
};

if (import.meta.hot) import.meta.hot.acceptExports('EventAPI');
