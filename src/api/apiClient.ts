import {useAuthStore} from "@/stores/authStore";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    response => {
        const latestToken = extractBearerToken(response.headers.authorization);
        if (latestToken) {
            localStorage.setItem("token", latestToken);
        }

        return response;
    },
    error => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

function extractBearerToken(authorizationHeader: string | undefined): string | null {
    if (!authorizationHeader) {
        return null;
    }

    const bearerPrefix = "Bearer ";
    if (!authorizationHeader.startsWith(bearerPrefix)) {
        return null;
    }

    return authorizationHeader.slice(bearerPrefix.length);
}

export function extractErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (Array.isArray(data?.errors)) {
            return data.errors.join(", ");
        }

        if (typeof data?.error === "string") {
            return data.error;
        }
    }

    return "Something went wrong, please try again";
}
