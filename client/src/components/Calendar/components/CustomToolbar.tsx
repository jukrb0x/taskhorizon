import React from 'react';
import clsx from 'clsx';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft } from '@tabler/icons';

// import { Navigate as navigate } from '../../../src'

function ViewNamesGroup({ views: viewNames, view, messages, onView }: any) {
    return viewNames.map((name) => (
        <button
            type="button"
            key={name}
            className={clsx({ 'rbc-active': view === name })}
            onClick={() => onView(name)}
        >
            {messages[name]}
        </button>
    ));
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
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <ViewNamesGroup view={view} views={views} messages={messages} onView={onView} />
            </span>

            <span className="rbc-toolbar-label">{label}</span>

            <span className="rbc-btn-group">
                <button
                    type="button"
                    onClick={() => onNavigate(navigate.PREVIOUS)}
                    aria-label={messages.previous}
                >
                    <IconChevronLeft size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => onNavigate(navigate.TODAY)}
                    aria-label={messages.today}
                >
                    TODAY
                </button>
                <button
                    type="button"
                    onClick={() => onNavigate(navigate.NEXT)}
                    aria-label={messages.next}
                >
                    <IconChevronRight size={18} />
                </button>
            </span>
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
