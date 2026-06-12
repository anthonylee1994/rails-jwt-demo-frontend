import React from "react";
import {Avatar, Logo} from "@/components/lane/atoms";
import {btnClass, mono, navClass, navCountClass} from "@/components/lane/classes";
import {CheckIcon, ChevronDownIcon, InboxIcon, LogoutIcon, PlusIcon, UpcomingIcon} from "@/components/lane/icons";
import type {TaskFilter} from "@/types/TaskFilter";

interface Props {
    counts: Record<TaskFilter, number>;
    filter: TaskFilter;
    username: string | null;
    onFilterChange(filter: TaskFilter): void;
    onLogout(): void;
    onNewTask(): void;
}

const NAV_ITEMS = [
    {key: "all", label: "All tasks", Icon: InboxIcon},
    {key: "active", label: "Active", Icon: UpcomingIcon},
    {key: "completed", label: "Completed", Icon: CheckIcon},
] as const;

export const Sidebar = React.memo<Props>(({counts, filter, username, onFilterChange, onLogout, onNewTask}) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [menuOpen]);

    const displayName = username ?? "account";

    return (
        <div className="relative flex w-[248px] flex-none flex-col border-r border-ln-border bg-ln-canvas px-3.5 pt-5 pb-3.5 max-[820px]:hidden">
            <div className="px-2 pb-4">
                <Logo size={26} text={18} />
            </div>
            <button className={btnClass("primary")} onClick={onNewTask} style={{width: "100%", justifyContent: "flex-start", marginBottom: 18}}>
                <PlusIcon size={17} strokeWidth={2.1} /> New task
            </button>
            <div className="flex flex-col gap-0.5">
                {NAV_ITEMS.map(({key, label, Icon}) => (
                    <button className={navClass(key === filter)} key={key} onClick={() => onFilterChange(key)}>
                        <Icon size={17} /> {label}
                        <span className={navCountClass(key === filter)}>{counts[key]}</span>
                    </button>
                ))}
            </div>
            <div className="flex-1" />
            <div ref={menuRef}>
                {menuOpen && (
                    <div className="absolute right-3.5 bottom-[66px] left-3.5 z-30 rounded-[13px] border border-ln-border bg-ln-surface p-1.5 shadow-ln-3">
                        <div className="flex items-center gap-2.5 px-[9px] pt-2 pb-2.5">
                            <Avatar initials={displayName.slice(0, 1).toUpperCase()} size={36} />
                            <div className="min-w-0">
                                <div className="truncate text-[14px] font-bold">{displayName}</div>
                                <div className={mono + " text-[11px] whitespace-nowrap text-ln-ink-4"}>Signed in</div>
                            </div>
                        </div>
                        <div className="mx-1 mt-0.5 mb-1.5 h-px bg-ln-line" />
                        <button
                            className={navClass()}
                            onClick={() => {
                                setMenuOpen(false);
                                onLogout();
                            }}
                            style={{color: "var(--color-ln-red)"}}
                        >
                            <LogoutIcon size={16} /> Log out
                        </button>
                    </div>
                )}
                <button
                    className="flex w-full items-center gap-2.5 rounded-ln-md border border-ln-border bg-ln-surface px-2 py-[9px] text-left [transition:background_0.12s] hover:bg-ln-subtle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Avatar initials={displayName.slice(0, 1).toUpperCase()} size={30} />
                    <div className="min-w-0 flex-1 truncate text-[13.5px] font-semibold">{displayName}</div>
                    <span className="flex text-ln-ink-4">
                        <ChevronDownIcon size={15} />
                    </span>
                </button>
            </div>
        </div>
    );
});
