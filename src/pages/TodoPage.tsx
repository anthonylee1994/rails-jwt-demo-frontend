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
