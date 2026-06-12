import React from "react";
import {checkClass, task as taskClass, taskTitleClass} from "@/components/lane/classes";
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
        <div className={taskClass + " cursor-pointer"} onClick={onOpen} role="button">
            <button aria-label={task.completed ? "Mark as active" : "Mark as completed"} className={checkClass(task.completed, true)} onClick={handleToggle}>
                <CheckSmIcon size={13} strokeWidth={2.4} />
            </button>
            <div className="min-w-0 flex-1">
                <div className={taskTitleClass(task.completed)}>{task.name}</div>
            </div>
        </div>
    );
});
