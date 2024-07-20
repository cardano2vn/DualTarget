"use client";

import React, { Children, useState } from "react";
import classNames from "classnames/bind";
import styles from "./GuideItem.module.scss";

const cx = classNames.bind(styles);

type Props = {
    title?: string;
    Children: () => JSX.Element;
};

const FaqItem = function ({ title, Children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = function () {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cx("wrapper", { isOpen: isOpen })}>
            <header className={cx("inner")}>
                <section className={cx("icon", { isOpen: isOpen })} />
                <section className={cx("title-wrapper")} onClick={handleOpen}>
                    <h3 className={cx("title")}>{title}</h3>
                </section>
                {isOpen && (
                    <section className={cx("container")}>
                        <Children />
                    </section>
                )}
            </header>
        </div>
    );
};

export default FaqItem;
