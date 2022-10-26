// temp file for testing

interface Todo {
    todoId: number;
    isDone: boolean;
    title: string;
}

interface Event {
    eventId: number;
    title: string;
    start: Date;
    end: Date;
    reminder: Date[];
    // description: string | null;
}

interface TodoEvent {
    // fixme
    todoId: number;
    eventId: number;
}

const todoList: Todo[] = [
    {
        todoId: 0,
        isDone: false,
        title: 'orange juice'
    },
    {
        todoId: 1,
        isDone: false,
        title: 'ice cream'
    }
];

export { todoList };
export type { TodoEvent, Todo, Event };
