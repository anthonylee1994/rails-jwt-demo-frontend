import React from "react";
import {Center, Flex, Heading, Progress, Spinner, Stack, Text} from "@chakra-ui/react";
import {LuClipboardList} from "react-icons/lu";
import {TaskItem} from "@/components/TaskItem";
import type {Task} from "@/types/Task";

interface Props {
    completedCount: number;
    completedPercent: number;
    isLoading: boolean;
    tasks: Task[];
}

export const TodoList = React.memo<Props>(({completedCount, completedPercent, isLoading, tasks}) => {
    if (isLoading) {
        return (
            <Center py="16">
                <Spinner color="#a78bfa" size="lg" />
            </Center>
        );
    }

    if (tasks.length === 0) {
        return (
            <Center py={{base: "8", md: "12"}}>
                <Stack align="center" gap="4" maxW="xs" textAlign="center">
                    <Center
                        bg="rgba(124,111,255,0.12)"
                        borderColor="rgba(124,111,255,0.2)"
                        borderWidth="1px"
                        boxSize="14"
                        color="#a78bfa"
                        rounded="2xl"
                    >
                        <LuClipboardList size="28" />
                    </Center>
                    <Stack gap="1">
                        <Heading
                            color="rgba(240,238,255,0.9)"
                            fontSize={{base: "xl", md: "2xl"}}
                            letterSpacing="-0.04em"
                        >
                            No tasks yet
                        </Heading>
                        <Text color="rgba(180,178,210,0.55)" fontSize={{base: "sm", md: "md"}}>
                            Add your first task above and get things done.
                        </Text>
                    </Stack>
                </Stack>
            </Center>
        );
    }

    return (
        <React.Fragment>
            <Stack gap="3">
                <Flex align="center" justify="space-between">
                    <Text color="rgba(200,195,255,0.7)" fontWeight="semibold" textStyle="sm">
                        {completedCount} of {tasks.length} completed
                    </Text>
                    <Text color="rgba(180,178,210,0.45)" textStyle="sm">
                        {tasks.length - completedCount} remaining
                    </Text>
                </Flex>
                <Progress.Root colorPalette="purple" size="sm" value={completedPercent}>
                    <Progress.Track bg="rgba(255,255,255,0.07)" rounded="full">
                        <Progress.Range
                            bg="linear-gradient(90deg, #7c6fff 0%, #a78bfa 100%)"
                            boxShadow="0 0 12px rgba(124,111,255,0.5)"
                        />
                    </Progress.Track>
                </Progress.Root>
            </Stack>
            <Stack gap="3">
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </Stack>
        </React.Fragment>
    );
});
