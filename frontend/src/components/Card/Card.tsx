import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import Gutter from "./Gutter";
import Title from "./Title";

const cx = classNames.bind(styles);

type Props = {
    icon: string | StaticImport;
    title: string;
    className?: string;
    children: React.ReactNode;
};

const Card = function ({ icon, title, className, children }: Props) {
    return (
        <Gutter className={cx(className)}>
            <Title icon={icon} title={title} />
            {children}
        </Gutter>
    );
};

export default Card;
