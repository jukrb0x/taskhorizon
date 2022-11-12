import TodoItem from '@/components/Tasking/components/TodoItem';
import { TodoStore } from '@/store/todo-store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function TodoList({ todos }: { todos: TodoStore[] }) {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                {todos.map((todo, index) => {
                    return <TodoItem todo={todo} key={index} />;
                })}
            </DndProvider>
        </>
    );
}
