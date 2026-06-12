import React from "react";
import {AlertIcon} from "@/components/lane/icons";

interface Props {
    message: string;
    onRetry(): void;
}

export const ErrorCard = React.memo<Props>(({message, onRetry}) => (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", padding: 32, minHeight: 360}}>
        <div className="ln-card" style={{width: 420, maxWidth: "100%", boxShadow: "var(--ln-sh-2)", borderRadius: 18, padding: 28, textAlign: "center"}}>
            <span className="ln-mark" style={{width: 52, height: 52, borderRadius: 15, background: "var(--ln-red-soft)", margin: "0 auto 16px", boxShadow: "none"}}>
                <AlertIcon size={24} style={{color: "var(--ln-red)"}} />
            </span>
            <h2 style={{fontSize: 21, fontWeight: 700, letterSpacing: "-0.025em"}}>Couldn't load your tasks</h2>
            <p style={{fontSize: 14.5, color: "var(--ln-ink-3)", marginTop: 8, lineHeight: 1.55}}>{message}</p>
            <button className="ln-btn ln-btn-primary ln-btn-block" onClick={onRetry} style={{height: 44, marginTop: 20}}>
                Retry
            </button>
        </div>
    </div>
));
