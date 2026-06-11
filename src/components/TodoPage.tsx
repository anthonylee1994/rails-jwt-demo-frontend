import React from "react";
import {Alert, Badge, Box, Button, Card, Center, Container, EmptyState, Flex, Heading, Input, Progress, Spinner, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuClipboardList, LuLogOut, LuPlus} from "react-icons/lu";
import {TaskItem} from "@/components/TaskItem";
import {useAuthStore} from "@/stores/authStore";
import {useTaskStore} from "@/stores/taskStore";

export const TodoPage = React.memo(() => {
    const [newTaskName, setNewTaskName] = React.useState("");
    const username = useAuthStore(state => state.username);
    const logout = useAuthStore(state => state.logout);
    const tasks = useTaskStore(state => state.tasks);
    const isLoading = useTaskStore(state => state.isLoading);
    const error = useTaskStore(state => state.error);
    const fetchTasks = useTaskStore(state => state.fetchTasks);
    const createTask = useTaskStore(state => state.createTask);

    React.useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const completedCount = tasks.filter(task => task.completed).length;
    const completedPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = newTaskName.trim();

        if (!name) {
            return;
        }

        createTask(name);
        setNewTaskName("");
    };

    return (
        <Box bgGradient="to-br" gradientFrom="blue.50" gradientTo="purple.50" minH="100dvh">
            <Container maxW="2xl" px={{base: "0", sm: "4"}} py={{base: "0", sm: "12"}}>
                <Card.Root minH={{base: "100dvh", sm: "auto"}} rounded={{base: "none", sm: "2xl"}} shadow={{base: "none", sm: "xl"}}>
                    <Card.Header pb="2">
                        <Flex align="center" gap="3" justify="space-between">
                            <Flex align="center" gap="3">
                                <Center bg="blue.500" boxSize="12" color="white" rounded="xl" shadow="md">
                                    <LuCircleCheck size="24" />
                                </Center>
                                <Stack gap="0">
                                    <Heading size={{base: "lg", sm: "xl"}}>My Tasks</Heading>
                                    {username && (
                                        <Text color="fg.muted" textStyle="sm">
                                            Logged in as {username}
                                        </Text>
                                    )}
                                </Stack>
                            </Flex>
                            <Button color="fg.muted" size="sm" variant="ghost" onClick={logout}>
                                <LuLogOut />
                                Logout
                            </Button>
                        </Flex>
                    </Card.Header>
                    <Card.Body gap="5">
                        <form onSubmit={handleCreate}>
                            <Flex gap="2">
                                <Input
                                    aria-label="New task name"
                                    bg="bg.subtle"
                                    flex="1"
                                    placeholder="What needs to be done?"
                                    size="lg"
                                    value={newTaskName}
                                    onChange={event => setNewTaskName(event.target.value)}
                                />
                                <Button colorPalette="blue" disabled={!newTaskName.trim()} size="lg" type="submit">
                                    <LuPlus />
                                    Add
                                </Button>
                            </Flex>
                        </form>

                        {error && (
                            <Alert.Root rounded="lg" status="error">
                                <Alert.Indicator />
                                <Alert.Title>{error}</Alert.Title>
                            </Alert.Root>
                        )}

                        {isLoading ? (
                            <Center py="16">
                                <Spinner color="blue.500" size="lg" />
                            </Center>
                        ) : (
                            <React.Fragment>
                                {tasks.length > 0 && (
                                    <Stack gap="2">
                                        <Flex align="center" justify="space-between">
                                            <Text color="fg.muted" textStyle="sm">
                                                {completedCount} of {tasks.length} completed
                                            </Text>
                                            {completedCount === tasks.length && <Badge colorPalette="green">All done 🎉</Badge>}
                                        </Flex>
                                        <Progress.Root colorPalette="blue" size="sm" value={completedPercent}>
                                            <Progress.Track rounded="full">
                                                <Progress.Range />
                                            </Progress.Track>
                                        </Progress.Root>
                                    </Stack>
                                )}
                                {tasks.length === 0 ? (
                                    <EmptyState.Root py="8">
                                        <EmptyState.Content>
                                            <EmptyState.Indicator>
                                                <LuClipboardList />
                                            </EmptyState.Indicator>
                                            <Stack gap="1" textAlign="center">
                                                <EmptyState.Title>No tasks yet</EmptyState.Title>
                                                <EmptyState.Description>Add your first task above and get things done!</EmptyState.Description>
                                            </Stack>
                                        </EmptyState.Content>
                                    </EmptyState.Root>
                                ) : (
                                    <Stack gap="2">
                                        {tasks.map(task => (
                                            <TaskItem key={task.id} task={task} />
                                        ))}
                                    </Stack>
                                )}
                            </React.Fragment>
                        )}
                    </Card.Body>
                </Card.Root>
            </Container>
        </Box>
    );
});
