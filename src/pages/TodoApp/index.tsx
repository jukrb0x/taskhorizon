import { ConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import TodoList from '@/components/Todo/TodoList';

export default function TodoApp() {
    return (
        <>
            {/* todo: ConfigProvider will be moved out to this component*/}
            <ConfigProvider locale={en_GB}>
                <h1>{'Todo App'}</h1>
                <div style={{ margin: '5px' }}>
                    <TodoList />
                </div>
            </ConfigProvider>
        </>
    );
}
