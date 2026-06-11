import React from "react";
import {Center, Flex} from "@chakra-ui/react";
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
                <AuthHero />
                <Center flex="1" px={{base: "5", sm: "8", md: "12"}} py={{base: "10", md: "12"}}>
                    <AuthCard error={error} isLogin={isLogin} isSubmitting={isSubmitting} passwordInputRef={passwordInputRef} onSubmit={handleSubmit} onToggleMode={toggleMode} />
                </Center>
            </Flex>
        </Center>
    );
});
