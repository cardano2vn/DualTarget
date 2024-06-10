import images from "~/assets/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Logo = function ({}: Props) {
    return (
        <Link href={"/"} className={cx("wrapper")}>
            <Image src={images.logo} alt="" className={cx("image")} />
        </Link>
    );
};

export default Logo;
