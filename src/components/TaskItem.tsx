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
            bg="white"
            borderColor={task.completed ? "green.200" : "blackAlpha.100"}
            borderWidth="1px"
            boxShadow="0 8px 24px rgba(50, 50, 93, 0.04)"
            gap="2"
            minH="14"
            overflow="hidden"
            pe="2"
            ps="0"
            py="2"
            rounded="2xl"
            transition="all 0.2s ease"
            _dark={{bg: task.completed ? "green.950" : undefined, borderColor: task.completed ? "green.800" : undefined}}
            _hover={{borderColor: task.completed ? "green.300" : "#c7d2fe", boxShadow: "0 12px 32px rgba(50, 50, 93, 0.08)", transform: "translateY(-1px)"}}
        >
            {isEditing ? (
                <React.Fragment>
                    <Input
                        ml={2}
                        autoFocus
                        aria-label="Task name"
                        flex="1"
                        rounded="xl"
                        size="sm"
                        value={editingName}
                        onChange={event => setEditingName(event.target.value)}
                        onKeyDown={handleEditKeyDown}
                    />
                    <IconButton aria-label="Save task name" bg="#635bff" color="white" rounded="full" size="sm" onClick={saveName} _hover={{bg: "#4f46e5"}}>
                        <LuCheck />
                    </IconButton>
                    <IconButton aria-label="Cancel editing" rounded="full" size="sm" variant="ghost" onClick={() => setEditingName(null)}>
                        <LuX />
                    </IconButton>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Checkbox.Root
                        checked={task.completed}
                        colorPalette="blue"
                        flex="1"
                        gap="3"
                        minW="0"
                        px="3"
                        onCheckedChange={details => updateTask(task.id, {completed: details.checked === true})}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control borderColor="blackAlpha.300" rounded="md">
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label
                            color={task.completed ? "gray.500" : "#0a2540"}
                            fontWeight="semibold"
                            overflow="hidden"
                            textDecoration={task.completed ? "line-through" : undefined}
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {task.name}
                        </Checkbox.Label>
                    </Checkbox.Root>
                    <Flex gap="1">
                        <IconButton
                            aria-label="Edit task"
                            color="#425466"
                            rounded="full"
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingName(task.name)}
                            _hover={{bg: "blue.50", color: "#635bff"}}
                        >
                            <LuPencil />
                        </IconButton>
                        <IconButton aria-label="Delete task" color="red.600" rounded="full" size="sm" variant="ghost" onClick={() => deleteTask(task.id)} _hover={{bg: "red.50"}}>
                            <LuTrash2 />
                        </IconButton>
                    </Flex>
                </React.Fragment>
            )}
        </Flex>
    );
});
