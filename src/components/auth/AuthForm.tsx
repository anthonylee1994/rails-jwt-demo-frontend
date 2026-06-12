import React from "react";
import {btnClass, errorBanner, field, hint, input, inputTrail, label, spin} from "@/components/lane/classes";
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
            <div className="mb-[26px]">
                <h1 className="text-[25px] font-bold tracking-[-0.03em]">{isLogin ? "Welcome back" : "Create your account"}</h1>
                <p className="mt-1.5 text-[15px] text-ln-ink-3">{isLogin ? "Sign in to pick up where you left off." : "Pick a username and password to get started."}</p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-[17px]">
                    <div className={field}>
                        <label className={label} htmlFor="username">
                            Username
                        </label>
                        <input autoComplete="username" autoFocus className={input} id="username" name="username" placeholder="Username" required />
                    </div>

                    <div className={field}>
                        <label className={label} htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                className={input}
                                id="password"
                                name="password"
                                placeholder="Password"
                                ref={passwordInputRef}
                                required
                                style={{paddingRight: 42}}
                                type={showPassword ? "text" : "password"}
                            />
                            <button aria-label={showPassword ? "Hide password" : "Show password"} className={inputTrail} onClick={() => setShowPassword(!showPassword)} type="button">
                                {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                            </button>
                        </div>
                        {!isLogin && <span className={hint}>Use at least 8 characters.</span>}
                    </div>

                    <button className={btnClass("primary", {block: true})} disabled={isSubmitting} style={{height: 44, marginTop: 4}} type="submit">
                        {isSubmitting ? (
                            <SpinnerIcon className={spin} size={17} />
                        ) : (
                            <React.Fragment>
                                {isLogin ? "Sign in" : "Create account"} <ArrowRightIcon size={17} strokeWidth={2} />
                            </React.Fragment>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div className={errorBanner + " mt-[18px]"}>
                    <AlertIcon size={16} />
                    <span>{error}</span>
                </div>
            )}

            <div className="my-[22px] flex items-center gap-3 text-[12.5px] text-ln-ink-4 before:h-px before:flex-1 before:bg-ln-border before:content-[''] after:h-px after:flex-1 after:bg-ln-border after:content-['']">
                <span>{isLogin ? "New to Lane?" : "Already registered?"}</span>
            </div>
            <button className={btnClass("ghost", {block: true})} onClick={onToggleMode} style={{height: 44}} type="button">
                {isLogin ? "Create an account" : "Sign in instead"}
            </button>
        </React.Fragment>
    );
});
