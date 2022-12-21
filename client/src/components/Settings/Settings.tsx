import { IconClose } from '@douyinfe/semi-icons';
import { ActionIcon, Modal, ScrollArea } from '@mantine/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
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

    useEffect(() => {
        if (props.opened) {
            setActiveTab(SettingsNavTabs.Profile);
        }
    }, [props.opened]);

    return (
        <>
            <Modal
                opened={props.opened}
                onClose={() => {
                    props.onClose();
                }}
                fullScreen
                transition={'pop'}
                exitTransitionDuration={300}
                styles={() => {
                    // unset the default modal header
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
                    // Modal Close Button
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
