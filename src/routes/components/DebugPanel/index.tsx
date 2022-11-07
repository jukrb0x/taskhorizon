import {
    Typography,
    Button,
    Space,
    SideSheet,
    Input,
    Notification,
    Toast,
    Modal
} from '@douyinfe/semi-ui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebugStore } from '@/store';
import { cls } from '@/utils';

const { Title } = Typography;
const StyledTitle = cls(Title)`tw-pb-2`;

const ModalDebugPanel = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleDebugKeyPress = useCallback((e) => {
        e.preventDefault();
        if (e.key == 'p' && (e.ctrlKey || e.metaKey)) {
            setModalVisible(true);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleDebugKeyPress);
        return () => {
            document.removeEventListener('keypress', handleDebugKeyPress);
        };
    }, [handleDebugKeyPress]);

    return (
        <Modal
            visible={modalVisible}
            footer={null}
            size={'large'}
            onCancel={() => setModalVisible(false)}
        >
            <DebugPanel />
        </Modal>
    );
};

const SideSheetDebugPanel = () => {
    const [sideSheetVisible, setSideSheetVisible] = useState(false);
    return (
        <>
            <div className={styles.wrapper}>
                <Button size={'large'} onClick={() => setSideSheetVisible(!sideSheetVisible)}>
                    Debug
                </Button>
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
    const { toggleDebugPanelStyle, debugPanelStyle } = useDebugStore();

    // data
    const navLinks = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Semi Calendar',
            path: '/component/semi-cal'
        },
        {
            name: 'Tui Calendar',
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

    const handlePositionChange = () => {
        toggleDebugPanelStyle();
        const KBD = (props: { children?: ReactNode }) => (
            <>
                <Button className={'tw-p-0.5'} disabled size={'small'}>
                    {props?.children}
                </Button>
            </>
        );
        Toast.info({
            content: (
                <>
                    Debug panel position changed to the{' '}
                    {debugPanelStyle === 'modal' ? (
                        'side'
                    ) : (
                        <>
                            pop-up, use <KBD>Ctrl</KBD>+<KBD>P</KBD> to toggle it
                        </>
                    )}
                </>
            )
        });
    };

    return (
        <div>
            <StyledTitle heading={2}>
                Debug Panel
                <Button
                    onClick={() => handlePositionChange()}
                    size={'small'}
                    className={'tw-ml-2 tw-p-1 tw-text-xs'}
                >
                    Change Panel Position
                </Button>
            </StyledTitle>
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
                    onKeyDown={(e) => {
                        e.key == 'Enter' ? navigate(path) : {};
                    }}
                    onEnterPress={() => navigate(path)}
                />
                <Button onClick={() => cleanAndReload()}>Clean Storage</Button>
            </Space>
        </div>
    );
};

export default function DebugPanelWrapper() {
    const { debugPanelStyle } = useDebugStore();
    return debugPanelStyle === 'modal' ? <ModalDebugPanel /> : <SideSheetDebugPanel />;
}
