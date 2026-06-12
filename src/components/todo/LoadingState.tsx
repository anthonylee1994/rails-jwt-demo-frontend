import React from "react";
import {SpinnerIcon} from "@/components/lane/icons";

const SKELETON_WIDTHS = [88, 72, 94, 64, 80, 70];

export const LoadingState = React.memo(() => (
    <div>
        {SKELETON_WIDTHS.map((width, index) => (
            <div key={index} style={{display: "flex", alignItems: "center", gap: 13, padding: "13px 14px"}}>
                <div className="ln-skel" style={{width: 21, height: 21, borderRadius: 6.5, flex: "none"}} />
                <div className="ln-skel" style={{width: width + "%", maxWidth: 360, height: 14}} />
            </div>
        ))}
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 18, color: "var(--ln-ink-4)", fontSize: 13}}>
            <span className="ln-spin" style={{display: "flex", color: "var(--ln-accent)"}}>
                <SpinnerIcon size={16} />
            </span>
            Loading your tasks…
        </div>
    </div>
));
