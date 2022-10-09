import { Button, Input } from '@douyinfe/semi-ui';
import './index.scss';

export default function TodoApp() {
    return (
        <>
            <h1>Todo App</h1>
            <div className={'frame'}>
                <Input placeholder="something to do..." />
                <Button type="primary">Add</Button>
            </div>
        </>
    );
}
