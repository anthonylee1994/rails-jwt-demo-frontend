import React from "react";
import {mark, mono} from "@/components/lane/classes";
import {CheckIcon, CheckSmIcon, LockIcon} from "@/components/lane/icons";

const PREVIEW_ROWS = [
    {title: "Review JWT refresh logic", done: true},
    {title: "Ship task scoping to users", done: false},
    {title: "Reply to John re: API", done: false},
];

const BrandPreview = React.memo(() => (
    <div className="rounded-ln-lg border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.10)] p-3.5 shadow-[0_18px_50px_rgba(20,18,60,0.35)] backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between px-0.5">
            <span className="text-[13px] font-bold text-white tracking-[-0.01em]">Tasks</span>
            <span className={mono + " text-[11px] text-[rgba(255,255,255,0.6)]"}>2 / 3</span>
        </div>
        <div className="flex flex-col gap-1">
            {PREVIEW_ROWS.map((row, index) => (
                <div className={"flex items-center gap-[11px] rounded-[9px] px-2 py-[9px]" + (index === 1 ? " bg-[rgba(255,255,255,0.10)]" : "")} key={row.title}>
                    <span
                        className={
                            "flex h-[18px] w-[18px] flex-none items-center justify-center rounded-md " + (row.done ? "bg-white" : "border-[1.5px] border-[rgba(255,255,255,0.45)] bg-transparent")
                        }
                    >
                        {row.done && <CheckSmIcon className="text-ln-accent-700" size={11} strokeWidth={2.6} />}
                    </span>
                    <span className={"text-[13.5px] font-medium " + (row.done ? "text-[rgba(255,255,255,0.55)] line-through decoration-[rgba(255,255,255,0.4)]" : "text-white")}>{row.title}</span>
                </div>
            ))}
        </div>
    </div>
));

export const BrandPanel = React.memo(() => (
    <div className="relative flex w-[520px] flex-none flex-col justify-between overflow-hidden bg-[radial-gradient(120%_90%_at_12%_8%,#6a68e6_0%,#5453cf_38%,#3f3da8_100%)] px-[42px] py-11 max-[980px]:hidden">
        {/* glow */}
        <div className="absolute top-[-90px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)]" />
        <div className="relative">
            <span className="inline-flex items-center gap-[9px]">
                <span className={mark} style={{width: 30, height: 30, background: "#fff"}}>
                    <CheckIcon className="text-ln-accent" size={18} strokeWidth={2.7} />
                </span>
                <span className="text-[20px] font-bold text-white tracking-[-0.03em]">Lane</span>
            </span>
        </div>
        <div className="relative">
            <h2 className="max-w-[340px] text-[30px] leading-[1.12] font-bold text-white tracking-[-0.035em]">
                Stay in your lane.
                <br />
                One list, every day.
            </h2>
            <p className="mt-[13px] max-w-[320px] text-[15px] leading-normal text-[rgba(255,255,255,0.72)]">
                A private, focused task list. Your tasks are yours alone — scoped to your account, end to end.
            </p>
            <div className="mt-[26px]">
                <BrandPreview />
            </div>
        </div>
        <div className="relative flex items-center gap-2 text-[12.5px] text-[rgba(255,255,255,0.6)]">
            <LockIcon size={14} /> Secured with token-based sign-in
        </div>
    </div>
));
