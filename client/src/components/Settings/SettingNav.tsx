import { ActionIcon, Modal, Button, Text, Divider } from '@mantine/core';
import { IconLogout, IconMessageCircle, IconPhoto, IconSettings, IconUser } from '@tabler/icons';
import { IconClose } from '@douyinfe/semi-icons';
import { ReactNode, useState } from 'react';

const SettingNavButton = ({ icon, label, color, selected }: any) => {
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
            <SettingNavButton icon={<IconPhoto />} label={'Profile'} />
            <Divider color={'gray.3'} my={'xs'} />
            <SettingNavButton icon={<IconLogout />} label={'Logout'} color={'red'} />
        </div>
    );
};
