import React from "react";
import {btnClass, mark} from "@/components/lane/classes";
import {CheckIcon, PlusIcon} from "@/components/lane/icons";

interface Props {
    onAdd(): void;
}

export const EmptyState = React.memo<Props>(({onAdd}) => (
    <div className="flex min-h-[360px] flex-1 flex-col items-center justify-center p-8 text-center">
        <span className={mark} style={{width: 64, height: 64, borderRadius: 19, background: "var(--color-ln-accent-soft)", boxShadow: "none", marginBottom: 22}}>
            <CheckIcon className="text-ln-accent" size={32} strokeWidth={2.4} />
        </span>
        <h2 className="text-[21px] font-bold tracking-tight">No tasks yet</h2>
        <p className="mt-2 max-w-[320px] text-[14.5px] leading-[1.55] text-ln-ink-3">Nothing on your list yet. Add your first task and it'll show up here, newest first.</p>
        <button className={btnClass("primary") + " mt-5"} onClick={onAdd}>
            <PlusIcon size={17} strokeWidth={2.1} /> Add your first task
        </button>
    </div>
));
