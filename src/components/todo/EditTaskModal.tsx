import React from "react";
import {Modal} from "@/components/lane/Modal";
import {CheckSmIcon, TrashIcon, XIcon} from "@/components/lane/icons";
import {useTaskStore} from "@/stores/taskStore";
import type {Task} from "@/types/Task";

interface Props {
    task: Task;
    onClose(): void;
}

function formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export const EditTaskModal = React.memo<Props>(({task, onClose}) => {
    const [name, setName] = React.useState(task.name);
    const [completed, setCompleted] = React.useState(task.completed);
    const updateTask = useTaskStore(state => state.updateTask);
    const deleteTask = useTaskStore(state => state.deleteTask);

    const save = () => {
        const trimmed = name.trim();

        if (!trimmed) {
            return;
        }

        const changes: Partial<Pick<Task, "name" | "completed">> = {};

        if (trimmed !== task.name) {
            changes.name = trimmed;
        }

        if (completed !== task.completed) {
            changes.completed = completed;
        }

        if (Object.keys(changes).length > 0) {
            updateTask(task.id, changes);
        }

        onClose();
    };

    const handleDelete = () => {
        deleteTask(task.id);
        onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            save();
        }
    };

    return (
        <Modal onClose={onClose}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 0"}}>
                <button onClick={() => setCompleted(!completed)} style={{display: "flex", alignItems: "center", gap: 9, border: "none", background: "transparent", padding: 0}}>
                    <span className={"ln-check" + (completed ? " is-done" : "")}>
                        <CheckSmIcon size={13} strokeWidth={2.4} />
                    </span>
                    <span style={{fontSize: 13, fontWeight: 600, color: "var(--ln-ink-2)"}}>{completed ? "Completed" : "Mark complete"}</span>
                </button>
                <button aria-label="Close" className="ln-btn ln-btn-quiet" onClick={onClose} style={{width: 32, height: 32, padding: 0, borderRadius: 8}}>
                    <XIcon size={18} />
                </button>
            </div>
            <div style={{padding: "12px 18px 16px"}}>
                <input autoFocus className="ln-modal-title-input" onChange={event => setName(event.target.value)} onKeyDown={handleKeyDown} placeholder="Task name" value={name} />
                <div style={{display: "flex", gap: 22, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--ln-line)"}}>
                    <div>
                        <div style={{fontSize: 11, color: "var(--ln-ink-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em"}}>Created</div>
                        <div className="mono" style={{fontSize: 12.5, color: "var(--ln-ink-2)", marginTop: 3}}>
                            {formatDateTime(task.created_at)}
                        </div>
                    </div>
                    <div>
                        <div style={{fontSize: 11, color: "var(--ln-ink-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em"}}>Updated</div>
                        <div className="mono" style={{fontSize: 12.5, color: "var(--ln-ink-2)", marginTop: 3}}>
                            {formatDateTime(task.updated_at)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ln-modal-footer">
                <button className="ln-btn ln-btn-quiet ln-btn-sm" onClick={handleDelete} style={{color: "var(--ln-red)"}}>
                    <TrashIcon size={15} /> Delete
                </button>
                <div style={{display: "flex", gap: 9}}>
                    <button className="ln-btn ln-btn-ghost ln-btn-sm" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="ln-btn ln-btn-primary ln-btn-sm" disabled={!name.trim()} onClick={save}>
                        Save changes
                    </button>
                </div>
            </div>
        </Modal>
    );
});
