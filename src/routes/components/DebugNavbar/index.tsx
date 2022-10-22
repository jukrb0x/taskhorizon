import { Button, Space, SideSheet } from '@douyinfe/semi-ui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

export default function DebugNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState(location.pathname);
    const [isCollapse, setIsCollapse] = useState(false);
    const [sideSheetVisible, setSideSheetVisible] = useState(false);
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
            {/*<div className={styles.navbar} style={isCollapse ? { display: 'none' } : {}}>
                <Space>
                    <b>Preset: </b>
                    {navLinks.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <Button type={'primary'}>{item.name}</Button>
                        </Link>
                    ))}
                </Space>
                <br />
                <span>
                    <b>Current: </b>
                    {location.pathname}{' '}
                </span>
                <br />
                <span>
                    <input
                        placeholder={'Enter to navigate'}
                        type="text"
                        onChange={(e) => setPath(e.target.value)}
                        value={path}
                        onKeyDown={(e) => {
                            e.key == 'Enter' ? navigate(path) : {};
                        }}
                    ></input>
                </span>
            </div>*/}
            {/*<Button*/}
            {/*    type={'tertiary'}*/}
            {/*    theme={'solid'}*/}
            {/*    onClick={() => setIsCollapse(!isCollapse)}*/}
            {/*    className={styles['debug-btn']}*/}
            {/*>*/}
            {/*    Debug*/}
            {/*</Button>*/}
            <Button onClick={() => setSideSheetVisible(!sideSheetVisible)}>Debug</Button>
            <SideSheet
                visible={sideSheetVisible}
                onCancel={() => {
                    setSideSheetVisible(!sideSheetVisible);
                }}
            >
                <Space>
                    <b>Preset: </b>
                    {navLinks.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <Button type={'primary'}>{item.name}</Button>
                        </Link>
                    ))}
                </Space>
                <br />
                <span>
                    <b>Current: </b>
                    {location.pathname}{' '}
                </span>
                <br />
                <span>
                    <input
                        placeholder={'Enter to navigate'}
                        type="text"
                        onChange={(e) => setPath(e.target.value)}
                        value={path}
                        onKeyDown={(e) => {
                            e.key == 'Enter' ? navigate(path) : {};
                        }}
                    ></input>
                </span>
            </SideSheet>
        </div>
    );
}
