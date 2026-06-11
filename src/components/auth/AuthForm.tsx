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
                    <Input
                        autoCapitalize="none"
                        autoComplete="username"
                        bg="white"
                        borderColor="gray.200"
                        name="username"
                        placeholder="Username"
                        rounded="xl"
                        size="lg"
                        _focusVisible={{borderColor: "#635bff", boxShadow: "0 0 0 1px #635bff", zIndex: 1}}
                    />
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
                        _focusVisible={{borderColor: "#635bff", boxShadow: "0 0 0 1px #635bff", zIndex: 1}}
                    />
                </Field.Root>
                <Button bg="#635bff" color="white" loading={isSubmitting} mt="2" rounded="xl" size="lg" type="submit" w="full" _hover={{bg: "#4f46e5"}}>
                    {isLogin ? "Login" : "Register"}
                </Button>
            </Stack>
        </form>
    );
});
