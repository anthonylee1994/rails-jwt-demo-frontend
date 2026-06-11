import React from "react";
import {Alert, Badge, Box, Card, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {LuArrowUpRight, LuSparkles} from "react-icons/lu";
import {TodoCreateForm} from "@/components/todo/TodoCreateForm";
import {TodoList} from "@/components/todo/TodoList";
import type {Task} from "@/types/Task";

interface Props {
    completedCount: number;
    completedPercent: number;
    error: string | null;
    isLoading: boolean;
    newTaskName: string;
    tasks: Task[];
    onCreate(event: React.FormEvent<HTMLFormElement>): void;
    onNewTaskNameChange(name: string): void;
}

export const TodoQueueCard = React.memo<Props>(({completedCount, completedPercent, error, isLoading, newTaskName, tasks, onCreate, onNewTaskNameChange}) => {
    return (
        <Card.Root borderColor="blackAlpha.100" overflow="hidden" rounded={{base: "2xl", md: "3xl"}} shadow="0 30px 90px rgba(50, 50, 93, 0.12)">
            <Box bg="white" borderBottomColor="blackAlpha.100" borderBottomWidth="1px" px={{base: "5", md: "7"}} py={{base: "4", md: "5"}}>
                <Flex align={{base: "flex-start", sm: "center"}} direction={{base: "column", sm: "row"}} gap="4" justify="space-between">
                    <Stack gap="1">
                        <Flex align="center" gap="2">
                            <LuSparkles color="#635bff" />
                            <Text color="#635bff" fontWeight="semibold" letterSpacing="0.08em" textStyle="xs" textTransform="uppercase">
                                Today queue
                            </Text>
                        </Flex>
                        <Heading color="#0a2540" fontSize={{base: "lg", md: "2xl"}} letterSpacing="-0.04em" lineHeight="1.2">
                            Keep the next action obvious.
                        </Heading>
                    </Stack>
                    {tasks.length > 0 && completedCount === tasks.length && (
                        <Badge colorPalette="green" px="3" py="1" rounded="full">
                            All done
                            <LuArrowUpRight />
                        </Badge>
                    )}
                </Flex>
            </Box>
            <Card.Body gap={{base: "5", md: "6"}} p={{base: "5", md: "7"}}>
                <TodoCreateForm newTaskName={newTaskName} onChange={onNewTaskNameChange} onSubmit={onCreate} />

                {error && (
                    <Alert.Root borderColor="red.200" borderWidth="1px" rounded="xl" status="error">
                        <Alert.Indicator />
                        <Alert.Title>{error}</Alert.Title>
                    </Alert.Root>
                )}

                <TodoList completedCount={completedCount} completedPercent={completedPercent} isLoading={isLoading} tasks={tasks} />
            </Card.Body>
        </Card.Root>
    );
});
