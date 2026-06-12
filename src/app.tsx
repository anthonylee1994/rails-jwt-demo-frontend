import React from "react";
import {AuthPage} from "@/pages/AuthPage";
import {TodoPage} from "@/pages/TodoPage";
import {useAuthStore} from "@/stores/authStore";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export const App = React.memo(() => {
    const token = useAuthStore(state => state.token);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={token ? <TodoPage /> : <AuthPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
});
