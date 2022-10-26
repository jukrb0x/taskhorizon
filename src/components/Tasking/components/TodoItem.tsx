import { Checkbox } from '@douyinfe/semi-ui';

import { Todo } from '../todos';

type TodoItemProps = {
    todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
    return (
        <>
            <Checkbox
                checked={todo.isDone}
                onChange={() => {
                    console.log(todo);
                }}
            >
                {todo.title}
            </Checkbox>
        </>
    );
}
