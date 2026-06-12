import React from "react";
import {mark} from "@/components/lane/classes";

interface Props {
    icon: React.ReactNode;
    tone: "accent" | "red";
    size?: number;
    className?: string;
}

export const IconBubble = React.memo<Props>(({icon, tone, size = 64, className}) => (
    <span
        className={mark + (className ? " " + className : "")}
        style={{
            width: size,
            height: size,
            borderRadius: 999,
            background: tone === "red" ? "var(--color-ln-red-soft)" : "var(--color-ln-accent-soft)",
            boxShadow: "none",
        }}
    >
        {icon}
    </span>
));
