import React from "react";
import {Alert, Button, Card, Center, Field, Input, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck} from "react-icons/lu";
import {useAuthStore} from "@/stores/authStore";
import type {AuthMode} from "@/stores/authStore";

export const AuthPage = React.memo(() => {
    const [mode, setMode] = React.useState<AuthMode>("login");
    const authenticate = useAuthStore(state => state.authenticate);
    const clearError = useAuthStore(state => state.clearError);
    const error = useAuthStore(state => state.error);
    const isSubmitting = useAuthStore(state => state.isSubmitting);

    const isLogin = mode === "login";

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        authenticate(mode, String(formData.get("username")), String(formData.get("password")));
    };

    const toggleMode = () => {
        clearError();
        setMode(isLogin ? "register" : "login");
    };

    return (
        <Center bgGradient="to-br" gradientFrom="blue.50" gradientTo="purple.50" minH="100dvh" p={{base: "0", sm: "4"}}>
            <Card.Root maxW="md" minH={{base: "100dvh", sm: "auto"}} p={{base: "2", sm: "4"}} rounded={{base: "none", sm: "2xl"}} shadow={{base: "none", sm: "xl"}} w="full">
                <Card.Header alignItems="center" gap="4" textAlign="center">
                    <Center bg="blue.500" boxSize="14" color="white" rounded="2xl" shadow="lg">
                        <LuCircleCheck size="28" />
                    </Center>
                    <Stack gap="1">
                        <Card.Title fontSize="2xl">{isLogin ? "Welcome back" : "Create an account"}</Card.Title>
                        <Card.Description>{isLogin ? "Login to manage your tasks" : "Register to start managing your tasks"}</Card.Description>
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Stack gap="5">
                            {error && (
                                <Alert.Root rounded="lg" status="error">
                                    <Alert.Indicator />
                                    <Alert.Title>{error}</Alert.Title>
                                </Alert.Root>
                            )}
                            <Field.Root required>
                                <Field.Label>
                                    Username
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input autoComplete="username" name="username" placeholder="Enter your username" />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>
                                    Password
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input autoComplete={isLogin ? "current-password" : "new-password"} name="password" placeholder="Enter your password" type="password" />
                            </Field.Root>
                            <Button colorPalette="blue" loading={isSubmitting} mt="1" size="lg" type="submit" w="full">
                                {isLogin ? "Login" : "Register"}
                            </Button>
                        </Stack>
                    </form>
                </Card.Body>
                <Card.Footer alignItems="center" gap="1" justifyContent="center">
                    <Text color="fg.muted" textStyle="sm">
                        {isLogin ? "No account yet?" : "Already have an account?"}
                    </Text>
                    <Button colorPalette="blue" size="sm" variant="ghost" onClick={toggleMode}>
                        {isLogin ? "Register" : "Login"}
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Center>
    );
});
