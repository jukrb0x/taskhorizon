import { ActionIcon, Modal, Button as MButton } from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons';
import { IconClose } from '@douyinfe/semi-icons';
import { ReactNode, useState } from 'react';
import { Button, SettingsNav } from '@/components';
import clsx from 'clsx';

const ModalContent = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
    // TODO
    return <></>;
};

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
                        ' tw-bg-[#eee]/60'
                    )}
                >
                    <div className={'tw-basis-2/5 tw-h-screen tw-pt-20 '}>
                        <div className={'tw-flex-col tw-flex tw-ml-auto tw-pr-5 tw-w-48'}>
                            <SettingsNav />
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'tw-basis-3/5 tw-h-screen tw-pt-20 tw-px-10',
                            'tw-drop-shadow-xl tw-rounded-l-3xl tw-bg-white'
                        )}
                    >
                        <div className={'tw-flex'}>Content will change based on nav selected.</div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
