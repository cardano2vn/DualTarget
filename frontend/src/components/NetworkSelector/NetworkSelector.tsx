import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./NetworkSelector.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { networks } from "~/constants/networks";
import { NetworkType } from "~/types/GenericsType";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { Network } from "lucid-cardano";

const cx = classNames.bind(styles);

type Props = {
    networks: NetworkType[];
    classNames?: {
        classNameWrapper?: string;
        classNameNetworkList?: string;
        classNameArrow?: string;
    };
};

const NetworkSelector = function ({ networks, classNames }: Props) {
    const { network, setNetwork } = useContext<NetworkContextType>(NetworkContext);
    const [isShownNetworks, setIsShowNetworks] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = function () {
            if (isShownNetworks && window.innerWidth <= 1024) {
                setIsShowNetworks(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isShownNetworks]);

    const handleShowNetworks = function () {
        setIsShowNetworks((prev) => !prev);
    };

    const handleChooseNetwork = function (network: Network) {
        setNetwork(network);
    };
    return (
        <div className={cx("wrapper", classNames?.classNameWrapper)}>
            <div
                className={cx(
                    "network-selector",
                    {
                        active: isShownNetworks,
                    },
                    classNames?.classNameNetworkList,
                )}
                onClick={handleShowNetworks}
            >
                <span className={cx("current-network")}>{network}</span>
                <span className={cx("arrow-icon", classNames?.classNameArrow)}>
                    <Image src={icons.networkSelector} alt="arrow" />
                </span>
                <div
                    className={cx("cover_list-wrapper", {
                        show: isShownNetworks,
                    })}
                >
                    <ul className={cx("cover_list")}>
                        {networks.map(({ networkName }: NetworkType, index: number) =>
                            networkName === network ? null : (
                                <li key={index} className={cx("network")} onClick={() => handleChooseNetwork(networkName)}>
                                    {networkName}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NetworkSelector;
