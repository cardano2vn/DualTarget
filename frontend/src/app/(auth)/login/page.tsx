"use client";

import classNames from "classnames/bind";
import React from "react";
import styles from "./Login.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { useForm } from "react-hook-form";
import Toast from "~/components/Toast";
import { useRouter } from "next/navigation";
import Logo from "~/components/Logo";

const cx = classNames.bind(styles);

type LoginFormBody = {
    email: string;
    password: string;
};

const initialLoginFormBody: LoginFormBody = {
    email: "admin@dualtarget.xyz",
    password: "12345678",
};

const Login = function () {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormBody>({
        defaultValues: initialLoginFormBody,
    });

    const onSubmit = handleSubmit((data) => {});

    return (
        <section className={cx("wrapper")}>
            {Array(260)
                .fill(0)
                .map((_, index) => (
                    <span key={index} className={cx("box")} />
                ))}
            <div className={cx("signin")}>
                <div className={cx("content")}>
                    <div>
                        <Logo />
                    </div>
                    <h2 className={cx("form-title")}>Welcome back</h2>
                    <p className={cx("form-subtitle")}>Please sign in to continue</p>
                    <form className={cx("form")} onSubmit={onSubmit}>
                        <div className={cx("input-field")}>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                                        message: "Email is invalid",
                                    },
                                })}
                                className={cx("input")}
                                type="text"
                            />
                            <span className={cx("label")}>Username</span>
                        </div>
                        <div className={cx("error-message")}>{errors?.email?.message}</div>
                        <div className={cx("input-field")}>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Password must be at most 30 characters",
                                    },
                                })}
                                className={cx("input")}
                                type="password"
                            />
                            <span className={cx("label")}>Password</span>
                        </div>
                        <div className={cx("error-message")}>{errors?.password?.message}</div>
                        <div className={cx("links")}>
                            <button type="button" className={cx("fp-button")}>
                                Forgot Password
                            </button>
                        </div>
                        <div className={cx("input-field")}>
                            <input
                                disabled={false}
                                type="submit"
                                value={"Login"}
                                className={cx("login-button")}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
