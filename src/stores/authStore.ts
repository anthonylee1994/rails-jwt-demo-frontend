import {create} from "zustand";
import {apiClient} from "@/api/apiClient";
import {getToken, setToken, clearToken} from "@/lib/storage";
import {runAsync} from "@/lib/runAsync";

function decodeUsername(token: string): string | null {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        return typeof payload.username === "string" ? payload.username : null;
    } catch {
        return null;
    }
}

export type AuthMode = "login" | "register";

interface AuthState {
    token: string | null;
    username: string | null;
    error: string | null;
    isSubmitting: boolean;
    authenticate(mode: AuthMode, username: string, password: string): Promise<boolean>;
    setToken(token: string): void;
    logout(): void;
    clearError(): void;
}

const storedToken = getToken();

export const useAuthStore = create<AuthState>()(set => ({
    token: storedToken,
    username: storedToken ? decodeUsername(storedToken) : null,
    error: null,
    isSubmitting: false,
    async authenticate(mode, username, password) {
        set({isSubmitting: true, error: null});

        try {
            await runAsync(
                set,
                {
                    loadingKey: "isSubmitting",
                    onSuccess: data => ({token: data.token, username: decodeUsername(data.token)}),
                },
                async () => {
                    const response = await apiClient.post<{token: string}>(`/auth/${mode}`, {username, password});
                    setToken(response.data.token);
                    return response.data;
                }
            );

            return true;
        } catch {
            return false;
        }
    },
    setToken(token) {
        setToken(token);
        set({token, username: decodeUsername(token)});
    },
    logout() {
        clearToken();
        set({token: null, username: null, error: null});
    },
    clearError() {
        set({error: null});
    },
}));
