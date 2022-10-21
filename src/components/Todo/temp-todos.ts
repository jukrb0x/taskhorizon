enum TodoType {
    todo,
    event,
    both
}

type Todo = {
    eventId: number;
    type: TodoType;
    isDone: boolean; // only works when `isTodo == true`
    title: string;
    note: string | null;
    start: Date | null;
    end: Date | null;
    reminder: Date[] | null;
};

const todoList: Todo[] = [
    {
        eventId: 0,
        type: TodoType.todo,
        isDone: false,
        title: 'orange juice',
        note: 'marigold peel fresh',
        start: new Date(2022, 10, 1, 1, 1),
        end: new Date(2022, 10, 1, 2, 1),
        reminder: []
    },
    {
        eventId: 1,
        type: TodoType.todo,
        isDone: false,
        title: 'ice cream',
        note: '',
        start: new Date(2022, 10, 1, 1, 1),
        end: new Date(2022, 10, 1, 2, 1),
        reminder: []
    },
    {
        eventId: 2,
        type: TodoType.event,
        isDone: false,
        title: 'some fyp meeting',
        note: 'with supervisor',
        start: new Date(2022, 10, 21, 21, 1),
        end: new Date(2022, 10, 21, 21, 30),
        reminder: []
    }
];

export { todoList, TodoType };
export type { Todo };
