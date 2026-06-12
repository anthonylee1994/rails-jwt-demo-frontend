import {create} from "zustand";
import {apiClient} from "@/api/apiClient";
import {runAsync} from "@/lib/runAsync";
import type {Task} from "@/types/Task";

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks(): Promise<void>;
    createTask(name: string): Promise<boolean>;
    updateTask(id: string, changes: Partial<Pick<Task, "name" | "completed">>): Promise<boolean>;
    deleteTask(id: string): Promise<boolean>;
    clearError(): void;
}

export const useTaskStore = create<TaskState>()((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,
    async fetchTasks() {
        await runAsync(
            set,
            {
                loadingKey: "isLoading",
                onSuccess: tasks => ({tasks}),
            },
            async () => (await apiClient.get<Task[]>("/tasks")).data
        );
    },
    async createTask(name) {
        try {
            await runAsync(
                set,
                {
                    onSuccess: task => ({tasks: [task, ...get().tasks]}),
                },
                async () => (await apiClient.post<Task>("/tasks", {name})).data
            );

            return true;
        } catch {
            return false;
        }
    },
    async updateTask(id, changes) {
        try {
            await runAsync(
                set,
                {
                    onSuccess: task => ({tasks: get().tasks.map(t => (t.id === id ? task : t))}),
                },
                async () => (await apiClient.put<Task>(`/tasks/${id}`, changes)).data
            );

            return true;
        } catch {
            return false;
        }
    },
    async deleteTask(id) {
        try {
            await runAsync(
                set,
                {
                    onSuccess: () => ({tasks: get().tasks.filter(t => t.id !== id)}),
                },
                async () => {
                    await apiClient.delete(`/tasks/${id}`);
                }
            );

            return true;
        } catch {
            return false;
        }
    },
    clearError() {
        set({error: null});
    },
}));
