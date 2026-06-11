import React from "react";
import {Checkbox, Flex, IconButton, Input} from "@chakra-ui/react";
import {LuCheck, LuPencil, LuTrash2, LuX} from "react-icons/lu";
import {useTaskStore} from "@/stores/taskStore";
import type {Task} from "@/types/Task";

interface Props {
    task: Task;
}

export const TaskItem = React.memo<Props>(({task}) => {
    const [editingName, setEditingName] = React.useState<string | null>(null);
    const updateTask = useTaskStore(state => state.updateTask);
    const deleteTask = useTaskStore(state => state.deleteTask);

    const isEditing = editingName !== null;

    const saveName = () => {
        const name = (editingName ?? "").trim();

        if (name && name !== task.name) {
            updateTask(task.id, {name});
        }

        setEditingName(null);
    };

    const handleEditKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            saveName();
        }

        if (event.key === "Escape") {
            setEditingName(null);
        }
    };

    return (
        <Flex
            align="center"
            bg={task.completed ? "green.50" : "bg.subtle"}
            borderColor={task.completed ? "green.200" : undefined}
            borderWidth="1px"
            gap="3"
            px="4"
            py="3"
            rounded="xl"
            transition="all 0.2s ease"
            _dark={{bg: task.completed ? "green.950" : undefined, borderColor: task.completed ? "green.800" : undefined}}
            _hover={{bg: task.completed ? "green.100" : "bg", borderColor: task.completed ? "green.300" : "blue.muted", shadow: "sm"}}
        >
            {isEditing ? (
                <React.Fragment>
                    <Input autoFocus aria-label="Task name" flex="1" size="sm" value={editingName} onChange={event => setEditingName(event.target.value)} onKeyDown={handleEditKeyDown} />
                    <IconButton aria-label="Save task name" colorPalette="blue" size="sm" onClick={saveName}>
                        <LuCheck />
                    </IconButton>
                    <IconButton aria-label="Cancel editing" size="sm" variant="ghost" onClick={() => setEditingName(null)}>
                        <LuX />
                    </IconButton>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Checkbox.Root checked={task.completed} colorPalette="blue" flex="1" onCheckedChange={details => updateTask(task.id, {completed: details.checked === true})}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label color={task.completed ? "fg.muted" : undefined} textDecoration={task.completed ? "line-through" : undefined}>
                            {task.name}
                        </Checkbox.Label>
                    </Checkbox.Root>
                    <IconButton aria-label="Edit task" size="sm" variant="ghost" onClick={() => setEditingName(task.name)}>
                        <LuPencil />
                    </IconButton>
                    <IconButton aria-label="Delete task" colorPalette="red" size="sm" variant="subtle" onClick={() => deleteTask(task.id)}>
                        <LuTrash2 />
                    </IconButton>
                </React.Fragment>
            )}
        </Flex>
    );
});
