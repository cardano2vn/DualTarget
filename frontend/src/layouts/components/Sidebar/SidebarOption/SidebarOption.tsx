import React, { memo } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import Link from "next/link";
import { IconType } from "react-icons";
import styles from "./SidebarOption.module.scss";

const cx = classNames.bind(styles);

type Props = {
    isActive?: boolean;
    redirect: string;
    name: string;
    Icon: IconType;
    setSelected?: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarOption = function ({ name, redirect, isActive, Icon, setSelected }: Props) {
    const router = useRouter();

    const handleClick = function (content = name) {
        if (setSelected && redirect) {
            setSelected(content);
            router.push(redirect);
        } else {
            return;
        }
    };

    return (
        <li className={cx("wrapper")}>
            <Link
                onClick={() => {
                    handleClick(name);
                }}
                className={cx("link", { active: isActive })}
                href={redirect}
            >
                <Icon className={cx("icon")} />
                <span className={cx("name")}>{name}</span>
            </Link>
        </li>
    );
};

export default memo(SidebarOption);
