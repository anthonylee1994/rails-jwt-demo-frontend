import React from "react";
import {CheckIcon, PlusIcon} from "@/components/lane/icons";

interface Props {
    onAdd(): void;
}

export const EmptyState = React.memo<Props>(({onAdd}) => (
    <div
        style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            textAlign: "center",
            minHeight: 360,
        }}
    >
        <span className="ln-mark" style={{width: 64, height: 64, borderRadius: 19, background: "var(--ln-accent-soft)", boxShadow: "none", marginBottom: 22}}>
            <CheckIcon size={32} strokeWidth={2.4} style={{color: "var(--ln-accent)"}} />
        </span>
        <h2 style={{fontSize: 21, fontWeight: 700, letterSpacing: "-0.025em"}}>No tasks yet</h2>
        <p style={{fontSize: 14.5, color: "var(--ln-ink-3)", marginTop: 8, maxWidth: 320, lineHeight: 1.55}}>Nothing on your list yet. Add your first task and it'll show up here, newest first.</p>
        <button className="ln-btn ln-btn-primary" onClick={onAdd} style={{marginTop: 20}}>
            <PlusIcon size={17} strokeWidth={2.1} /> Add your first task
        </button>
    </div>
));
