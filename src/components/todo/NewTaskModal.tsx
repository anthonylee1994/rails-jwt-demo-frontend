import React from "react";
import {Modal} from "@/components/lane/Modal";
import {PlusIcon, XIcon} from "@/components/lane/icons";
import {useTaskStore} from "@/stores/taskStore";

interface Props {
    onClose(): void;
}

export const NewTaskModal = React.memo<Props>(({onClose}) => {
    const [name, setName] = React.useState("");
    const createTask = useTaskStore(state => state.createTask);

    const submit = () => {
        const trimmed = name.trim();

        if (!trimmed) {
            return;
        }

        createTask(trimmed);
        onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            submit();
        }
    };

    return (
        <Modal onClose={onClose}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 0"}}>
                <span className="ln-pill ln-pill-accent">New task</span>
                <button aria-label="Close" className="ln-btn ln-btn-quiet" onClick={onClose} style={{width: 32, height: 32, padding: 0, borderRadius: 8}}>
                    <XIcon size={18} />
                </button>
            </div>
            <div style={{padding: "10px 18px 18px"}}>
                <input autoFocus className="ln-modal-title-input" onChange={event => setName(event.target.value)} onKeyDown={handleKeyDown} placeholder="What needs doing?" value={name} />
                <div style={{fontSize: 12.5, color: "var(--ln-ink-4)", marginTop: 6}}>Added to the top of your list — newest first.</div>
            </div>
            <div className="ln-modal-footer">
                <span style={{fontSize: 12, color: "var(--ln-ink-4)", whiteSpace: "nowrap"}}>
                    <span className="ln-kbd">⏎</span> to save
                </span>
                <div style={{display: "flex", gap: 9}}>
                    <button className="ln-btn ln-btn-ghost ln-btn-sm" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="ln-btn ln-btn-primary ln-btn-sm" disabled={!name.trim()} onClick={submit}>
                        <PlusIcon size={15} strokeWidth={2.2} /> Add task
                    </button>
                </div>
            </div>
        </Modal>
    );
});
