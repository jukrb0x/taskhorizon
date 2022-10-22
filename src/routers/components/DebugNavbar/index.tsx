import { Button, Space } from '@douyinfe/semi-ui';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';

export default function DebugNavbar() {
    const location = useLocation();
    const [isClose, setIsClose] = useState(false);
    const navLinks = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Calendar',
            path: '/component/cal'
        }
    ];
    return (
        <div className={'debug-wrapper'}>
            <div className={'navbar'} style={isClose ? { display: 'none' } : {}}>
                <Space>
                    <b>Debug</b>
                    {navLinks.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <Button type={'primary'}>{item.name}</Button>
                        </Link>
                    ))}
                </Space>
                <br />
                <span>
                    <b>Path:</b> {location.pathname}
                </span>
            </div>
            <Button
                type={'tertiary'}
                theme={'solid'}
                onClick={() => setIsClose(!isClose)}
                className={'debug-btn'}
            >
                Debug
            </Button>
        </div>
    );
}
