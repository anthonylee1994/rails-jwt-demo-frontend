import React from "react";
import {Modal} from "@/components/lane/Modal";
import {btnClass, kbd, modalFooter, modalTitleInput, pillAccent} from "@/components/lane/classes";
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
            <div className="flex items-center justify-between px-[18px] pt-4 pb-0">
                <span className={pillAccent}>New task</span>
                <button aria-label="Close" className={btnClass("quiet")} onClick={onClose} style={{width: 32, height: 32, padding: 0, borderRadius: 8}}>
                    <XIcon size={18} />
                </button>
            </div>
            <div className="px-[18px] pt-2.5 pb-[18px]">
                <input autoFocus className={modalTitleInput} onChange={event => setName(event.target.value)} onKeyDown={handleKeyDown} placeholder="What needs doing?" value={name} />
                <div className="mt-1.5 text-[12.5px] text-ln-ink-4">Added to the top of your list — newest first.</div>
            </div>
            <div className={modalFooter}>
                <span className="text-[12px] whitespace-nowrap text-ln-ink-4">
                    <span className={kbd}>⏎</span> to save
                </span>
                <div className="flex gap-[9px]">
                    <button className={btnClass("ghost", {sm: true})} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={btnClass("primary", {sm: true})} disabled={!name.trim()} onClick={submit}>
                        <PlusIcon size={15} strokeWidth={2.2} /> Add task
                    </button>
                </div>
            </div>
        </Modal>
    );
});
