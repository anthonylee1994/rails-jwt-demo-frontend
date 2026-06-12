import React from "react";
import {Modal} from "@/components/lane/Modal";
import {LogoutIcon} from "@/components/lane/icons";

interface Props {
    onCancel(): void;
    onConfirm(): void;
}

export const LogoutDialog = React.memo<Props>(({onCancel, onConfirm}) => (
    <Modal onClose={onCancel} width={380}>
        <div className="ln-logout-dialog">
            <span className="ln-mark" style={{width: 46, height: 46, borderRadius: 13, background: "var(--ln-red-soft)", margin: "0 auto 14px", boxShadow: "none"}}>
                <LogoutIcon size={22} style={{color: "var(--ln-red)"}} />
            </span>
            <h3 style={{fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em"}}>Log out of Lane?</h3>
            <p style={{fontSize: 14, color: "var(--ln-ink-3)", marginTop: 7, lineHeight: 1.5}}>Your token will be cleared from this device. You'll need to sign in again to see your tasks.</p>
            <div style={{display: "flex", gap: 10, marginTop: 20}}>
                <button className="ln-btn ln-btn-ghost ln-btn-block" onClick={onCancel}>
                    Stay signed in
                </button>
                <button className="ln-btn ln-btn-danger ln-btn-block" onClick={onConfirm}>
                    Log out
                </button>
            </div>
        </div>
    </Modal>
));
