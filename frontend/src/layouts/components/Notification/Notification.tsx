import React, { useState } from "react";
import classNames from "classnames/bind";
import { FaRegQuestionCircle } from "react-icons/fa";
import styles from "./Notification.module.scss";
import HelpCenter from "../HelpCenter";
import { useModal } from "~/hooks";

const cx = classNames.bind(styles);
type Props = {};

const Notification = function ({}: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpenWidget = () => {
        setOpen(true);
    };

    return (
        <>
            <button
                className={cx("wrapper", {
                    hide: open,
                })}
                onClick={handleOpenWidget}
            >
                <span className={cx("icon-wrapper")}>
                    <FaRegQuestionCircle className={cx("icon")} />
                </span>
                <span className={cx("label")}>Help</span>
            </button>
            <HelpCenter open={open} setOpen={setOpen} />
        </>
    );
};

export default Notification;
