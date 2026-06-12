import React from "react";
import {Alert, Button, Field, Input, Stack} from "@chakra-ui/react";

interface Props {
    error: string | null;
    isLogin: boolean;
    isSubmitting: boolean;
    passwordInputRef: React.RefObject<HTMLInputElement | null>;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export const AuthForm = React.memo<Props>(({error, isLogin, isSubmitting, passwordInputRef, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <Stack gap="5">
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
                <Field.Root required>
                    <Field.Label color="rgba(210,208,240,0.85)" fontWeight="semibold" fontSize="sm">
                        Username
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        autoCapitalize="none"
                        autoComplete="username"
                        bg="rgba(255,255,255,0.05)"
                        borderColor="rgba(255,255,255,0.1)"
                        color="rgba(240,238,255,0.95)"
                        name="username"
                        placeholder="Username"
                        rounded="xl"
                        size="lg"
                        _placeholder={{color: "rgba(180,178,210,0.4)"}}
                        _focusVisible={{
                            borderColor: "rgba(124,111,255,0.7)",
                            boxShadow: "0 0 0 3px rgba(124,111,255,0.18)",
                            bg: "rgba(255,255,255,0.07)",
                            zIndex: 1,
                        }}
                    />
                </Field.Root>
                <Field.Root required>
                    <Field.Label color="rgba(210,208,240,0.85)" fontWeight="semibold" fontSize="sm">
                        Password
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        bg="rgba(255,255,255,0.05)"
                        borderColor="rgba(255,255,255,0.1)"
                        color="rgba(240,238,255,0.95)"
                        name="password"
                        placeholder="Enter your password"
                        ref={passwordInputRef}
                        rounded="xl"
                        size="lg"
                        type="password"
                        _placeholder={{color: "rgba(180,178,210,0.4)"}}
                        _focusVisible={{
                            borderColor: "rgba(124,111,255,0.7)",
                            boxShadow: "0 0 0 3px rgba(124,111,255,0.18)",
                            bg: "rgba(255,255,255,0.07)",
                            zIndex: 1,
                        }}
                    />
                </Field.Root>
                <Button
                    bg="rgba(124,111,255,0.9)"
                    borderColor="rgba(124,111,255,0.4)"
                    borderWidth="1px"
                    boxShadow="0 8px 32px rgba(124,111,255,0.3)"
                    color="white"
                    loading={isSubmitting}
                    mt="2"
                    rounded="xl"
                    size="lg"
                    type="submit"
                    w="full"
                    _hover={{bg: "rgba(124,111,255,1)", boxShadow: "0 12px 40px rgba(124,111,255,0.45)"}}
                    _active={{bg: "rgba(100,90,220,0.9)"}}
                >
                    {isLogin ? "Login" : "Register"}
                </Button>
            </Stack>
        </form>
    );
});
