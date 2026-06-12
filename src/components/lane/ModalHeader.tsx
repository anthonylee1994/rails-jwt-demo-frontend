import React from "react";
import {btnClass} from "@/components/lane/classes";
import {XIcon} from "@/components/lane/icons";

interface Props {
    leading: React.ReactNode;
    onClose(): void;
    className?: string;
}

export const ModalHeader = React.memo<Props>(({leading, onClose, className}) => (
    <div className={"flex items-center justify-between px-[18px] pt-4 pb-0" + (className ? " " + className : "")}>
        {leading}
        <button aria-label="Close" className={btnClass("quiet")} onClick={onClose} style={{width: 32, height: 32, padding: 0, borderRadius: 8}}>
            <XIcon size={18} />
        </button>
    </div>
));
