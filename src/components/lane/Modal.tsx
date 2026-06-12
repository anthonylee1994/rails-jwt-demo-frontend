import React from "react";
import {lane} from "@/components/lane/classes";

interface Props {
    children: React.ReactNode;
    width?: number;
    onClose(): void;
}

export const Modal = React.memo<Props>(({children, width = 480, onClose}) => {
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={"fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,22,40,0.42)] p-8 backdrop-blur-[2px] max-[640px]:items-end max-[640px]:p-0 " + lane}
            onMouseDown={handleBackdropMouseDown}
        >
            <div
                className="max-w-full overflow-hidden rounded-2xl border border-ln-border bg-ln-surface shadow-ln-3 max-[640px]:w-full! max-[640px]:rounded-t-[22px] max-[640px]:rounded-b-none max-[640px]:border-x-0 max-[640px]:border-b-0"
                role="dialog"
                style={{width}}
            >
                {children}
            </div>
        </div>
    );
});
