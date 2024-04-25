import React, { Dispatch, SetStateAction, useContext, useState, useTransition } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarMenu.module.scss";
import NetworkSelector from "../NetworkSelector";
import { networks } from "~/constants/networks";
import { publicRoutes } from "~/routes/routes";
import HeaderOption from "~/layouts/components/Header/HeaderOption";
import configs from "~/configs";
import ConnectWallet from "~/layouts/components/ConnectWallet";
import TranslateContext from "~/contexts/components/TranslateContext";

const cx = classNames.bind(styles);

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    className?: string;
};

const SidebarMenu = function ({ open, setOpen, className }: Props) {
    const [selected, setSelected] = useState<string>(configs.routes.home);
    const { t } = useContext(TranslateContext);
    return (
        <div
            className={cx("wrapper", className, {
                open,
            })}
        >
            <ConnectWallet className={cx("connect-wallet-button")} />
            <NetworkSelector
                networks={networks}
                classNames={{
                    classNameWrapper: cx("network-selector-wrapper"),
                    classNameNetworkList: cx("network-selector"),
                }}
            />
            <nav className={cx("navbar")}>
                <ul className={cx("nav-list")}>
                    {publicRoutes.map(function ({ name, redirect }, index: number) {
                        return (
                            <HeaderOption
                                key={index}
                                name={t(`header.${name}`)}
                                redirect={redirect}
                                isActive={Boolean(selected === redirect)}
                                setSelectedRouter={setSelected}
                                className={cx("nav-item-link")}
                                setOpen={setOpen}
                            />
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;
