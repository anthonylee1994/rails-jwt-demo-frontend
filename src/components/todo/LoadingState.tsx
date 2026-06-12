import React from "react";
import {skel, spin} from "@/components/lane/classes";
import {SpinnerIcon} from "@/components/lane/icons";

const SKELETON_WIDTHS = [88, 72, 94, 64, 80, 70];

export const LoadingState = React.memo(() => (
    <div>
        {SKELETON_WIDTHS.map((width, index) => (
            <div className="flex items-center gap-[13px] px-3.5 py-[13px]" key={index}>
                <div className={skel} style={{width: 21, height: 21, borderRadius: 6.5, flex: "none"}} />
                <div className={skel} style={{width: width + "%", maxWidth: 360, height: 14}} />
            </div>
        ))}
        <div className="mt-[18px] flex items-center justify-center gap-[9px] text-[13px] text-ln-ink-4">
            <span className={spin + " flex text-ln-accent"}>
                <SpinnerIcon size={16} />
            </span>
            Loading your tasks…
        </div>
    </div>
));
