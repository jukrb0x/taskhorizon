import { Button, Space } from '@douyinfe/semi-ui';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { useState } from 'react';

export default function DebugNavbar() {
    const location = useLocation();
    const [isCollapse, setIsCollapse] = useState(false);
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
        <div className={styles.wrapper}>
            <div className={styles.navbar} style={isCollapse ? { display: 'none' } : {}}>
                <Space>
                    <b>Goto: </b>
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
                onClick={() => setIsCollapse(!isCollapse)}
                className={styles['debug-btn']}
            >
                Debug
            </Button>
        </div>
    );
}
