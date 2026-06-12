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
        <Card.Root
            backdropFilter="blur(20px)"
            bg="rgba(15,15,25,0.7)"
            borderColor="rgba(255,255,255,0.07)"
            borderWidth="1px"
            boxShadow="0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
            overflow="hidden"
            rounded={{base: "2xl", md: "3xl"}}
        >
            <Box
                bg="rgba(255,255,255,0.03)"
                borderBottomColor="rgba(255,255,255,0.06)"
                borderBottomWidth="1px"
                px={{base: "5", md: "7"}}
                py={{base: "4", md: "5"}}
            >
                <Flex align={{base: "flex-start", sm: "center"}} direction={{base: "column", sm: "row"}} gap="4" justify="space-between">
                    <Stack gap="1">
                        <Flex align="center" gap="2">
                            <LuSparkles color="#a78bfa" size="14" />
                            <Text
                                color="rgba(167,139,250,0.85)"
                                fontWeight="semibold"
                                letterSpacing="0.08em"
                                textStyle="xs"
                                textTransform="uppercase"
                            >
                                Today queue
                            </Text>
                        </Flex>
                        <Heading
                            color="rgba(240,238,255,0.95)"
                            fontSize={{base: "lg", md: "2xl"}}
                            letterSpacing="-0.04em"
                            lineHeight="1.2"
                        >
                            Keep the next action obvious.
                        </Heading>
                    </Stack>
                    {tasks.length > 0 && completedCount === tasks.length && (
                        <Badge
                            bg="rgba(0,229,160,0.12)"
                            borderColor="rgba(0,229,160,0.25)"
                            borderWidth="1px"
                            color="rgba(0,229,160,0.9)"
                            px="3"
                            py="1"
                            rounded="full"
                        >
                            All done
                            <LuArrowUpRight />
                        </Badge>
                    )}
                </Flex>
            </Box>
            <Card.Body gap={{base: "5", md: "6"}} p={{base: "5", md: "7"}}>
                <TodoCreateForm newTaskName={newTaskName} onChange={onNewTaskNameChange} onSubmit={onCreate} />

                {error && (
                    <Alert.Root
                        bg="rgba(239,68,68,0.1)"
                        borderColor="rgba(239,68,68,0.25)"
                        borderWidth="1px"
                        rounded="xl"
                        status="error"
                    >
                        <Alert.Indicator />
                        <Alert.Title color="rgba(252,165,165,0.9)">{error}</Alert.Title>
                    </Alert.Root>
                )}

                <TodoList completedCount={completedCount} completedPercent={completedPercent} isLoading={isLoading} tasks={tasks} />
            </Card.Body>
        </Card.Root>
    );
});
