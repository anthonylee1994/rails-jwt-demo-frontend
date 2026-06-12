import {create} from "zustand";
import {apiClient} from "@/api/apiClient";
import {runAsync} from "@/lib/runAsync";
import type {Task} from "@/types/Task";

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks(): Promise<void>;
    createTask(name: string): Promise<void>;
    updateTask(id: string, changes: Partial<Pick<Task, "name" | "completed">>): Promise<void>;
    deleteTask(id: string): Promise<void>;
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
        await runAsync(
            set,
            {
                onSuccess: task => ({tasks: [task, ...get().tasks]}),
            },
            async () => (await apiClient.post<Task>("/tasks", {name})).data
        );
    },
    async updateTask(id, changes) {
        await runAsync(
            set,
            {
                onSuccess: task => ({tasks: get().tasks.map(t => (t.id === id ? task : t))}),
            },
            async () => (await apiClient.put<Task>(`/tasks/${id}`, changes)).data
        );
    },
    async deleteTask(id) {
        await runAsync(
            set,
            {
                onSuccess: () => ({tasks: get().tasks.filter(t => t.id !== id)}),
            },
            async () => {
                await apiClient.delete(`/tasks/${id}`);
            }
        );
    },
}));
