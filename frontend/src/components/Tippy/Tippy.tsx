"use client";

import React from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import TippyWrapper from "./TippyWrapper";
import { Placement } from "tippy.js";
import classNames from "classnames/bind";
import styles from "./Tippy.module.scss";

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
    render: React.ReactNode;
    placement?: Placement;
    interactive?: boolean;
    hideOnClick?: boolean;
    trigger?: string;
    className?: string;
    offset?: [number, number];
    onShow?: () => void;
    onHide?: () => void;
};

const Tippy = function ({
    children,
    onShow,
    onHide,
    offset,
    render,
    className,
    trigger = "mouseenter",
    placement = "top-start",
    hideOnClick = true,
    interactive = true,
}: Props) {
    return (
        <HeadlessTippy
            hideOnClick={hideOnClick}
            onShow={onShow}
            onHide={onHide}
            offset={offset}
            trigger={trigger}
            placement={placement}
            interactive={interactive}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <TippyWrapper className={cx(className)}>{render}</TippyWrapper>
                </div>
            )}
        >
            <div className={cx("children")}>{children}</div>
        </HeadlessTippy>
    );
};

export default Tippy;
