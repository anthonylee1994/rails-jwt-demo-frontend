import React from "react";
import {CheckIcon, CheckSmIcon} from "@/components/lane/icons";

interface MarkProps {
    radius?: number;
    size?: number;
}

export const Mark = React.memo<MarkProps>(({radius = 8, size = 28}) => (
    <span className="ln-mark" style={{width: size, height: size, borderRadius: radius}}>
        <CheckIcon size={size * 0.62} strokeWidth={2.6} />
    </span>
));

interface LogoProps {
    gap?: number;
    size?: number;
    text?: number;
}

export const Logo = React.memo<LogoProps>(({gap = 9, size = 28, text = 19}) => (
    <span style={{display: "inline-flex", alignItems: "center", gap}}>
        <Mark size={size} />
        <span className="ln-wordmark" style={{fontSize: text}}>
            Lane
        </span>
    </span>
));

interface AvatarProps {
    initials: string;
    size?: number;
}

export const Avatar = React.memo<AvatarProps>(({initials, size = 32}) => (
    <span className="ln-avatar" style={{width: size, height: size, fontSize: size * 0.42}}>
        {initials}
    </span>
));

interface CheckProps {
    done: boolean;
}

export const Check = React.memo<CheckProps>(({done}) => (
    <span className={"ln-check" + (done ? " is-done" : "")}>
        <CheckSmIcon size={13} strokeWidth={2.4} />
    </span>
));
