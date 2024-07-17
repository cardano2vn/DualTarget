import classNames from "classnames/bind";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./HelpCenter.module.scss";
import FileUploader from "../FileUploader";
import TextBox from "~/components/TextBox";
import { useForm } from "react-hook-form";
import { Widget, widgetSchema } from "~/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";

const cx = classNames.bind(styles);

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const HelpCenter = function ({ open, setOpen }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Widget>({
        resolver: yupResolver(widgetSchema),
    });
    const [isSent, setIsSent] = useState<boolean>(false);
    const buttonSubmitRef = useRef<HTMLButtonElement>(null);

    const onSubmit = handleSubmit((data) => {});

    const triggerSubmit = function () {
        buttonSubmitRef.current?.click();
    };

    const handleCloseWidget = () => {
        setOpen(false);
    };

    return (
        <div
            className={cx("widget", {
                open,
            })}
        >
            <header className={cx("header")}>
                <div className={cx("widget-title")}>Leave us a message</div>
                <button
                    type="button"
                    aria-label="Minimize widget"
                    className={cx("close-widget-button")}
                    onClick={handleCloseWidget}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        focusable="false"
                        viewBox="0 0 16 16"
                        className={cx("close-icon")}
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth={2}
                            d="M3 8h10"
                        />
                    </svg>
                </button>
            </header>
            <div className={cx("form-wrapper")}>
                <form className={cx("form")} onSubmit={onSubmit}>
                    <main className={cx("form-contact")}>
                        <TextBox title="Your name" optional name="name" register={register} />
                        <TextBox
                            title="Email address"
                            name="email"
                            defaultValue=""
                            register={register}
                            message={errors.email?.message}
                            classNameWrapper={cx("input")}
                        />
                        <TextBox
                            title="How we can help you?"
                            name="message"
                            register={register}
                            message={errors.message?.message}
                            classNameWrapper={cx("input")}
                            isTextArea
                            rows={5}
                        />
                        <FileUploader />
                        <button type="submit" hidden ref={buttonSubmitRef} />
                    </main>
                </form>
            </div>
            <footer className={cx("submit-action")}>
                <button className={cx("submit")} onClick={triggerSubmit}>
                    Send
                </button>
            </footer>
        </div>
    );
};

export default HelpCenter;
