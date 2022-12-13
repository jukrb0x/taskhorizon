import { useEventStore, useTodoStore } from '@/store';

export const useTodo = () => {
    const {
        eventList,
        setEvent: setEventInternal,
        addEvent,
        addLinkedTodo,
        removeEvent,
        toggleCompleted: toggleEventCompleted
    } = useEventStore();
    const {
        todoList,
        addTodo,
        setTodo,
        toggleCompleted: toggleTodoCompleted,
        removeTodo,
        setDragItem,
        clearDragItem,
        getTodoById
    } = useTodoStore();
};
