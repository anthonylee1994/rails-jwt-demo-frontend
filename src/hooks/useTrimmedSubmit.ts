import React from "react";

/**
 * Shared logic for the "Enter to submit" / "disable button when blank" pattern
 * used by NewTaskModal and EditTaskModal.
 *
 * Returns:
 *   - `trimmed`   — `value.trim()` (precomputed, stable reference when value is unchanged-trimmed)
 *   - `handleKeyDown` — Enter key handler that calls `onSubmit(trimmed)` only when `trimmed` is non-empty
 *   - `isDisabled` — true when `trimmed` is empty (mirrors the original `!name.trim()` button-disabled flag)
 *
 * The hook deliberately does NOT close any modal, clear any state, or otherwise mutate the
 * caller.  The caller receives the trimmed value and decides what to do (e.g. await a
 * store mutation and only close on success).
 */
export function useTrimmedSubmit(opts: {
    value: string;
    onSubmit: (trimmed: string) => void | Promise<void>;
}): {
    trimmed: string;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    isDisabled: boolean;
} {
    const trimmed = opts.value.trim();
    const onSubmit = opts.onSubmit;

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Enter") {
                const current = opts.value.trim();

                if (current) {
                    onSubmit(current);
                }
            }
        },
        [opts.value, onSubmit]
    );

    return {trimmed, handleKeyDown, isDisabled: !trimmed};
}
