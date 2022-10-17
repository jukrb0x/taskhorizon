import { Button, Input, Col, Row, TimePicker, ConfigProvider, Checkbox } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import TodoList from '@/components/Todo/TodoList';

export default function TodoApp() {
    return (
        <>
            <ConfigProvider locale={en_GB}>
                <h1>{'Todo App'}</h1>
                {/*<div className={'frame'}>
                    <Row gutter={12} className={'Todo-input'}>
                        <Col span={12}>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={6} className={'Todo-list'}>
                        <Col span={6}>
                            test
                        </Col>
                        <Col span={12}>
                            <Button type="primary">Add</Button>
                        </Col>
                    </Row>
                </div>*/}
                <TodoList />
            </ConfigProvider>
        </>
    );
}
