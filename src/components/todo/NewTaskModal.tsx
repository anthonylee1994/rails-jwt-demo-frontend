import React from "react";
import {Modal} from "@/components/lane/Modal";
import {ModalHeader} from "@/components/lane/ModalHeader";
import {btnClass, kbd, modalFooter, modalTitleInput, pillAccent} from "@/components/lane/classes";
import {PlusIcon} from "@/components/lane/icons";
import {useTrimmedSubmit} from "@/hooks/useTrimmedSubmit";
import {useTaskStore} from "@/stores/taskStore";

interface Props {
    onClose(): void;
}

export const NewTaskModal = React.memo<Props>(({onClose}) => {
    const [name, setName] = React.useState("");
    const createTask = useTaskStore(state => state.createTask);

    const submit = React.useCallback(
        async (trimmed: string) => {
            const ok = await createTask(trimmed);

            if (ok) {
                onClose();
            }
        },
        [createTask, onClose]
    );

    const {trimmed, handleKeyDown, isDisabled} = useTrimmedSubmit({value: name, onSubmit: submit});

    return (
        <Modal onClose={onClose}>
            <ModalHeader leading={<span className={pillAccent}>New task</span>} onClose={onClose} />
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
                    <button className={btnClass("primary", {sm: true})} disabled={isDisabled} onClick={() => void submit(trimmed)}>
                        <PlusIcon size={15} strokeWidth={2.2} /> Add task
                    </button>
                </div>
            </div>
        </Modal>
    );
});
