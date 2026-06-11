import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

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
