import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropdownMenu.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

export type Item = {
    id: number;
    name: string;
};

type Props = {
    items: Item[];
    selectItem: Dispatch<SetStateAction<Item>>;
    currentItem: Item;
    classNameWrapper?: string;
    classNameItem?: string;
};

const DropdownMenu = function ({ items, selectItem, currentItem, classNameItem, classNameWrapper }: Props) {
    const [active, setActive] = useState<boolean>(false);

    const handleToggleMenu = function () {
        setActive((prev) => !prev);
    };

    const handleSelectItem = function (item: Item) {
        selectItem(item);
    };

    return (
        <div className={cx("wrapper")}>
            <div
                className={cx("dropdown-menu", classNameWrapper, {
                    active,
                })}
                onClick={handleToggleMenu}
            >
                <span className={cx("current-item")}>{currentItem.name}</span>
                <span className={cx("arrow-icon")}>
                    <Image src={icons.networkSelector} alt="arrow" />
                </span>
                <div
                    className={cx("cover_list-wrapper", {
                        show: active,
                    })}
                >
                    <ul className={cx("cover_list")}>
                        {items.map((item, index: number) => (
                            <li
                                key={index}
                                className={cx("item", classNameItem, {
                                    selected: item.id === currentItem.id,
                                })}
                                onClick={() => handleSelectItem(item)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;
