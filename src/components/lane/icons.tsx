/* eslint-disable react-refresh/only-export-components */
import React from "react";

interface IconProps {
    className?: string;
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
}

function makeIcon(paths: React.ReactNode, viewBox = 24) {
    return React.memo<IconProps>(({className, size = 18, strokeWidth = 1.7, style}) => (
        <svg
            className={className}
            fill="none"
            height={size}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            style={style}
            viewBox={`0 0 ${viewBox} ${viewBox}`}
            width={size}
        >
            {paths}
        </svg>
    ));
}

export const CheckIcon = makeIcon(<path d="M5 12.5l4.5 4.5L19 6.5" />);
export const CheckSmIcon = makeIcon(<path d="M4 7l2.3 2.5L11 4" />, 14);
export const PlusIcon = makeIcon(
    <React.Fragment>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </React.Fragment>
);
export const InboxIcon = makeIcon(
    <React.Fragment>
        <path d="M3 13h4l1.5 3h7L17 13h4" />
        <path d="M5 13V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
    </React.Fragment>
);
export const UpcomingIcon = makeIcon(
    <React.Fragment>
        <circle cx="12" cy="12" r="8.2" />
        <path d="M12 8v4.3l2.8 1.6" />
    </React.Fragment>
);
export const ChevronDownIcon = makeIcon(<path d="M5 9l7 7 7-7" />);
export const XIcon = makeIcon(
    <React.Fragment>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
    </React.Fragment>
);
export const TrashIcon = makeIcon(
    <React.Fragment>
        <path d="M4 7h16" />
        <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" />
        <path d="M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
    </React.Fragment>
);
export const LogoutIcon = makeIcon(
    <React.Fragment>
        <path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        <path d="M10 12H3" />
        <path d="M6 8l-4 4 4 4" />
    </React.Fragment>
);
export const AlertIcon = makeIcon(
    <React.Fragment>
        <circle cx="12" cy="12" r="8.4" />
        <path d="M12 8v4.5" />
        <path d="M12 16h.01" />
    </React.Fragment>
);
export const LockIcon = makeIcon(
    <React.Fragment>
        <rect height="9.5" rx="2.4" width="14" x="5" y="10.5" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </React.Fragment>
);
export const ArrowRightIcon = makeIcon(
    <React.Fragment>
        <path d="M4 12h15" />
        <path d="M13 6l6 6-6 6" />
    </React.Fragment>
);
export const EyeIcon = makeIcon(
    <React.Fragment>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="2.8" />
    </React.Fragment>
);
export const EyeOffIcon = makeIcon(
    <React.Fragment>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="2.8" />
        <path d="M4 4l16 16" />
    </React.Fragment>
);

export const SpinnerIcon = React.memo<IconProps>(({className, size = 18, strokeWidth = 2, style}) => (
    <svg className={className} fill="none" height={size} style={style} viewBox="0 0 24 24" width={size}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".18" strokeWidth={strokeWidth} />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth={strokeWidth} />
    </svg>
));
