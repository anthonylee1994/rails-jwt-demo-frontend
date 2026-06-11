import React from "react";
import {Alert, Badge, Box, Button, Card, Center, Field, Flex, Heading, Input, Stack, Text} from "@chakra-ui/react";
import {LuCircleCheck, LuLockKeyhole, LuSparkles} from "react-icons/lu";
import {useAuthStore} from "@/stores/authStore";
import type {AuthMode} from "@/stores/authStore";

export const AuthPage = React.memo(() => {
    const [mode, setMode] = React.useState<AuthMode>("login");
    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const authenticate = useAuthStore(state => state.authenticate);
    const clearError = useAuthStore(state => state.clearError);
    const error = useAuthStore(state => state.error);
    const isSubmitting = useAuthStore(state => state.isSubmitting);

    const isLogin = mode === "login";

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = String(formData.get("username")).trim().toLowerCase();
        const isAuthenticated = await authenticate(mode, username, String(formData.get("password")));

        if (isLogin && !isAuthenticated) {
            if (passwordInputRef.current) {
                passwordInputRef.current.value = "";
                passwordInputRef.current.focus();
            }
        }
    };

    const toggleMode = () => {
        clearError();
        setMode(isLogin ? "register" : "login");
    };

    return (
        <Center
            bg="#f6f9fc"
            minH="100dvh"
            overflow="hidden"
            p={{base: "0", md: "8"}}
            position="relative"
            _before={{
                bg: "linear-gradient(135deg, #635bff 0%, #00d4ff 42%, #7a73ff 72%, #ff80b5 100%)",
                content: '""',
                h: "46vh",
                left: "-8%",
                position: "absolute",
                right: "-8%",
                top: "-18vh",
                transform: "skewY(-8deg)",
            }}
        >
            <Flex
                bg="whiteAlpha.900"
                borderColor="blackAlpha.100"
                borderWidth="1px"
                boxShadow="0 30px 90px rgba(50, 50, 93, 0.18)"
                maxW="6xl"
                minH={{base: "100dvh", md: "660px"}}
                overflow="hidden"
                position="relative"
                rounded={{base: "none", md: "3xl"}}
                w="full"
            >
                <Box
                    bg="#0a2540"
                    color="white"
                    display={{base: "none", lg: "block"}}
                    flex="1"
                    overflow="hidden"
                    p="12"
                    position="relative"
                    _after={{
                        bg: "linear-gradient(135deg, rgba(0,212,255,0.28), rgba(99,91,255,0.2))",
                        borderRadius: "999px",
                        bottom: "-120px",
                        content: '""',
                        h: "360px",
                        position: "absolute",
                        right: "-120px",
                        w: "360px",
                    }}
                >
                    <Stack gap="10" h="full" justify="space-between" position="relative" zIndex="1">
                        <Stack gap="7">
                            <Flex align="center" gap="3">
                                <Center bg="whiteAlpha.200" boxSize="11" rounded="2xl">
                                    <LuCircleCheck size="24" />
                                </Center>
                                <Text fontWeight="bold" letterSpacing="0.12em" textTransform="uppercase">
                                    Taskflow
                                </Text>
                            </Flex>
                            <Stack gap="5">
                                <Badge alignSelf="flex-start" bg="whiteAlpha.200" color="cyan.100" px="3" py="1" rounded="full">
                                    <LuSparkles />
                                    JWT demo workspace
                                </Badge>
                                <Heading fontSize="5xl" letterSpacing="-0.055em" lineHeight="1">
                                    One clean place to ship every small task.
                                </Heading>
                                <Text color="whiteAlpha.800" fontSize="lg" maxW="md">
                                    A focused demo app with secure sessions, fast task capture, and a polished Stripe-inspired control surface.
                                </Text>
                            </Stack>
                        </Stack>
                        <Flex bg="whiteAlpha.100" borderColor="whiteAlpha.200" borderWidth="1px" gap="4" p="5" rounded="2xl">
                            <Center bg="cyan.300" boxSize="10" color="#0a2540" rounded="xl">
                                <LuLockKeyhole />
                            </Center>
                            <Stack gap="1">
                                <Text fontWeight="semibold">JWT protected</Text>
                                <Text color="whiteAlpha.700" textStyle="sm">
                                    Login, register, then manage your private task list.
                                </Text>
                            </Stack>
                        </Flex>
                    </Stack>
                </Box>

                <Center flex="1" px={{base: "5", sm: "8", md: "12"}} py={{base: "10", md: "12"}}>
                    <Card.Root bg="transparent" borderWidth="0" maxW="md" shadow="none" w="full">
                        <Card.Header gap="5" px="0" textAlign="left">
                            <Stack gap="2">
                                <Card.Title color="#0a2540" fontSize={{base: "3xl", md: "4xl"}} letterSpacing="-0.05em">
                                    {isLogin ? "Welcome back" : "Create an account"}
                                </Card.Title>
                                <Card.Description color="gray.600" fontSize="md">
                                    {isLogin ? "Login to manage your task pipeline." : "Register and start managing your task pipeline."}
                                </Card.Description>
                            </Stack>
                        </Card.Header>
                        <Card.Body px="0">
                            <form onSubmit={handleSubmit}>
                                <Stack gap="5">
                                    {error && (
                                        <Alert.Root borderColor="red.200" borderWidth="1px" rounded="xl" status="error">
                                            <Alert.Indicator />
                                            <Alert.Title>{error}</Alert.Title>
                                        </Alert.Root>
                                    )}
                                    <Field.Root required>
                                        <Field.Label color="#0a2540" fontWeight="semibold">
                                            Username
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input autoCapitalize="none" autoComplete="username" bg="white" borderColor="gray.200" name="username" placeholder="Username" rounded="xl" size="lg" />
                                    </Field.Root>
                                    <Field.Root required>
                                        <Field.Label color="#0a2540" fontWeight="semibold">
                                            Password
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input
                                            autoComplete={isLogin ? "current-password" : "new-password"}
                                            bg="white"
                                            borderColor="gray.200"
                                            name="password"
                                            placeholder="Enter your password"
                                            ref={passwordInputRef}
                                            rounded="xl"
                                            size="lg"
                                            type="password"
                                        />
                                    </Field.Root>
                                    <Button bg="#635bff" color="white" loading={isSubmitting} mt="2" rounded="xl" size="lg" type="submit" w="full" _hover={{bg: "#4f46e5"}}>
                                        {isLogin ? "Login" : "Register"}
                                    </Button>
                                </Stack>
                            </form>
                        </Card.Body>
                        <Card.Footer gap="1" justifyContent="flex-start" px="0">
                            <Text color="gray.600" textStyle="sm">
                                {isLogin ? "No account yet?" : "Already have an account?"}
                            </Text>
                            <Button color="#635bff" size="sm" variant="plain" onClick={toggleMode}>
                                {isLogin ? "Register" : "Login"}
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </Center>
            </Flex>
        </Center>
    );
});
