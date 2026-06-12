/* Shared Tailwind class strings for the Lane design system. */

/* scope wrapper — typography baseline for every page root */
export const lane = "h-full font-sans text-[15px] text-ln-ink antialiased [text-rendering:optimizeLegibility] tracking-[-0.01em] leading-[1.45]";

/* numbers / metadata */
export const mono = "font-mono [font-feature-settings:'tnum'] tracking-[-0.02em]";

/* brand mark */
export const mark = "inline-flex flex-none items-center justify-center rounded-lg bg-ln-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(74,72,194,0.4)]";
export const wordmark = "font-bold tracking-[-0.03em] text-ln-ink";

/* avatar */
export const avatar =
    "inline-flex flex-none items-center justify-center rounded-full bg-[linear-gradient(150deg,#6d6ce0,#4a48c2)] font-bold text-white tracking-[-0.02em] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]";

/* buttons */
type BtnVariant = "primary" | "ghost" | "quiet" | "danger";

const BTN_VARIANTS: Record<BtnVariant, string> = {
    primary: "border-transparent bg-ln-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(74,72,194,0.35)] enabled:hover:bg-ln-accent-600",
    ghost: "border-ln-border-2 bg-ln-surface text-ln-ink shadow-ln-1 enabled:hover:bg-ln-subtle",
    quiet: "border-transparent bg-transparent text-ln-ink-2 enabled:hover:bg-ln-subtle",
    danger: "border-transparent bg-ln-red text-white enabled:hover:bg-[#c03c33]",
};

export function btnClass(variant: BtnVariant, opts?: {block?: boolean; sm?: boolean}): string {
    const parts = [
        "inline-flex items-center justify-center gap-[7px] border font-semibold tracking-[-0.01em] whitespace-nowrap [transition:background_0.14s,box-shadow_0.14s,border-color_0.14s] disabled:opacity-55",
        opts?.sm ? "h-8 rounded-md px-3 text-[13.5px]" : "h-10 rounded-ln-sm px-4 text-[14.5px]",
        BTN_VARIANTS[variant],
    ];

    if (opts?.block) {
        parts.push("w-full");
    }

    return parts.join(" ");
}

/* inputs */
export const field = "flex flex-col gap-[7px]";
export const label = "text-[13px] font-semibold text-ln-ink-2 tracking-[-0.01em]";
export const input =
    "h-11 w-full rounded-ln-sm border border-ln-border-2 bg-ln-surface px-3.5 text-[15px] text-ln-ink tracking-[-0.01em] [transition:border-color_0.14s,box-shadow_0.14s] placeholder:text-ln-ink-4 focus:border-ln-accent focus:shadow-[0_0_0_3.5px_rgba(91,91,214,0.3)] focus:outline-none";
export const hint = "text-[12.5px] text-ln-ink-3 tracking-[-0.005em]";
export const inputTrail =
    "absolute top-1/2 right-1.5 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-ln-sm border-none bg-transparent text-ln-ink-4 hover:bg-ln-subtle hover:text-ln-ink-2";

/* checkbox */
export function checkClass(done: boolean, interactive = false): string {
    const base =
        "flex h-[21px] w-[21px] flex-none items-center justify-center rounded-[6.5px] border-[1.5px] p-0 text-white [transition:background_0.14s,border-color_0.14s,transform_0.1s] [&_svg]:[transition:opacity_0.12s,scale_0.12s]";
    const state = done ? "border-ln-accent bg-ln-accent [&_svg]:scale-100 [&_svg]:opacity-100" : "border-ln-border-2 bg-ln-surface [&_svg]:scale-[0.6] [&_svg]:opacity-0";
    const hover = interactive ? (done ? " hover:bg-ln-accent-600" : " hover:border-ln-accent") : "";

    return base + " " + state + hover;
}

/* task row */
export const task = "flex w-full items-center gap-[13px] rounded-ln-md px-3.5 py-[13px] text-left [transition:background_0.12s] hover:bg-ln-subtle";

export function taskTitleClass(done: boolean): string {
    const base = "truncate text-[15px] tracking-[-0.015em]";

    return done ? base + " [font-weight:450] text-ln-ink-4 line-through decoration-ln-ink-4" : base + " font-medium text-ln-ink";
}

/* progress */
export const track = "h-[7px] overflow-hidden rounded-full bg-ln-subtle-2";
export const trackFill = "h-full rounded-full bg-ln-accent [transition:width_0.25s_ease]";

/* chips / pills */
const pill = "inline-flex h-6 items-center gap-1.5 rounded-full px-[9px] text-[12px] font-semibold tracking-[-0.01em] whitespace-nowrap";
export const pillSoft = pill + " bg-ln-subtle text-ln-ink-2";
export const pillAccent = pill + " bg-ln-accent-soft text-ln-accent-700";

/* card */
export const card = "rounded-ln-lg border border-ln-border bg-ln-surface shadow-ln-1";

/* sidebar nav item */
export function navClass(active = false): string {
    const base = "flex h-9 w-full items-center gap-[11px] rounded-lg px-[11px] text-left text-[14px] whitespace-nowrap [transition:background_0.12s,color_0.12s] [&_svg]:flex-none";

    return active ? base + " bg-ln-accent-soft font-semibold text-ln-accent-700" : base + " font-medium text-ln-ink-2 hover:bg-ln-subtle hover:text-ln-ink";
}

export function navCountClass(active = false): string {
    return "ml-auto text-[12px] font-semibold " + mono + (active ? " text-ln-accent" : " text-ln-ink-4");
}

/* skeleton shimmer */
export const skel = "animate-ln-shimmer rounded-md bg-[linear-gradient(90deg,var(--color-ln-subtle)_0%,var(--color-ln-subtle-2)_40%,var(--color-ln-subtle)_80%)] bg-[length:720px_100%]";

/* spinner */
export const spin = "animate-ln-spin";

/* error banner */
export const errorBanner =
    "flex items-start gap-[9px] rounded-[9px] border border-[#f3d3d1] bg-ln-red-soft px-[13px] py-[11px] text-[13px] leading-[1.45] text-[#a33833] [&_svg]:mt-[1px] [&_svg]:flex-none [&_svg]:text-ln-red";

/* modal */
export const modalTitleInput = "w-full border-none bg-transparent px-0 py-1.5 text-[21px] font-semibold text-ln-ink tracking-[-0.025em] outline-none placeholder:text-ln-ink-4";
export const modalFooter = "flex items-center justify-between border-t border-ln-line bg-ln-canvas px-[18px] py-[13px] max-[640px]:pb-[calc(13px+env(safe-area-inset-bottom,0px))]";
export const kbd = mono + " rounded-[5px] bg-ln-subtle-2 px-1.5 py-0.5";
