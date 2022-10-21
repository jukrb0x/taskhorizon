import TodoList from '@/components/Todo/TodoList';

export default function TodoApp() {
    return (
        <>
            {/* todo: ConfigProvider will be moved out to this component*/}
            <h1>{'Todo App'}</h1>
            <div style={{ margin: '5px' }}>
                <TodoList />
            </div>
        </>
    );
}
