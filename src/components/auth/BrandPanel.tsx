import React from "react";
import {CheckIcon, CheckSmIcon, LockIcon} from "@/components/lane/icons";

const PREVIEW_ROWS = [
    {title: "Review JWT refresh logic", done: true},
    {title: "Ship task scoping to users", done: false},
    {title: "Reply to John re: API", done: false},
];

const BrandPreview = React.memo(() => (
    <div
        style={{
            background: "rgba(255,255,255,.10)",
            border: "1px solid rgba(255,255,255,.16)",
            borderRadius: 14,
            padding: 14,
            backdropFilter: "blur(8px)",
            boxShadow: "0 18px 50px rgba(20,18,60,.35)",
        }}
    >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: "0 2px"}}>
            <span style={{fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em"}}>Tasks</span>
            <span className="mono" style={{fontSize: 11, color: "rgba(255,255,255,.6)"}}>
                2 / 3
            </span>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: 4}}>
            {PREVIEW_ROWS.map((row, index) => (
                <div
                    key={row.title}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "9px 8px",
                        borderRadius: 9,
                        background: index === 1 ? "rgba(255,255,255,.10)" : "transparent",
                    }}
                >
                    <span
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 6,
                            flex: "none",
                            border: row.done ? "none" : "1.5px solid rgba(255,255,255,.45)",
                            background: row.done ? "#fff" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {row.done && <CheckSmIcon size={11} strokeWidth={2.6} style={{color: "#4a48c2"}} />}
                    </span>
                    <span
                        style={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            color: row.done ? "rgba(255,255,255,.55)" : "#fff",
                            textDecoration: row.done ? "line-through" : "none",
                            textDecorationColor: "rgba(255,255,255,.4)",
                        }}
                    >
                        {row.title}
                    </span>
                </div>
            ))}
        </div>
    </div>
));

export const BrandPanel = React.memo(() => (
    <div className="ln-auth-brand">
        {/* glow */}
        <div
            style={{
                position: "absolute",
                width: 360,
                height: 360,
                borderRadius: "50%",
                right: -120,
                top: -90,
                background: "radial-gradient(circle, rgba(255,255,255,.18), transparent 65%)",
            }}
        />
        <div style={{position: "relative"}}>
            <span style={{display: "inline-flex", alignItems: "center", gap: 9}}>
                <span className="ln-mark" style={{width: 30, height: 30, background: "#fff"}}>
                    <CheckIcon size={18} strokeWidth={2.7} style={{color: "var(--ln-accent)"}} />
                </span>
                <span style={{fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em", color: "#fff"}}>Lane</span>
            </span>
        </div>
        <div style={{position: "relative"}}>
            <h2 style={{fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.12, maxWidth: 340}}>
                Stay in your lane.
                <br />
                One list, every day.
            </h2>
            <p style={{fontSize: 15, color: "rgba(255,255,255,.72)", marginTop: 13, maxWidth: 320, lineHeight: 1.5}}>
                A private, focused task list. Your tasks are yours alone — scoped to your account, end to end.
            </p>
            <div style={{marginTop: 26}}>
                <BrandPreview />
            </div>
        </div>
        <div style={{position: "relative", display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "rgba(255,255,255,.6)"}}>
            <LockIcon size={14} /> Secured with token-based sign-in
        </div>
    </div>
));
