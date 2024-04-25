"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification";
import { usePathname } from "next/navigation";
type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);

const PublicLayout = function ({ children }: Props) {
    const pathName = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");

    useEffect(() => {
        setSelectedRouter(pathName || "/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName]);

    return (
        <main className={cx("wrapper")}>
            <Header selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
            <div>{children}</div>
            <Notification />
            <Footer />
        </main>
    );
};

export default PublicLayout;
