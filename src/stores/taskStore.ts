import {create} from "zustand";
import {apiClient, extractErrorMessage} from "@/api/apiClient";
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
        set({isLoading: true, error: null});

        try {
            const response = await apiClient.get<Task[]>("/tasks");

            set({tasks: response.data, isLoading: false});
        } catch (error) {
            set({error: extractErrorMessage(error), isLoading: false});
        }
    },
    async createTask(name) {
        try {
            const response = await apiClient.post<Task>("/tasks", {name});

            set({tasks: [response.data, ...get().tasks], error: null});
        } catch (error) {
            set({error: extractErrorMessage(error)});
        }
    },
    async updateTask(id, changes) {
        try {
            const response = await apiClient.put<Task>(`/tasks/${id}`, changes);

            set({tasks: get().tasks.map(task => (task.id === id ? response.data : task)), error: null});
        } catch (error) {
            set({error: extractErrorMessage(error)});
        }
    },
    async deleteTask(id) {
        try {
            await apiClient.delete(`/tasks/${id}`);

            set({tasks: get().tasks.filter(task => task.id !== id), error: null});
        } catch (error) {
            set({error: extractErrorMessage(error)});
        }
    },
}));
