import React from "react";
import {AuthForm} from "@/components/auth/AuthForm";
import {BrandPanel} from "@/components/auth/BrandPanel";
import {Logo} from "@/components/lane/atoms";
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
        <div className="lane ln-auth">
            <BrandPanel />
            <div className="ln-auth-main">
                <div className="ln-auth-card">
                    <div className="ln-auth-logo-mobile">
                        <Logo />
                    </div>
                    <AuthForm error={error} isLogin={isLogin} isSubmitting={isSubmitting} passwordInputRef={passwordInputRef} onSubmit={handleSubmit} onToggleMode={toggleMode} />
                </div>
            </div>
        </div>
    );
});
