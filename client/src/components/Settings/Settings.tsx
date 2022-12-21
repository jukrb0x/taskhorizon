import { IconClose } from '@douyinfe/semi-icons';
import { ActionIcon, Button as MButton, Modal, ScrollArea } from '@mantine/core';
import {
    IconCommand,
    IconMessageCircle,
    IconPacman,
    IconPhoto,
    IconSettings,
    IconUser
} from '@tabler/icons';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

import {
    Button,
    SettingsAbout,
    SettingsNav,
    SettingsNavTabs,
    SettingsProfile,
    SettingsShortcuts
} from '@/components';

/**
 * This one cannot be exported as const, otherwise it will cause the Vite HMR to fail.
 */
const SettingNavContent = ({ activeTab }: { activeTab: SettingsNavTabs }) => {
    switch (activeTab) {
    case SettingsNavTabs.Profile:
        return <SettingsProfile />;
    case SettingsNavTabs.About:
        return <SettingsAbout />;
    case SettingsNavTabs.Shortcuts:
        return <SettingsShortcuts />;
    }
};

export const Settings = (props: { opened: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<SettingsNavTabs>(SettingsNavTabs.Profile);

    return (
        <>
            <Modal
                opened={props.opened}
                onClose={props.onClose}
                fullScreen
                transition={'pop'}
                exitTransitionDuration={300}
                styles={() => {
                    return {
                        title: {
                            height: '7px'
                        },
                        modal: {
                            padding: '0!important'
                        }
                    };
                }}
                withCloseButton={false}
                withFocusReturn={false}
                zIndex={30}
            >
                <div
                    className={clsx(
                        'tw-w-full tw-flex tw-justify-end',
                        'tw-fixed tw-top-0 tw-z-30 tw-fixed tw-h-13 tw-p-2'
                    )}
                    data-tauri-drag-region
                >
                    <ActionIcon size={'xl'} onClick={props.onClose} radius={'xl'}>
                        <IconClose />
                    </ActionIcon>
                </div>

                <div
                    className={clsx(
                        'tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-full tw-w-full',
                        ' tw-bg-[#eee]/60',
                        'tw-overflow-hidden'
                    )}
                >
                    <div className={'tw-basis-2/5 tw-h-screen tw-pt-20 '}>
                        <div className={'tw-flex-col tw-flex tw-ml-auto tw-pr-5 tw-w-48'}>
                            <SettingsNav
                                activeTab={activeTab}
                                setActiveTab={(label) => setActiveTab(label)}
                            />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'tw-basis-3/5 tw-h-screen tw-pt-20 tw-px-10',
                            'tw-drop-shadow-xl tw-rounded-l-3xl tw-bg-white'
                        )}
                    >
                        <ScrollArea.Autosize maxHeight={'100%'} type={'never'}>
                            <div className={'tw-flex'}>
                                <div className={'tw-w-4/5 tw-pb-8'}>
                                    <SettingNavContent activeTab={activeTab} />
                                </div>
                            </div>
                        </ScrollArea.Autosize>
                    </div>
                </div>
            </Modal>
        </>
    );
};

// if (import.meta.hot)
//     import.meta.hot.acceptExports(['SettingsNavs', 'SettingsNavTabs', 'SettingNavContent']);
//
