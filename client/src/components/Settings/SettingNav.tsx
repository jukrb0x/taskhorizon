import { ActionIcon, Modal, Button } from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons';
import { IconClose } from '@douyinfe/semi-icons';
import { useState } from 'react';

const SettingNavButton = ({ icon, label, selected }: any) => {
    return (
        <>
            <Button
                styles={() => {
                    return {
                        inner: {
                            justifyContent: 'flex-start'
                        }
                    };
                }}
                variant={selected ? 'filled' : 'subtle'}
                color={'gray'}
                leftIcon={<IconPhoto />}
            >
                {label}
            </Button>
        </>
    );
};

export const SettingsNav = () => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <>
            <SettingNavButton icon={<IconPhoto />} label={'Profile'} selected />
            <SettingNavButton icon={<IconPhoto />} label={'Profile'} />
        </>
    );
};
