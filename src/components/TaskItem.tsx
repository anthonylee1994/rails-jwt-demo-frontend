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
            backdropFilter="blur(8px)"
            bg={task.completed ? "rgba(0,229,160,0.06)" : "rgba(255,255,255,0.04)"}
            borderColor={task.completed ? "rgba(0,229,160,0.2)" : "rgba(255,255,255,0.08)"}
            borderWidth="1px"
            boxShadow={task.completed ? "0 4px 16px rgba(0,229,160,0.07)" : "0 4px 16px rgba(0,0,0,0.2)"}
            gap="2"
            minH="14"
            overflow="hidden"
            pe="2"
            ps="0"
            py="2"
            rounded="2xl"
            transition="all 0.2s ease"
            _hover={{
                borderColor: task.completed ? "rgba(0,229,160,0.35)" : "rgba(124,111,255,0.35)",
                boxShadow: task.completed
                    ? "0 8px 24px rgba(0,229,160,0.12)"
                    : "0 8px 24px rgba(124,111,255,0.12)",
                transform: "translateY(-1px)",
            }}
        >
            {isEditing ? (
                <React.Fragment>
                    <Input
                        ml={2}
                        autoFocus
                        aria-label="Task name"
                        bg="rgba(255,255,255,0.07)"
                        borderColor="rgba(124,111,255,0.4)"
                        color="rgba(240,238,255,0.95)"
                        flex="1"
                        rounded="xl"
                        size="sm"
                        value={editingName}
                        onChange={event => setEditingName(event.target.value)}
                        onKeyDown={handleEditKeyDown}
                        _focusVisible={{
                            borderColor: "rgba(124,111,255,0.7)",
                            boxShadow: "0 0 0 2px rgba(124,111,255,0.2)",
                        }}
                    />
                    <IconButton
                        aria-label="Save task name"
                        bg="rgba(124,111,255,0.85)"
                        borderColor="rgba(124,111,255,0.3)"
                        borderWidth="1px"
                        color="white"
                        rounded="full"
                        size="sm"
                        onClick={saveName}
                        _hover={{bg: "rgba(124,111,255,1)"}}
                    >
                        <LuCheck />
                    </IconButton>
                    <IconButton
                        aria-label="Cancel editing"
                        color="rgba(200,198,230,0.6)"
                        rounded="full"
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingName(null)}
                        _hover={{bg: "rgba(255,255,255,0.07)", color: "rgba(240,238,255,0.9)"}}
                    >
                        <LuX />
                    </IconButton>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Checkbox.Root
                        checked={task.completed}
                        colorPalette="purple"
                        flex="1"
                        gap="3"
                        minW="0"
                        px="3"
                        onCheckedChange={details => updateTask(task.id, {completed: details.checked === true})}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                            borderColor="rgba(255,255,255,0.2)"
                            bg={task.completed ? "rgba(124,111,255,0.8)" : "rgba(255,255,255,0.04)"}
                            rounded="md"
                            _checked={{
                                bg: "rgba(124,111,255,0.85)",
                                borderColor: "rgba(124,111,255,0.5)",
                            }}
                        >
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label
                            color={task.completed ? "rgba(160,200,180,0.65)" : "rgba(230,228,255,0.92)"}
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
                            color="rgba(180,178,210,0.5)"
                            rounded="full"
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingName(task.name)}
                            _hover={{bg: "rgba(124,111,255,0.12)", color: "#a78bfa"}}
                        >
                            <LuPencil />
                        </IconButton>
                        <IconButton
                            aria-label="Delete task"
                            color="rgba(248,113,113,0.55)"
                            rounded="full"
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTask(task.id)}
                            _hover={{bg: "rgba(239,68,68,0.1)", color: "rgba(248,113,113,0.9)"}}
                        >
                            <LuTrash2 />
                        </IconButton>
                    </Flex>
                </React.Fragment>
            )}
        </Flex>
    );
});
