import { Button, Input, Col, Row, TimePicker, ConfigProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

export default function TodoApp() {
    return (
        <>
            <ConfigProvider locale={en_GB}>
                <h1>{'Todo App'}</h1>
                <div className={'frame'}>
                    <Row gutter={12} className={'todo-input'}>
                        <Col span={12}>
                            <Input placeholder="something to do..." />
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={6} className={'todo-list'}>
                        <Col span={6}>
                            <TimePicker
                                type={'timeRange'}
                                defaultValue={['00:00:00', '00:00:00']}
                            />
                        </Col>
                        <Col span={12}>
                            <Button type="primary">Add</Button>
                        </Col>
                    </Row>
                    <Row className={'todo-list'}>Item</Row>
                </div>
            </ConfigProvider>
        </>
    );
}
