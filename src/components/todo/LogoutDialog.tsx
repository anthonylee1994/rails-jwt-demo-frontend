import React from "react";
import {Modal} from "@/components/lane/Modal";
import {btnClass} from "@/components/lane/classes";
import {IconBubble} from "@/components/lane/IconBubble";
import {LogoutIcon} from "@/components/lane/icons";

interface Props {
    onCancel(): void;
    onConfirm(): void;
}

export const LogoutDialog = React.memo<Props>(({onCancel, onConfirm}) => (
    <Modal onClose={onCancel} width={380}>
        <div className="p-6 text-center max-[640px]:pb-[calc(24px+env(safe-area-inset-bottom,0))]">
            <IconBubble className="mx-auto mb-[14px]" icon={<LogoutIcon className="text-ln-red" size={22} />} size={46} tone="red" />
            <h3 className="text-[19px] font-bold tracking-[-0.02em]">Log out of Lane?</h3>
            <p className="mt-[7px] text-[14px] leading-normal text-ln-ink-3">Your token will be cleared from this device. You'll need to sign in again to see your tasks.</p>
            <div className="mt-5 flex gap-2.5">
                <button className={btnClass("ghost", {block: true})} onClick={onCancel}>
                    Stay signed in
                </button>
                <button className={btnClass("danger", {block: true})} onClick={onConfirm}>
                    Log out
                </button>
            </div>
        </div>
    </Modal>
));
