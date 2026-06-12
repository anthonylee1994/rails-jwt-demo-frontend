import React from "react";
import {CheckSmIcon} from "@/components/lane/icons";
import {useTaskStore} from "@/stores/taskStore";
import type {Task} from "@/types/Task";

interface Props {
    task: Task;
    onOpen(): void;
}

export const TaskRow = React.memo<Props>(({task, onOpen}) => {
    const updateTask = useTaskStore(state => state.updateTask);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        updateTask(task.id, {completed: !task.completed});
    };

    return (
        <div className={"ln-task" + (task.completed ? " is-done" : "")} onClick={onOpen} role="button" style={{cursor: "pointer"}}>
            <button aria-label={task.completed ? "Mark as active" : "Mark as completed"} className={"ln-check" + (task.completed ? " is-done" : "")} onClick={handleToggle}>
                <CheckSmIcon size={13} strokeWidth={2.4} />
            </button>
            <div style={{minWidth: 0, flex: 1}}>
                <div className="ln-task-title">{task.name}</div>
            </div>
        </div>
    );
});
