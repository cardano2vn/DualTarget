"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import styles from "./Form.module.scss";
import Logo from "~/components/Logo";
import { useForm } from "react-hook-form";

type FormData = Pick<any, "from" | "to" | "text">;
const initialFormData: FormData = {
    from: "",
    text: "",
    to: "",
};

const cx = classNames.bind(styles);

const HotDeal = function () {
    const [open, setOpen] = useState<boolean>(true);

    const closeHotDeal = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: initialFormData,
    });

    const onSubmit = handleSubmit((body) => {
        setOpen(false);
    });

    return (
        <div
            className={cx("overlay", {
                open,
            })}
        >
            <div className={cx("wrapper")}>
                <div className={cx("signin")}>
                    <div className={cx("content")}>
                        <div className={cx("close-button")} onClick={closeHotDeal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={cx("icon-close")}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <Logo />
                        <h2 className={cx("form-title")}>Join the waitlist</h2>
                        <p className={cx("form-subtitle")}>Get first to be airdropped and notified first for any future benefits</p>
                        <form className={cx("form")} onSubmit={onSubmit}>
                            <div className={cx("input-field")}>
                                <input
                                    placeholder="Full name"
                                    {...register("text", {
                                        required: {
                                            value: true,
                                            message: "Please enter a full name",
                                        },
                                    })}
                                    className={cx("input")}
                                />
                                <span className={cx("label")}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={cx("input-icon")}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className={cx("error-message")}>{}</div>
                            <div className={cx("input-field")}>
                                <input
                                    placeholder="Email"
                                    {...register("from", {
                                        required: {
                                            value: true,
                                            message: "Please enter your email",
                                        },
                                        pattern: {
                                            value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                                            message: "Email is invalid",
                                        },
                                    })}
                                    className={cx("input")}
                                    type="text"
                                />
                                <span className={cx("label")}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={cx("input-icon")}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className={cx("error-message")}>{""}</div>

                            <div className={cx("input-field")}>
                                <input disabled={false} type="submit" value={"Confirm"} className={cx("confirm-button")} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotDeal;
