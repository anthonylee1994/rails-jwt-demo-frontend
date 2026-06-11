import axios from "axios";
import {create} from "zustand";
import {apiClient, extractErrorMessage} from "@/api/apiClient";

const TOKEN_KEY = "token";

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
    logout(): void;
    clearError(): void;
}

const storedToken = localStorage.getItem(TOKEN_KEY);

export const useAuthStore = create<AuthState>()(set => ({
    token: storedToken,
    username: storedToken ? decodeUsername(storedToken) : null,
    error: null,
    isSubmitting: false,
    async authenticate(mode, username, password) {
        set({isSubmitting: true, error: null});

        try {
            const response = await apiClient.post<{token: string}>(`/auth/${mode}`, {username, password});

            localStorage.setItem(TOKEN_KEY, response.data.token);
            set({token: response.data.token, username: decodeUsername(response.data.token), isSubmitting: false});

            return true;
        } catch (error) {
            set({error: extractErrorMessage(error), isSubmitting: false});

            return false;
        }
    },
    logout() {
        localStorage.removeItem(TOKEN_KEY);
        set({token: null, username: null, error: null});
    },
    clearError() {
        set({error: null});
    },
}));

apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
            useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    }
);
