import React from "react";
import {Avatar, Logo} from "@/components/lane/atoms";
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
        <div className="ln-sidebar">
            <div style={{padding: "0 8px 16px"}}>
                <Logo size={26} text={18} />
            </div>
            <button className="ln-btn ln-btn-primary" onClick={onNewTask} style={{width: "100%", justifyContent: "flex-start", marginBottom: 18}}>
                <PlusIcon size={17} strokeWidth={2.1} /> New task
            </button>
            <div style={{display: "flex", flexDirection: "column", gap: 2}}>
                {NAV_ITEMS.map(({key, label, Icon}) => (
                    <button className={"ln-nav" + (key === filter ? " is-active" : "")} key={key} onClick={() => onFilterChange(key)}>
                        <Icon size={17} /> {label}
                        <span className="ln-navcount mono">{counts[key]}</span>
                    </button>
                ))}
            </div>
            <div style={{flex: 1}} />
            <div ref={menuRef}>
                {menuOpen && (
                    <div className="ln-account-pop">
                        <div style={{display: "flex", alignItems: "center", gap: 10, padding: "8px 9px 10px"}}>
                            <Avatar initials={displayName.slice(0, 1).toUpperCase()} size={36} />
                            <div style={{minWidth: 0}}>
                                <div style={{fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{displayName}</div>
                                <div className="mono" style={{fontSize: 11, color: "var(--ln-ink-4)", whiteSpace: "nowrap"}}>
                                    Signed in
                                </div>
                            </div>
                        </div>
                        <div style={{height: 1, background: "var(--ln-line)", margin: "2px 4px 6px"}} />
                        <button
                            className="ln-nav"
                            onClick={() => {
                                setMenuOpen(false);
                                onLogout();
                            }}
                            style={{color: "var(--ln-red)"}}
                        >
                            <LogoutIcon size={16} /> Log out
                        </button>
                    </div>
                )}
                <button className="ln-account-row" onClick={() => setMenuOpen(!menuOpen)}>
                    <Avatar initials={displayName.slice(0, 1).toUpperCase()} size={30} />
                    <div className="ln-account-name" style={{minWidth: 0, flex: 1}}>
                        {displayName}
                    </div>
                    <span style={{color: "var(--ln-ink-4)", display: "flex"}}>
                        <ChevronDownIcon size={15} />
                    </span>
                </button>
            </div>
        </div>
    );
});
