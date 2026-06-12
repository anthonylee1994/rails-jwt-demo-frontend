import React from "react";
import {btnClass, card} from "@/components/lane/classes";
import {IconBubble} from "@/components/lane/IconBubble";
import {AlertIcon} from "@/components/lane/icons";

interface Props {
    message: string;
    onRetry(): void;
}

export const ErrorCard = React.memo<Props>(({message, onRetry}) => (
    <div className="flex min-h-[360px] items-center justify-center p-8">
        <div className={card + " w-[420px] max-w-full p-7 text-center"} style={{boxShadow: "var(--shadow-ln-2)", borderRadius: 18}}>
            <IconBubble className="mx-auto mb-4" icon={<AlertIcon className="text-ln-red" size={24} />} size={52} tone="red" />
            <h2 className="text-[21px] font-bold tracking-tight">Couldn't load your tasks</h2>
            <p className="mt-2 text-[14.5px] leading-[1.55] text-ln-ink-3">{message}</p>
            <button className={btnClass("primary", {block: true})} onClick={onRetry} style={{height: 44, marginTop: 20}}>
                Retry
            </button>
        </div>
    </div>
));
