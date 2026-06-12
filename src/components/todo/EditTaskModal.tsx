import React from "react";
import {Modal} from "@/components/lane/Modal";
import {btnClass, checkClass, modalFooter, modalTitleInput, mono} from "@/components/lane/classes";
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
            <div className="flex items-center justify-between px-[18px] pt-4 pb-0">
                <button className="flex items-center gap-[9px] border-none bg-transparent p-0" onClick={() => setCompleted(!completed)}>
                    <span className={checkClass(completed)}>
                        <CheckSmIcon size={13} strokeWidth={2.4} />
                    </span>
                    <span className="text-[13px] font-semibold text-ln-ink-2">{completed ? "Completed" : "Mark complete"}</span>
                </button>
                <button aria-label="Close" className={btnClass("quiet")} onClick={onClose} style={{width: 32, height: 32, padding: 0, borderRadius: 8}}>
                    <XIcon size={18} />
                </button>
            </div>
            <div className="px-[18px] pt-3 pb-4">
                <input autoFocus className={modalTitleInput} onChange={event => setName(event.target.value)} onKeyDown={handleKeyDown} placeholder="Task name" value={name} />
                <div className="mt-4 flex gap-[22px] border-t border-ln-line pt-3.5">
                    <div>
                        <div className="text-[11px] font-semibold tracking-wider text-ln-ink-4 uppercase">Created</div>
                        <div className={mono + " mt-[3px] text-[12.5px] text-ln-ink-2"}>{formatDateTime(task.created_at)}</div>
                    </div>
                    <div>
                        <div className="text-[11px] font-semibold tracking-wider text-ln-ink-4 uppercase">Updated</div>
                        <div className={mono + " mt-[3px] text-[12.5px] text-ln-ink-2"}>{formatDateTime(task.updated_at)}</div>
                    </div>
                </div>
            </div>
            <div className={modalFooter}>
                <button className={btnClass("quiet", {sm: true})} onClick={handleDelete} style={{color: "var(--color-ln-red)"}}>
                    <TrashIcon size={15} /> Delete
                </button>
                <div className="flex gap-[9px]">
                    <button className={btnClass("ghost", {sm: true})} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={btnClass("primary", {sm: true})} disabled={!name.trim()} onClick={save}>
                        Save changes
                    </button>
                </div>
            </div>
        </Modal>
    );
});
