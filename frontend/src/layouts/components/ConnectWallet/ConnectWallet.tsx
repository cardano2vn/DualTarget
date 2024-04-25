"use client";

import React, { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classNames from "classnames/bind";
import Modal from "~/components/Modal";
import icons from "~/assets/icons";
import configs from "~/configs";
import styles from "./ConnectWallet.module.scss";
import wallets from "~/constants/wallets";
import { ToastType, WalletType } from "~/types/GenericsType";
import WalletItem from "~/components/WalletItem";
import Button from "~/components/Button";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import convertString from "~/helpers/convert-string";
import images from "~/assets/images";
import Tippy from "~/components/Tippy";
import { NetworkContextType } from "~/types/contexts/NetworkContextType";
import NetworkContext from "~/contexts/components/NetworkContext";
import { ModalContextType } from "~/types/contexts/ModalContextType";
import ModalContext from "~/contexts/components/ModalContext";
import Toast from "~/components/Toast";
import { ToastContextType } from "~/types/contexts/ToastContextType";
import ToastContext from "~/contexts/components/ToastContext";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
};

const ConnectWallet = function ({ className }: Props) {
    const { isShowingErrorNetwork, toogleErrorNetwork, isShowingWallet, toggleShowingWallet, isShowingTestNetwork, toggleTestNetwork } =
        useContext<ModalContextType>(ModalContext);
    const { toasts } = useContext<ToastContextType>(ToastContext);
    const { network } = useContext<NetworkContextType>(NetworkContext);
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { wallet, disconnect } = useContext<WalletContextType>(WalletContext);
    const [accept, setAccept] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isShowTippy, setIsShowTippy] = useState<boolean>(false);

    const handleAccept = function (event: ChangeEvent<HTMLInputElement>) {
        setAccept(event.target.checked);
    };

    return (
        <div className={cx("wrapper", className)}>
            <Tippy
                onHide={() => setIsShowTippy(false)}
                onShow={() => setIsShowTippy(lucid ? true : false)}
                offset={[0, 0]}
                className={cx("tippy-wallet")}
                trigger="click"
                interactive
                placement="bottom-start"
                render={
                    <div>
                        {wallet && (
                            <section className={cx("wallet-open")}>
                                <div className={cx("top-wallet")}>
                                    <div className={cx("icon-wallet")}>
                                        <Image className={cx("icon-wallet-image")} src={wallet?.image} alt="" />
                                    </div>
                                    <div className={cx("data-wallet")}>
                                        <div className={cx("data-wallet-top")}>
                                            <p className={cx("data-wallet-top-name")}>{wallet.name}</p>
                                            <p className={cx("data-wallet-top-network")}>
                                                <span className={cx("dot")}></span>
                                                {network}
                                            </p>
                                        </div>
                                        <div className={cx("data-wallet-address")}>
                                            {convertString({ inputString: String(wallet.address), numberOfFirstChar: 13, numberOfLastChar: -16 })}
                                            <Tippy
                                                hideOnClick={false}
                                                placement={"top-end"}
                                                render={isCopied ? <div>Copied.</div> : <div>Copy to clipboard.</div>}
                                            >
                                                <CopyToClipboard onCopy={() => setIsCopied(true)} text={wallet?.address as string}>
                                                    <Image className={cx("icon-help-circle")} src={icons.copy} width={18} height={18} alt="" />
                                                </CopyToClipboard>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("item-wallet")}>
                                    <section className={cx("item-icon")}>
                                        <Image className={cx("item-icon-image")} src={images.ada} alt="" />
                                    </section>
                                    <section className={cx("item-data")}>
                                        <div className={cx("item-data-name")}>
                                            <p className={cx("item-data-name-symbol")}>ADA</p>
                                            <p className={cx("item-data-name-description")}>Cardano</p>
                                        </div>
                                        <div className={cx("data-number")}>{wallet?.balance}</div>
                                    </section>
                                </div>
                                <div className={cx("item-wallet")}>
                                    <section className={cx("item-icon")}>
                                        <Image className={cx("item-icon-image")} src={images.djed} alt="" />
                                    </section>
                                    <section className={cx("item-data")}>
                                        <div className={cx("item-data-name")}>
                                            <p className={cx("item-data-name-symbol")}>ADA</p>
                                            <p className={cx("item-data-name-description")}>Cardano</p>
                                        </div>
                                        <div className={cx("data-number")}>{wallet?.balance}</div>
                                    </section>
                                </div>
                                <div className={cx("item-wallet")}>
                                    <section className={cx("item-icon")}>
                                        <Image className={cx("item-icon-image")} src={images.shen} alt="" />
                                    </section>
                                    <section className={cx("item-data")}>
                                        <div className={cx("item-data-name")}>
                                            <p className={cx("item-data-name-symbol")}>ADA</p>
                                            <p className={cx("item-data-name-description")}>Cardano</p>
                                        </div>
                                        <p className={cx("data-number")}>{wallet?.balance}</p>
                                    </section>
                                </div>
                                <div onClick={disconnect} className={cx("disconnect")}>
                                    Disconnect
                                </div>
                            </section>
                        )}
                    </div>
                }
            >
                <Button
                    onClick={toggleShowingWallet}
                    className={cx("connect-wallet-button", {
                        "wallet-show": isShowTippy,
                        isShowingErrorNetwork: isShowingErrorNetwork,
                    })}
                >
                    {lucid ? (
                        <div>
                            <section className={cx("connected-wallet-container")}>
                                <div className={cx("connected-wallet-total-ada")}>
                                    {wallet?.balance && wallet.balance.toFixed(6)} {" ₳"}
                                </div>

                                <div className={cx("connected-wallet-image-container")}>
                                    <Image className={cx("connected-wallet-image")} src={wallet?.image} alt="image-connected" />
                                </div>
                                <div className={cx("connected-wallet-address")}>
                                    {convertString({ inputString: String(wallet?.address), numberOfFirstChar: 7, numberOfLastChar: -6 })}
                                </div>
                                <div className={cx("connected-wallet-icon-container")}>
                                    <Image className={cx("connected-wallet-icon")} src={icons.arrowBottom} alt="" />
                                </div>
                            </section>
                        </div>
                    ) : (
                        <span>{isShowingErrorNetwork ? "Wrong Network" : "Connect Wallet"}</span>
                    )}
                </Button>
            </Tippy>

            {toasts.map(function (toast: ToastType, index: number) {
                return <Toast key={index} message={toast.message} icon={toast.icon} />;
            })}

            {!lucid && (
                <Modal isShowing={isShowingWallet} toggle={toggleShowingWallet}>
                    <div className={cx("connect-wallet-wrapper")}>
                        <section onClick={toggleShowingWallet} className={cx("connect-wallet-close")}>
                            <Image className={cx("connect-wallet-close-icon")} src={icons.close} alt="" />
                        </section>
                        <section className={cx("connect-wallet-title")}>
                            <h1>Connect Wallet</h1>
                        </section>
                        <section className={cx("connect-wallet-accept")}>
                            <div className={cx("connect-wallet-input")}>
                                <input onChange={handleAccept} type="checkbox" placeholder="" className={cx("connect-wallet-checkbox")} />
                            </div>
                            <label className={cx("connect-wallet-input")} htmlFor="">
                                By checking this box and connecting my wallet, I confirm that I have read, understood, and agreed to the
                                <Link className={cx("connect-wallet-input-link")} target="_blank" href={configs.routes.term}>
                                    Terms and Conditions
                                </Link>
                                .
                            </label>
                        </section>
                        <section className={cx("connect-wallet-container")}>
                            {wallets.map(function (wallet: WalletType, index: number) {
                                return <WalletItem wallet={wallet} key={index} accept={accept} />;
                            })}
                        </section>
                    </div>
                </Modal>
            )}

            <Modal toggle={toogleErrorNetwork} isShowing={isShowingErrorNetwork}>
                <div className={cx("connect-wallet-error-wrapper")}>
                    <h2 className={cx("connect-wallet-error-title")}>Wallet Network Error</h2>
                    <p className={cx("connect-wallet-error-description")}>Please change the network to preprod or disconnect</p>
                    <div className={cx("connect-wallet-error-button-wrapper")}>
                        <Button onClick={disconnect} className={cx("connect-wallet-error-button")}>
                            Disconnect
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ConnectWallet;
