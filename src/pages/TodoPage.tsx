import React from "react";
import {Avatar} from "@/components/lane/atoms";
import {AlertIcon, PlusIcon} from "@/components/lane/icons";
import {EditTaskModal} from "@/components/todo/EditTaskModal";
import {EmptyState} from "@/components/todo/EmptyState";
import {ErrorCard} from "@/components/todo/ErrorCard";
import {LoadingState} from "@/components/todo/LoadingState";
import {LogoutDialog} from "@/components/todo/LogoutDialog";
import {NewTaskModal} from "@/components/todo/NewTaskModal";
import {Sidebar} from "@/components/todo/Sidebar";
import {TaskRow} from "@/components/todo/TaskRow";
import {useAuthStore} from "@/stores/authStore";
import {useTaskStore} from "@/stores/taskStore";
import type {Task} from "@/types/Task";
import type {TaskFilter} from "@/types/TaskFilter";

type TodoModal = {kind: "new"} | {kind: "edit"; task: Task} | {kind: "logout"} | null;

const MOBILE_FILTERS: Array<{key: TaskFilter; label: string}> = [
    {key: "all", label: "All"},
    {key: "active", label: "Active"},
    {key: "completed", label: "Done"},
];

function formatToday(): string {
    return new Date().toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"});
}

export const TodoPage = React.memo(() => {
    const [filter, setFilter] = React.useState<TaskFilter>("all");
    const [modal, setModal] = React.useState<TodoModal>(null);
    const logout = useAuthStore(state => state.logout);
    const username = useAuthStore(state => state.username);
    const tasks = useTaskStore(state => state.tasks);
    const isLoading = useTaskStore(state => state.isLoading);
    const error = useTaskStore(state => state.error);
    const fetchTasks = useTaskStore(state => state.fetchTasks);

    React.useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    const completedPercent = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
    const counts: Record<TaskFilter, number> = {all: tasks.length, active: activeTasks.length, completed: completedTasks.length};

    const isInitialLoading = isLoading && tasks.length === 0;
    const isLoadFailed = !isLoading && error !== null && tasks.length === 0;

    const openEdit = (task: Task) => setModal({kind: "edit", task});

    const renderList = () => {
        if (isInitialLoading) {
            return <LoadingState />;
        }

        if (isLoadFailed) {
            return <ErrorCard message={error} onRetry={fetchTasks} />;
        }

        if (tasks.length === 0) {
            return <EmptyState onAdd={() => setModal({kind: "new"})} />;
        }

        return (
            <React.Fragment>
                {error && (
                    <div className="ln-error-banner" style={{margin: "4px 14px 10px"}}>
                        <AlertIcon size={16} />
                        <span>{error}</span>
                    </div>
                )}
                {filter !== "completed" && activeTasks.map(task => <TaskRow key={task.id} task={task} onOpen={() => openEdit(task)} />)}
                {filter === "active" && activeTasks.length === 0 && <div className="ln-filter-empty">All clear — nothing active.</div>}
                {filter === "all" && completedTasks.length > 0 && (
                    <div className="ln-done-divider">
                        <span className="ln-done-label">Completed</span>
                        <span className="mono" style={{fontSize: 11}}>
                            {completedTasks.length}
                        </span>
                        <span className="ln-done-line" />
                    </div>
                )}
                {filter !== "active" && completedTasks.map(task => <TaskRow key={task.id} task={task} onOpen={() => openEdit(task)} />)}
                {filter === "completed" && completedTasks.length === 0 && <div className="ln-filter-empty">Nothing completed yet.</div>}
            </React.Fragment>
        );
    };

    return (
        <div className="lane ln-app">
            <Sidebar counts={counts} filter={filter} username={username} onFilterChange={setFilter} onLogout={() => setModal({kind: "logout"})} onNewTask={() => setModal({kind: "new"})} />

            <div className="ln-main">
                {/* mobile header */}
                <div className="ln-mobile-top">
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div>
                            <h1 style={{fontSize: 27, fontWeight: 700, letterSpacing: "-0.035em"}}>Tasks</h1>
                            <div className="mono" style={{fontSize: 12.5, color: "var(--ln-ink-3)", marginTop: 1}}>
                                {formatToday()} · {completedPercent}%
                            </div>
                        </div>
                        <button aria-label="Account" onClick={() => setModal({kind: "logout"})} style={{border: "none", background: "transparent", padding: 0, display: "flex"}}>
                            <Avatar initials={(username ?? "?").slice(0, 1).toUpperCase()} size={34} />
                        </button>
                    </div>
                    <div className="ln-track" style={{marginTop: 14, height: 6}}>
                        <div className="ln-track-fill" style={{width: completedPercent + "%"}} />
                    </div>
                    <div style={{display: "flex", gap: 7, marginTop: 14}}>
                        {MOBILE_FILTERS.map(item => (
                            <button
                                className={"ln-btn ln-btn-sm " + (filter === item.key ? "ln-btn-primary" : "ln-btn-ghost")}
                                key={item.key}
                                onClick={() => setFilter(item.key)}
                                style={{borderRadius: 999, height: 30}}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* desktop header */}
                <div className="ln-main-header">
                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                        <h1 style={{fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em"}}>Tasks</h1>
                        <span className="ln-pill ln-pill-soft mono">{formatToday()}</span>
                    </div>
                    <p style={{fontSize: 14, color: "var(--ln-ink-3)", marginTop: 5}}>
                        <span style={{color: "var(--ln-ink-2)", fontWeight: 600}}>{activeTasks.length} active</span> · newest first
                    </p>
                    <div style={{display: "flex", alignItems: "center", gap: 14, marginTop: 18}}>
                        <div className="ln-track" style={{flex: 1}}>
                            <div className="ln-track-fill" style={{width: completedPercent + "%"}} />
                        </div>
                        <span className="mono" style={{fontSize: 12.5, color: "var(--ln-ink-2)", fontWeight: 600, whiteSpace: "nowrap", flex: "none"}}>
                            {completedTasks.length}/{tasks.length} · {completedPercent}%
                        </span>
                    </div>
                </div>

                <div className="ln-list">{renderList()}</div>
            </div>

            <button aria-label="New task" className="ln-fab ln-btn ln-btn-primary" onClick={() => setModal({kind: "new"})}>
                <PlusIcon size={24} strokeWidth={2.3} />
            </button>

            {modal?.kind === "new" && <NewTaskModal onClose={() => setModal(null)} />}
            {modal?.kind === "edit" && <EditTaskModal task={modal.task} onClose={() => setModal(null)} />}
            {modal?.kind === "logout" && <LogoutDialog onCancel={() => setModal(null)} onConfirm={logout} />}
        </div>
    );
});
