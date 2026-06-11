import React from "react";
import {Alert, Badge, Box, Button, Card, Center, Container, Flex, Group, Heading, Input, Progress, SimpleGrid, Spinner, Stack, Text} from "@chakra-ui/react";
import {LuArrowUpRight, LuCircleCheck, LuClipboardList, LuLogOut, LuPlus, LuSparkles, LuTarget} from "react-icons/lu";
import {TaskItem} from "@/components/TaskItem";
import {useAuthStore} from "@/stores/authStore";
import {useTaskStore} from "@/stores/taskStore";

export const TodoPage = React.memo(() => {
    const [newTaskName, setNewTaskName] = React.useState("");
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

    const handleCreate = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = newTaskName.trim();

        if (!name) {
            return;
        }

        createTask(name);
        setNewTaskName("");
    };

    return (
        <Box
            bg="#f6f9fc"
            minH="100dvh"
            overflow="hidden"
            position="relative"
            _before={{
                bg: "linear-gradient(135deg, #00d4ff 0%, #635bff 52%, #a960ee 100%)",
                content: '""',
                h: "420px",
                left: "-12%",
                position: "absolute",
                right: "-12%",
                top: "-190px",
                transform: "skewY(-6deg)",
            }}
        >
            <Container maxW="6xl" px={{base: "4", lg: "8"}} py={{base: "6", md: "8"}} position="relative">
                <Flex align={{base: "stretch", md: "flex-start"}} direction={{base: "column", md: "row"}} gap={{base: "5", md: "8"}} justify="space-between" mb={{base: "8", md: "12"}}>
                    <Stack gap={{base: "5", md: "4"}} maxW="3xl" mt={{base: 0, md: 10}}>
                        <Flex align="center" gap="3" justify="space-between">
                            <Flex align="center" gap="3" minW="0">
                                <Center bg="whiteAlpha.200" boxSize={{base: "11", md: "12"}} color="white" flexShrink="0" rounded="2xl" shadow="0 16px 32px rgba(10,37,64,0.16)">
                                    <LuCircleCheck size="24" />
                                </Center>
                                <Heading color="white" fontSize={{base: "3xl", md: "5xl"}} letterSpacing="-0.06em" lineHeight="1">
                                    My Tasks
                                </Heading>
                            </Flex>
                            <Button
                                aria-label="Logout"
                                alignSelf="center"
                                bg="whiteAlpha.950"
                                boxSize="13"
                                color="#425466"
                                display={{base: "inline-flex", md: "none"}}
                                flexShrink="0"
                                minW="13"
                                p="0"
                                rounded="full"
                                shadow="0 12px 30px rgba(10,37,64,0.16)"
                                variant="outline"
                                onClick={logout}
                            >
                                <LuLogOut size="22" />
                            </Button>
                        </Flex>
                        <Text
                            alignSelf={{base: "center", md: "stretch"}}
                            color="white"
                            fontSize={{base: "lg", md: "lg"}}
                            lineHeight={{base: "1.55", md: "1.7"}}
                            maxW={{base: "34rem", md: "2xl"}}
                            textAlign={{base: "center", md: "left"}}
                        >
                            Capture tasks quickly, keep progress visible, and stay focused on the next action.
                        </Text>
                    </Stack>
                    <Button
                        alignSelf="center"
                        bg="whiteAlpha.950"
                        color="#425466"
                        display={{base: "none", md: "inline-flex"}}
                        rounded="full"
                        shadow="0 12px 30px rgba(10,37,64,0.16)"
                        variant="outline"
                        onClick={logout}
                    >
                        <LuLogOut />
                        Logout
                    </Button>
                </Flex>

                <SimpleGrid columns={{base: 1, md: 3}} gap="4" mb="4">
                    <Card.Root borderColor="blackAlpha.100" rounded="2xl" shadow="sm">
                        <Card.Body gap="2" px="5" py="4">
                            <Flex align="center" justify="space-between">
                                <Text color="gray.500" fontWeight="semibold" textStyle="sm">
                                    Total tasks
                                </Text>
                                <LuClipboardList color="#635bff" />
                            </Flex>
                            <Heading color="#0a2540" fontSize="2xl" letterSpacing="-0.04em">
                                {tasks.length}
                            </Heading>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root borderColor="blackAlpha.100" rounded="2xl" shadow="sm">
                        <Card.Body gap="2" px="5" py="4">
                            <Flex align="center" justify="space-between">
                                <Text color="gray.500" fontWeight="semibold" textStyle="sm">
                                    Completed
                                </Text>
                                <LuCircleCheck color="#00a88f" />
                            </Flex>
                            <Heading color="#0a2540" fontSize="2xl" letterSpacing="-0.04em">
                                {completedCount}
                            </Heading>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root bg="#0a2540" borderColor="transparent" color="white" overflow="hidden" rounded="2xl" shadow="0 20px 50px rgba(10,37,64,0.22)">
                        <Card.Body gap="2" px="5" py="4" position="relative">
                            <Flex align="center" justify="space-between">
                                <Text color="whiteAlpha.700" fontWeight="semibold" textStyle="sm">
                                    Progress
                                </Text>
                                <LuTarget color="#00d4ff" />
                            </Flex>
                            <Heading fontSize="2xl" letterSpacing="-0.04em">
                                {Math.round(completedPercent)}%
                            </Heading>
                            <Box bg="cyan.300" borderRadius="999px" bottom="-48px" h="120px" opacity="0.2" position="absolute" right="-42px" w="120px" />
                        </Card.Body>
                    </Card.Root>
                </SimpleGrid>

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
                        <form onSubmit={handleCreate}>
                            <Group attached w="full">
                                <Input
                                    aria-label="New task name"
                                    bg="white"
                                    borderColor="blackAlpha.200"
                                    flex="1"
                                    minW="0"
                                    placeholder="What needs to be done?"
                                    roundedStart="xl"
                                    size="lg"
                                    value={newTaskName}
                                    onChange={event => setNewTaskName(event.target.value)}
                                    _focusVisible={{borderColor: "#635bff", boxShadow: "0 0 0 1px #635bff", zIndex: 1}}
                                />
                                <Button
                                    aria-label="Add task"
                                    bg="#635bff"
                                    boxSize="12"
                                    color="white"
                                    disabled={!newTaskName.trim()}
                                    flexShrink="0"
                                    minW="12"
                                    p="0"
                                    rounded="xl"
                                    type="submit"
                                    _hover={{bg: "#4f46e5"}}
                                >
                                    <LuPlus />
                                </Button>
                            </Group>
                        </form>

                        {error && (
                            <Alert.Root borderColor="red.200" borderWidth="1px" rounded="xl" status="error">
                                <Alert.Indicator />
                                <Alert.Title>{error}</Alert.Title>
                            </Alert.Root>
                        )}

                        {isLoading ? (
                            <Center py="16">
                                <Spinner color="#635bff" size="lg" />
                            </Center>
                        ) : (
                            <React.Fragment>
                                {tasks.length > 0 && (
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
                                )}
                                {tasks.length === 0 ? (
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
                                ) : (
                                    <Stack gap="3">
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
