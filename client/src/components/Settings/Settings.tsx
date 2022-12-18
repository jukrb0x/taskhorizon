import { ActionIcon, Modal, Button as MButton } from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons';
import { IconClose } from '@douyinfe/semi-icons';
import { useState } from 'react';
import { Button, SettingsNav } from '@/components';

export const Settings = (props: { opened: boolean; onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('');

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
                trapFocus={false}
            >
                <div
                    className={'tw-w-full tw-flex tw-justify-end tw-fixed tw-h-8 tw-p-2'}
                    data-tauri-drag-region
                >
                    <ActionIcon size={'xl'} onClick={props.onClose} radius={'xl'}>
                        <IconClose />
                    </ActionIcon>
                </div>

                <div
                    className={
                        'tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-full tw-w-full'
                    }
                >
                    <div className={'tw-basis-1/4 tw-h-screen tw-bg-gray-100/50 tw-pt-20'}>
                        <div className={'tw-flex-col tw-flex tw-ml-auto tw-pr-5 tw-w-48'}>
                            <SettingsNav />
                        </div>
                    </div>
                    <div className={'tw-basis-3/4 tw-px-10'}>right</div>
                </div>
            </Modal>
        </>
    );
};
