import React from "react";
import {Button, Card, Stack, Text} from "@chakra-ui/react";
import {AuthForm} from "@/components/auth/AuthForm";

interface Props {
    error: string | null;
    isLogin: boolean;
    isSubmitting: boolean;
    passwordInputRef: React.RefObject<HTMLInputElement | null>;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
    onToggleMode(): void;
}

export const AuthCard = React.memo<Props>(({error, isLogin, isSubmitting, passwordInputRef, onSubmit, onToggleMode}) => {
    return (
        <Card.Root bg="transparent" borderWidth="0" maxW="md" shadow="none" w="full">
            <Card.Header gap="5" px="0" textAlign="left">
                <Stack gap="2">
                    <Card.Title
                        color="rgba(240,238,255,0.97)"
                        fontSize={{base: "3xl", md: "4xl"}}
                        letterSpacing="-0.05em"
                    >
                        {isLogin ? "Welcome back" : "Create an account"}
                    </Card.Title>
                    <Card.Description color="rgba(200,200,220,0.6)" fontSize="md">
                        {isLogin ? "Login to manage your task pipeline." : "Register and start managing your task pipeline."}
                    </Card.Description>
                </Stack>
            </Card.Header>
            <Card.Body px="0">
                <AuthForm error={error} isLogin={isLogin} isSubmitting={isSubmitting} passwordInputRef={passwordInputRef} onSubmit={onSubmit} />
            </Card.Body>
            <Card.Footer gap="1" justifyContent="flex-start" px="0">
                <Text color="rgba(200,200,220,0.55)" textStyle="sm">
                    {isLogin ? "No account yet?" : "Already have an account?"}
                </Text>
                <Button
                    color="#a78bfa"
                    size="sm"
                    variant="plain"
                    onClick={onToggleMode}
                    _hover={{color: "#c4b5fd"}}
                >
                    {isLogin ? "Register" : "Login"}
                </Button>
            </Card.Footer>
        </Card.Root>
    );
});
