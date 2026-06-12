import React from "react";

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
        <div className="ln-backdrop lane" onMouseDown={handleBackdropMouseDown}>
            <div className="ln-modal" role="dialog" style={{width}}>
                {children}
            </div>
        </div>
    );
});
