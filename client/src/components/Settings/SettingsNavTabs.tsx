import { SettingsAbout, SettingsNav, SettingsProfile, SettingsShortcuts } from '@/components';
import { IconCommand, IconPacman, IconUser } from '@tabler/icons';

export const enum SettingsNavTabs {
    Profile = 'Profile',
    About = 'About',
    Shortcuts = 'Shortcuts'
}

export const SettingsNavs: SettingsNav[] = [
    {
        label: SettingsNavTabs.Profile,
        icon: <IconUser />
    },
    {
        label: SettingsNavTabs.Shortcuts,
        icon: <IconCommand />
    },
    {
        label: SettingsNavTabs.About,
        icon: <IconPacman />
    }
];

export const SettingNavContent = ({ activeTab }: { activeTab: SettingsNavTabs }) => {
    switch (activeTab) {
    case SettingsNavTabs.Profile:
        return <SettingsProfile />;
    case SettingsNavTabs.About:
        return <SettingsAbout />;
    case SettingsNavTabs.Shortcuts:
        return <SettingsShortcuts />;
    }
};

if (import.meta.hot) import.meta.hot.acceptExports('default');
