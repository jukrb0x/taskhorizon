import { EventObject, TZDate } from '@toast-ui/calendar';

export type CalendarEvent =
    | EventObject
    | {
          id: number;
          calendarId: string;
          title: string;
          category: string;
          start: TZDate;
          end: TZDate;
      };
