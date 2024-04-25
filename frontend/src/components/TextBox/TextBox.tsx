import classNames from "classnames/bind";
import React from "react";
import styles from "./TextBox.module.scss";
import { UseFormRegister } from "react-hook-form";

const cx = classNames.bind(styles);

type Props = {
    title: string;
    message?: string;
    optional?: boolean;
    classNameWrapper?: string;
    type?: string;
    isTextArea?: boolean;
    name: string;
    register?: UseFormRegister<any>;
    [key: string]: any;
};

function TextBox({ title, isTextArea = false, register, classNameWrapper, name, message, optional = false, ...rest }: Props) {
    let Component: any = isTextArea ? "textarea" : "input";
    const registerField = register && name ? register(name) : null;

    return (
        <div className={cx("wrapper", classNameWrapper)}>
            <div className={cx("title")}>
                <strong>{title}</strong>
                {optional && <span>&nbsp;(optional)</span>}
            </div>
            <div className={cx("field")}>
                <Component
                    {...registerField}
                    {...rest}
                    className={cx("textbox", {
                        invalid: Boolean(message),
                    })}
                />
                {message && !optional && (
                    <span className={cx("error-message")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            focusable="false"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                            data-garden-id="forms.input_message_icon"
                            data-garden-version="8.49.4"
                            className={cx("invalid-icon")}
                        >
                            <g fill="none" stroke="currentColor">
                                <circle cx="7.5" cy="8.5" r={7} />
                                <path strokeLinecap="round" d="M7.5 4.5V9" />
                            </g>
                            <circle cx="7.5" cy={12} r={1} fill="currentColor" />
                        </svg>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
}

export default TextBox;
