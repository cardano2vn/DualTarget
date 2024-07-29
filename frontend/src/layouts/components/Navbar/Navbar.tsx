"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import icon from "~/assets/icons";
import styles from "./Navbar.module.scss";
import ConnectWallet from "~/layouts/components/ConnectWallet";
import Image from "next/image";
import { useScroll } from "~/hooks";
import { ModalContextType } from "~/types/contexts/ModalContextType";
import ModalContext from "~/contexts/components/ModalContext";
import NetworkSelector from "~/components/NetworkSelector";
import { networks } from "~/constants/networks";

const cx = classNames.bind(styles);

const Navbar = function () {
    const [isScrolled] = useScroll({ offset: 0 });

    const { toggleShowingSidebar } = useContext<ModalContextType>(ModalContext);

    return (
        <div
            className={cx("wrapper", {
                scrolled: isScrolled,
            })}
        >
            <div className={cx("left")}>
                <button
                    onClick={toggleShowingSidebar}
                    type="button"
                    className={cx("sidebar-toggle")}
                >
                    <Image className={cx("image")} src={icon.menu} alt="" />
                </button>
                {/* <h3 className={cx("title")}>Admin</h3> */}
                <NetworkSelector
                    networks={networks}
                    classNames={{
                        classNameWrapper: cx("network-wrapper"),
                        classNameArrow: cx("network-arrow-icon"),
                        classNameNetworkList: cx("network-selector"),
                    }}
                />
            </div>
            <div className={cx("right")}>
                <ConnectWallet />
            </div>
        </div>
    );
};

export default Navbar;
