import React from "react";
import {AlertIcon, ArrowRightIcon, EyeIcon, EyeOffIcon, SpinnerIcon} from "@/components/lane/icons";

interface Props {
    error: string | null;
    isLogin: boolean;
    isSubmitting: boolean;
    passwordInputRef: React.RefObject<HTMLInputElement | null>;
    onSubmit(event: React.SubmitEvent<HTMLFormElement>): void;
    onToggleMode(): void;
}

export const AuthForm = React.memo<Props>(({error, isLogin, isSubmitting, passwordInputRef, onSubmit, onToggleMode}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <React.Fragment>
            <div style={{marginBottom: 26}}>
                <h1 style={{fontSize: 25, fontWeight: 700, letterSpacing: "-0.03em"}}>{isLogin ? "Welcome back" : "Create your account"}</h1>
                <p style={{fontSize: 15, color: "var(--ln-ink-3)", marginTop: 6}}>{isLogin ? "Sign in to pick up where you left off." : "Pick a username and password to get started."}</p>
            </div>

            <form onSubmit={onSubmit}>
                <div style={{display: "flex", flexDirection: "column", gap: 17}}>
                    <div className="ln-field">
                        <label className="ln-label" htmlFor="username">
                            Username
                        </label>
                        <input autoComplete="username" autoFocus className="ln-input" id="username" name="username" placeholder="Username" required />
                    </div>

                    <div className="ln-field">
                        <label className="ln-label" htmlFor="password">
                            Password
                        </label>
                        <div style={{position: "relative"}}>
                            <input
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                className="ln-input"
                                id="password"
                                name="password"
                                placeholder="Password"
                                ref={passwordInputRef}
                                required
                                style={{paddingRight: 42}}
                                type={showPassword ? "text" : "password"}
                            />
                            <button aria-label={showPassword ? "Hide password" : "Show password"} className="ln-input-trail" onClick={() => setShowPassword(!showPassword)} type="button">
                                {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                            </button>
                        </div>
                        {!isLogin && <span className="ln-hint">Use at least 8 characters.</span>}
                    </div>

                    <button className="ln-btn ln-btn-primary ln-btn-block" disabled={isSubmitting} style={{height: 44, marginTop: 4}} type="submit">
                        {isSubmitting ? (
                            <SpinnerIcon className="ln-spin" size={17} />
                        ) : (
                            <React.Fragment>
                                {isLogin ? "Sign in" : "Create account"} <ArrowRightIcon size={17} strokeWidth={2} />
                            </React.Fragment>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div className="ln-error-banner" style={{marginTop: 18}}>
                    <AlertIcon size={16} />
                    <span>{error}</span>
                </div>
            )}

            <div className="ln-auth-divider">
                <span>{isLogin ? "New to Lane?" : "Already registered?"}</span>
            </div>
            <button className="ln-btn ln-btn-ghost ln-btn-block" onClick={onToggleMode} style={{height: 44}} type="button">
                {isLogin ? "Create an account" : "Sign in instead"}
            </button>
        </React.Fragment>
    );
});
