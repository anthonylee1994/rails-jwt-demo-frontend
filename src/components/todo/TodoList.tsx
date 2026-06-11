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
                <Spinner color="#635bff" size="lg" />
            </Center>
        );
    }

    if (tasks.length === 0) {
        return (
            <Center py={{base: "8", md: "12"}}>
                <Stack align="center" gap="4" maxW="xs" textAlign="center">
                    <Center bg="#eef2ff" boxSize="14" color="#635bff" rounded="2xl">
                        <LuClipboardList size="28" />
                    </Center>
                    <Stack gap="1">
                        <Heading color="#0a2540" fontSize={{base: "xl", md: "2xl"}} letterSpacing="-0.04em">
                            No tasks yet
                        </Heading>
                        <Text color="gray.600" fontSize={{base: "sm", md: "md"}}>
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
                    <Text color="#425466" fontWeight="semibold" textStyle="sm">
                        {completedCount} of {tasks.length} completed
                    </Text>
                    <Text color="gray.500" textStyle="sm">
                        {tasks.length - completedCount} remaining
                    </Text>
                </Flex>
                <Progress.Root colorPalette="cyan" size="sm" value={completedPercent}>
                    <Progress.Track bg="gray.100" rounded="full">
                        <Progress.Range bg="#635bff" />
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
