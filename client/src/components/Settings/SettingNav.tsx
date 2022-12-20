import { SettingsNavs, SettingsNavTabs } from './Settings';
import { AuthAPI } from '@/apis';
import { SettingsAbout, SettingsProfile } from '@/components';
import { Button, Divider, Text } from '@mantine/core';
import { IconLogout, IconPacman, IconUser } from '@tabler/icons';
import { ReactNode } from 'react';

const SettingNavButton = ({
    icon,
    label,
    color,
    onClick,
    selected = false,
    disabled = false
}: {
    icon: ReactNode;
    label: string;
    color?: string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}) => {
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
        <Text
            tt={'uppercase'}
            c={'dimmed'}
            fz={'xs'}
            fw={600}
            className={'tw-p-1 tw-select-none tw-cursor-default'}
        >
            {children}
        </Text>
    );
};

export interface SettingsNav {
    label: SettingsNavTabs;
    icon: ReactNode;
    component: ReactNode;
}

export const SettingsNav = (props: {
    activeTab: SettingsNavTabs;
    setActiveTab: (label: SettingsNavTabs) => void;
}) => {
    return (
        <div className={'tw-space-y-1.5 tw-flex tw-flex-col'}>
            <SectionTitle>Settings</SectionTitle>
            {SettingsNavs.map((nav, index) => {
                return (
                    <SettingNavButton
                        key={index}
                        icon={nav.icon}
                        label={nav.label}
                        selected={props.activeTab === nav.label}
                        onClick={() => props.setActiveTab(nav.label)}
                    />
                );
            })}
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
