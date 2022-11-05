import { Typography, Button, Space, SideSheet, Input } from '@douyinfe/semi-ui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const { Title } = Typography;
const StyledTitle = styled(Title)`
    padding-bottom: 10px;
`;

const SideSheetDebugPanel = () => {
    const [sideSheetVisible, setSideSheetVisible] = useState(false);
    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={() => setSideSheetVisible(!sideSheetVisible)}>Debug</Button>
                <SideSheet
                    visible={sideSheetVisible}
                    onCancel={() => setSideSheetVisible(!sideSheetVisible)}
                >
                    <DebugPanel />
                </SideSheet>
            </div>
        </>
    );
};

const DebugPanel = () => {
    // hooks
    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState('');

    // data
    const navLinks = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Calendar',
            path: '/component/cal'
        },
        {
            name: 'Big Calendar',
            path: '/component/big-cal'
        }
    ];

    const cleanAndReload = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div>
            <StyledTitle heading={2}>Debug Panel</StyledTitle>
            <Space vertical align={'start'}>
                <Space align={'start'}>
                    {navLinks.map((item) => (
                        <Link to={item.path} key={item.path}>
                            <Button type={'primary'}>{item.name}</Button>
                        </Link>
                    ))}
                </Space>
                <Input prefix={'Current'} value={location.pathname} disabled />
                <Input
                    placeholder={'Enter to navigate'}
                    onChange={(e) => setPath(e)}
                    prefix={'Goto'}
                    value={path}
                    // onKeyDown={(e) => {
                    //     e.key == 'Enter' ? navigate(path) : {};
                    // }}
                    onEnterPress={() => navigate(path)}
                />
                <Button onClick={() => cleanAndReload()}>Clean Storage</Button>
            </Space>
        </div>
    );
};

export default function DebugPanelWrapper({ sidesheet = true }: { sidesheet?: boolean }) {
    return sidesheet ? <SideSheetDebugPanel /> : <DebugPanel />;
}
