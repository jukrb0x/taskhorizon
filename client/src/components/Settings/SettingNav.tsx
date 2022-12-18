import { ActionIcon, Modal, Button, Text, Divider } from '@mantine/core';
import {
    IconAffiliate,
    IconFlame,
    IconLogout,
    IconMessageCircle,
    IconPacman,
    IconPennant,
    IconPhoto,
    IconSettings,
    IconUser
} from '@tabler/icons';
import { IconClose } from '@douyinfe/semi-icons';
import { ReactNode, useState } from 'react';
import { AuthAPI } from '@/apis';

const SettingNavButton = ({ icon, label, color, selected, disabled, onClick }: any) => {
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
                color={color ? color : 'gray.7'}
                leftIcon={icon}
                disabled={disabled}
                onClick={onClick}
            >
                {label}
            </Button>
        </>
    );
};

const SectionTitle = ({ children }: { children: ReactNode }) => {
    return (
        <Text tt={'uppercase'} c={'dimmed'} fz={'xs'} fw={600} className={'tw-p-1'}>
            {children}
        </Text>
    );
};

export const SettingsNav = () => {
    const [activeTab, setActiveTab] = useState('');

    return (
        <div className={'tw-space-y-1.5 tw-flex tw-flex-col'}>
            <SectionTitle>Settings</SectionTitle>
            <SettingNavButton icon={<IconUser />} label={'Profile'} selected />
            <SettingNavButton icon={<IconPacman />} label={'About'} />
            <Divider color={'gray.3'} my={'xs'} />
            <SettingNavButton
                icon={<IconLogout />}
                label={'Logout'}
                color={'red'}
                onClick={async () => {
                    await AuthAPI.logout();
                }}
            />
        </div>
    );
};
