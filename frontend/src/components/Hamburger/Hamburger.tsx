import React, { useContext, useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Hamburger.module.scss";
import SidebarMenu from "~/components/SidebarMenu";
import { ModalContextType } from "~/types/contexts/ModalContextType";
import ModalContext from "~/contexts/components/ModalContext";

const cx = classNames.bind(styles);

const Hamburger = function () {
    const [open, setOpen] = useState<boolean>(false);
    const [hideX, setHideX] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setOpen((prev) => !prev);
    };

    useLayoutEffect(() => {
        const handleResponsiveSidebar = () => {
            if (window.innerWidth > 1365) setOpen(false);
        };

        window.addEventListener("resize", handleResponsiveSidebar);
    }, []);

    useLayoutEffect(() => {
        const handleHideX = () => {
            if (window.innerWidth <= 670) setHideX(true);
        };

        window.addEventListener("resize", handleHideX);
    }, []);

    return (
        <div>
            <button
                type="button"
                className={cx("wrapper", {
                    open: open,
                    hideX: open && hideX,
                })}
                onClick={handleOpenMenu}
            >
                <span className={cx("bar")} />
                <span className={cx("bar")} />
                <span className={cx("bar")} />
            </button>
            <SidebarMenu className={cx("sidebar-menu")} open={open} setOpen={setOpen} />
        </div>
    );
};

export default Hamburger;
