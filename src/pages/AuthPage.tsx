import React from "react";
import {Box, Center, Flex} from "@chakra-ui/react";
import {AuthCard} from "@/components/auth/AuthCard";
import {AuthHero} from "@/components/auth/AuthHero";
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
        <Box bg="#08080f" minH="100dvh" overflow="hidden" position="relative">
            {/* Ambient gradient orbs */}
            <Box
                filter="blur(80px)"
                h="700px"
                left="-200px"
                pointerEvents="none"
                position="absolute"
                top="-300px"
                w="700px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(124,111,255,0.22) 0%, transparent 70%)"
            />
            <Box
                bottom="-200px"
                filter="blur(80px)"
                h="600px"
                pointerEvents="none"
                position="absolute"
                right="-200px"
                w="600px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)"
            />
            <Box
                bottom="20%"
                filter="blur(100px)"
                h="400px"
                left="30%"
                pointerEvents="none"
                position="absolute"
                w="400px"
                zIndex="0"
                bg="radial-gradient(circle, rgba(168,96,238,0.1) 0%, transparent 70%)"
            />

            <Center minH="100dvh" p={{base: "0", md: "8"}} position="relative" zIndex="1">
                <Flex
                    backdropFilter="blur(24px)"
                    bg="rgba(15,15,25,0.85)"
                    borderColor="rgba(255,255,255,0.07)"
                    borderWidth="1px"
                    boxShadow="0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                    maxW="6xl"
                    minH={{base: "100dvh", md: "660px"}}
                    overflow="hidden"
                    position="relative"
                    rounded={{base: "none", md: "3xl"}}
                    w="full"
                >
                    <AuthHero />
                    <Center flex="1" px={{base: "5", sm: "8", md: "12"}} py={{base: "10", md: "12"}}>
                        <AuthCard error={error} isLogin={isLogin} isSubmitting={isSubmitting} passwordInputRef={passwordInputRef} onSubmit={handleSubmit} onToggleMode={toggleMode} />
                    </Center>
                </Flex>
            </Center>
        </Box>
    );
});
