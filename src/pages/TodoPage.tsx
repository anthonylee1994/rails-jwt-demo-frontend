import React from "react";
import {Avatar} from "@/components/lane/atoms";
import {btnClass, errorBanner, lane, mono, pillSoft, track, trackFill} from "@/components/lane/classes";
import {AlertIcon, PlusIcon, XIcon} from "@/components/lane/icons";
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

const FAB_CLASS =
    "fixed right-[18px] bottom-[calc(24px+env(safe-area-inset-bottom,0px))] z-[25] hidden h-[54px] w-[54px] items-center justify-center rounded-[18px] border border-transparent bg-ln-accent p-0 text-white shadow-[0_8px_22px_rgba(74,72,194,0.42)] [transition:background_0.14s,box-shadow_0.14s,border-color_0.14s] enabled:hover:bg-ln-accent-600 max-[820px]:inline-flex";

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
    const clearError = useTaskStore(state => state.clearError);

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
                {filter !== "completed" && activeTasks.map(task => <TaskRow key={task.id} task={task} onOpen={() => openEdit(task)} />)}
                {filter === "active" && activeTasks.length === 0 && <div className="px-4 py-9 text-center text-[13.5px] text-ln-ink-4">All clear — nothing active.</div>}
                {filter === "all" && completedTasks.length > 0 && (
                    <div className="flex items-center gap-2 px-3.5 pt-4 pb-2 text-ln-ink-4">
                        <span className="text-[12px] font-bold tracking-[0.04em] uppercase">Completed</span>
                        <span className={mono + " text-[11px]"}>{completedTasks.length}</span>
                        <span className="h-px flex-1 bg-ln-line" />
                    </div>
                )}
                {filter !== "active" && completedTasks.map(task => <TaskRow key={task.id} task={task} onOpen={() => openEdit(task)} />)}
                {filter === "completed" && completedTasks.length === 0 && <div className="px-4 py-9 text-center text-[13.5px] text-ln-ink-4">Nothing completed yet.</div>}
            </React.Fragment>
        );
    };

    return (
        <div className={lane + " flex bg-ln-surface"}>
            <Sidebar counts={counts} filter={filter} username={username} onFilterChange={setFilter} onLogout={() => setModal({kind: "logout"})} onNewTask={() => setModal({kind: "new"})} />

            <div className="flex min-w-0 flex-1 flex-col">
                {/* mobile header */}
                <div className="hidden border-b border-ln-line px-[18px] pt-4 pb-3.5 max-[820px]:block">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-[27px] font-bold tracking-[-0.035em]">Tasks</h1>
                            <div className={mono + " mt-px text-[12.5px] text-ln-ink-3"}>
                                {formatToday()} · {completedPercent}%
                            </div>
                        </div>
                        <button aria-label="Account" className="flex border-none bg-transparent p-0" onClick={() => setModal({kind: "logout"})}>
                            <Avatar initials={(username ?? "?").slice(0, 1).toUpperCase()} size={34} />
                        </button>
                    </div>
                    <div className={track} style={{marginTop: 14, height: 6}}>
                        <div className={trackFill} style={{width: completedPercent + "%"}} />
                    </div>
                    <div className="mt-3.5 flex gap-[7px]">
                        {MOBILE_FILTERS.map(item => (
                            <button
                                className={btnClass(filter === item.key ? "primary" : "ghost", {sm: true})}
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
                <div className="border-b border-ln-line px-8 pt-6 pb-[18px] max-[820px]:hidden">
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-[24px] font-bold tracking-[-0.03em]">Tasks</h1>
                        <span className={pillSoft + " " + mono}>{formatToday()}</span>
                    </div>
                    <p className="mt-[5px] text-[14px] text-ln-ink-3">
                        <span className="font-semibold text-ln-ink-2">{activeTasks.length} active</span> · newest first
                    </p>
                    <div className="mt-[18px] flex items-center gap-3.5">
                        <div className={track + " flex-1"}>
                            <div className={trackFill} style={{width: completedPercent + "%"}} />
                        </div>
                        <span className={mono + " flex-none text-[12.5px] font-semibold whitespace-nowrap text-ln-ink-2"}>
                            {completedTasks.length}/{tasks.length} · {completedPercent}%
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 pt-3 pb-[90px] max-[820px]:px-3 max-[820px]:pt-1 max-[820px]:pb-[calc(110px+env(safe-area-inset-bottom,0))]">
                    {error && !isLoadFailed && (
                        <div className={errorBanner + " mx-3.5 mt-1 mb-2.5"}>
                            <AlertIcon size={16} />
                            <span>{error}</span>
                            <button
                                aria-label="Dismiss error"
                                className="ml-auto -mr-1 flex h-6 w-6 flex-none items-center justify-center rounded-md border-none bg-transparent p-0 text-[#a33833] hover:bg-[#f3d3d1]/60"
                                onClick={() => clearError()}
                                type="button"
                            >
                                <XIcon size={14} strokeWidth={2.2} />
                            </button>
                        </div>
                    )}
                    {renderList()}
                </div>
            </div>

            <button aria-label="New task" className={FAB_CLASS} onClick={() => setModal({kind: "new"})}>
                <PlusIcon size={24} strokeWidth={2.3} />
            </button>

            {modal?.kind === "new" && <NewTaskModal onClose={() => setModal(null)} />}
            {modal?.kind === "edit" && <EditTaskModal task={modal.task} onClose={() => setModal(null)} />}
            {modal?.kind === "logout" && <LogoutDialog onCancel={() => setModal(null)} onConfirm={logout} />}
        </div>
    );
});
