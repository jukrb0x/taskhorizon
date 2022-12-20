import { SettingsAbout, SettingsNav, SettingsProfile } from '@/components';
import { IconPacman, IconUser } from '@tabler/icons';

export const enum SettingsNavTabs {
    Profile = 'Profile',
    About = 'About'
}

export const SettingsNavs: SettingsNav[] = [
    {
        label: SettingsNavTabs.Profile,
        icon: <IconUser />
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
    }
};
