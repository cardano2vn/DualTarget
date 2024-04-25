"use client";

import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { WalletType } from "~/types/GenericsType";
import icons from "~/assets/icons";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import styles from "./WalletItem.module.scss";

const cx = classNames.bind(styles);

type Props = {
    wallet: WalletType;
    accept: boolean;
};

const WalletItem = function ({ wallet, accept }: Props) {
    const [isDownload, setIsDownload] = useState<boolean>(true);
    const { connect, loading } = useContext<WalletContextType>(WalletContext);

    const handleConnectWallet = async function () {
        await connect({ api: wallet.api, name: wallet.name, image: wallet.image, checkApi: wallet.checkApi });
    };

    useEffect(() => {
        (async function () {
            setIsDownload(await wallet.checkApi());
        })();
    }, []);

    return (
        <div
            className={cx("wrapper", {
                accept: accept,
                isDownload: isDownload,
            })}
            onClick={handleConnectWallet}
        >
            <div className={cx("icon-wrapper")}>
                <Image className={cx("icon-image", { accept: accept })} src={wallet.image} alt={wallet.name} />
            </div>
            <div className={cx("inner")}>
                <div className={cx("name", { accept: accept })}>{wallet.name}</div>

                {!isDownload && (
                    <div className={cx("action")}>
                        <Link className={cx("action-link")} href={wallet.downloadApi as string} target="_blank">
                            Not installed
                            <Image className={cx("action-image")} src={icons.install} alt="install icons" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletItem;
