import classNames from "classnames/bind";
import React, { forwardRef, useState } from "react";
import Tippy from "~/components/Tippy";
import styles from "./InputNumber.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { Placement } from "tippy.js";

const cx = classNames.bind(styles);

interface Props {
    placeholder?: string;
    title?: string;
    errorMessage?: string;
    className?: string;
    onChange?: (...event: any[]) => void;
    value: string;
    description?: string;
    tooltipPlacement?: Placement;
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
    { errorMessage, title, placeholder, className, onChange, value = "", description, tooltipPlacement }: Props,
    ref,
) {
    const [localValue, setLocalValue] = useState<string>(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if ((!isNaN(+value) || value === "") && onChange) {
            onChange(e);
            setLocalValue(value);
        }
    };

    return (
        <section className={cx("input-field", className)}>
            <div className={cx("title")}>
                {title}
                {description && (
                    <Tippy placement={tooltipPlacement} render={<div>{description}</div>}>
                        <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                    </Tippy>
                )}
            </div>
            <div className={cx("input-wrapper")}>
                <input ref={ref} value={value} onChange={handleChange} placeholder={placeholder} className={cx("input", classNames)} />
            </div>
            <span className={cx("error-message")}>{errorMessage}</span>
        </section>
    );
});

export default InputNumber;
