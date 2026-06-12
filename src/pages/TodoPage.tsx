import React from "react";
import {Box, Container} from "@chakra-ui/react";
import {TodoHeader} from "@/components/todo/TodoHeader";
import {TodoQueueCard} from "@/components/todo/TodoQueueCard";
import {TodoStats} from "@/components/todo/TodoStats";
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
        <Box bg="#08080f" minH="100dvh" overflow="hidden" position="relative">
            {/* Ambient orbs */}
            <Box
                filter="blur(100px)"
                h="700px"
                left="-250px"
                pointerEvents="none"
                position="absolute"
                top="-350px"
                w="700px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(124,111,255,0.28) 0%, transparent 70%)"
            />
            <Box
                filter="blur(80px)"
                h="500px"
                pointerEvents="none"
                position="absolute"
                right="-150px"
                top="20%"
                w="500px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)"
            />
            <Box
                bottom="-100px"
                filter="blur(100px)"
                h="500px"
                left="20%"
                pointerEvents="none"
                position="absolute"
                w="500px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(168,96,238,0.12) 0%, transparent 70%)"
            />

            <Container maxW="6xl" px={{base: "4", lg: "8"}} py={{base: "6", md: "8"}} position="relative" zIndex="1">
                <TodoHeader onLogout={logout} />
                <TodoStats completedCount={completedCount} completedPercent={completedPercent} totalCount={tasks.length} />
                <TodoQueueCard
                    completedCount={completedCount}
                    completedPercent={completedPercent}
                    error={error}
                    isLoading={isLoading}
                    newTaskName={newTaskName}
                    tasks={tasks}
                    onCreate={handleCreate}
                    onNewTaskNameChange={setNewTaskName}
                />
            </Container>
        </Box>
    );
});
