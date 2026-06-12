import {extractErrorMessage} from "@/api/apiClient";

interface RunAsyncOptions<T> {
    loadingKey?: string;
    errorKey?: string;
    onSuccess?: (data: T) => Record<string, unknown>;
}

export async function runAsync<T>(set: (partial: Record<string, unknown>) => void, opts: RunAsyncOptions<T>, fn: () => Promise<T>): Promise<T | undefined> {
    const loadingKey = opts.loadingKey ?? "isLoading";
    const errorKey = opts.errorKey ?? "error";

    try {
        const data = await fn();
        set({[loadingKey]: false, [errorKey]: null, ...(opts.onSuccess?.(data) ?? {})});
        return data;
    } catch (error) {
        set({[loadingKey]: false, [errorKey]: extractErrorMessage(error)});
        throw error;
    }
}
