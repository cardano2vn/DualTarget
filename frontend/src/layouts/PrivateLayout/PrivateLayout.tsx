"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PrivateLayout.module.scss";
import Sidebar from "~/layouts/components/Sidebar";
import Navbar from "~/layouts/components/Navbar";
import { usePathname } from "next/navigation";
import configs from "~/configs";

const cx = classNames.bind(styles);

type Props = {
    children: ReactNode;
};

const PrivateLayout = function ({ children }: Props) {
    const pathname = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("home");
    useEffect(() => {
        const router = pathname.replace("/admin/", "");

        if (router === configs.routes.private.home) {
            setSelectedRouter("home");
        } else {
            setSelectedRouter(router);
        }
    }, [pathname]);

    return (
        <main className={cx("wrapper")}>
            <Sidebar selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
            <div className={cx("main")}>
                <Navbar />
                {children}
            </div>
        </main>
    );
};

export default PrivateLayout;
