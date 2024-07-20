import classNames from "classnames/bind";
import styles from "./GuideStep.module.scss";

const cx = classNames.bind(styles);
type Props = {
    id: number;
    title: string;
    description?: string;
    description2?: string;
    bonus?: any[];
};

const GuideStep = function ({ id, title, description, description2, bonus }: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <header className={cx("header")}>
                <button className={cx("button")}>{id}</button>
                <h4 className={cx("title")}>{title}</h4>
            </header>
            {description && <p className={cx("description")}>{description}</p>}
            {description2 && <p className={cx("description")}>{description2}</p>}
            {bonus && (
                <div>
                    {bonus.map(function (item: any, index) {
                        return (
                            <p className={cx("description")} key={index}>
                                &#8226; {item?.content}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default GuideStep;
