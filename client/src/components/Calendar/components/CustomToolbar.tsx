import React from 'react';
import clsx from 'clsx';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft } from '@tabler/icons';
import { ActionIcon, Title } from '@mantine/core';
import { Button } from '@/components';
import { Button as MButton } from '@mantine/core';

// import { Navigate as navigate } from '../../../src'

function ViewNamesGroupButtons({
    views: viewNames,
    view,
    messages,
    onView
}: {
    messages: object | any;
    onView: any;
    view: string;
    views: any[];
}) {
    return (
        <>
            {viewNames.map((name) => (
                <Button
                    type="button"
                    key={name}
                    className={clsx({ 'rbc-active': view === name }, 'tw-px-3')} // todo
                    onClick={() => onView(name)}
                    variant={view === name ? 'filled' : 'default'}
                    color={view === name ? 'blue.5' : ''}
                    size={'sm'}
                >
                    {messages[name]}
                </Button>
            ))}
        </>
    );
}

const navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE'
};

const views = {
    MONTH: 'month',
    WEEK: 'week',
    WORK_WEEK: 'work_week',
    DAY: 'day',
    AGENDA: 'agenda'
};
// ViewNamesGroup.propTypes = {
//   messages: PropTypes.object,
//   onView: PropTypes.func,
//   view: PropTypes.string,
//   views: PropTypes.array,
// }
//
export default function CustomToolbar({
    // date, // available, but not used here
    label,
    localizer: { messages },
    onNavigate,
    onView,
    view,
    views
}: any) {
    return (
        <div
            className={clsx(
                'tw-w-full tw-h-[60px] tw-sticky tw-top-0',
                'tw-flex tw-flex-row tw-items-center tw-justify-between',
                'tw-bg-white tw-z-[1] tw-py-1.5 tw-pl-1.5 tw-pr-3'
            )}
            style={{
                borderBottom: '1px solid #e9ecef'
            }}
            data-tauri-drag-region
        >
            <div
                data-tauri-drag-region
                className="rbc-toolbar-off tw-flex tw-flex-row tw-w-full tw-justify-between tw-items-center tw-my-1"
            >
                <div className={'tw-flex tw-flex-row tw-space-x-1'}>
                    <div
                        className={clsx(
                            'rbc-toolbar-label tw-flex tw-items-center tw-justify-start',
                            'hover:tw-bg-gray-100 tw-rounded-md tw-text-center tw-py-1 tw-px-3',
                            'tw-transition tw-duration-200 tw-ease-in-out'
                        )}
                    >
                        <Title order={4}>{label}</Title>
                    </div>
                </div>

                <div className={'tw-flex-1 tw-w-max'}></div>
                <div className={'tw-flex tw-mr-1'}>
                    <ActionIcon
                        onClick={() => onNavigate(navigate.PREVIOUS)}
                        aria-label={messages.previous}
                        size={'lg'}
                    >
                        <IconChevronLeft size={18} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => onNavigate(navigate.NEXT)}
                        aria-label={messages.next}
                        size={'lg'}
                    >
                        <IconChevronRight size={18} />
                    </ActionIcon>
                </div>
                <div className={'tw-flex tw-flex-row'}>
                    <Button
                        onClick={() => onNavigate(navigate.TODAY)}
                        variant={'default'}
                        color={'gray.3'}
                        className={'tw-px-3'}
                    >
                        Today
                    </Button>
                    <div></div>
                    <MButton.Group className={'tw-ml-1'}>
                        <ViewNamesGroupButtons
                            view={view}
                            views={views}
                            messages={messages}
                            onView={onView}
                        />
                    </MButton.Group>
                </div>
            </div>
        </div>
    );
}
// CustomToolbar.propTypes = {
//   date: PropTypes.instanceOf(Date),
//   label: PropTypes.string,
//   localizer: PropTypes.object,
//   messages: PropTypes.object,
//   onNavigate: PropTypes.func,
//   onView: PropTypes.func,
//   view: PropTypes.string,
//   views: PropTypes.array,
// }
