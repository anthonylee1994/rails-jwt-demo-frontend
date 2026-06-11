import React from "react";
import {AuthPage} from "@/pages/AuthPage";
import {TodoPage} from "@/pages/TodoPage";
import {useAuthStore} from "@/stores/authStore";

export const App = React.memo(() => {
    const token = useAuthStore(state => state.token);

    return <React.Fragment>{token ? <TodoPage /> : <AuthPage />}</React.Fragment>;
});
