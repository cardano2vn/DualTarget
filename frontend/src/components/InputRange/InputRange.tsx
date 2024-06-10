import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Image from "next/image";
import Tippy from "../Tippy";
import classNames from "classnames/bind";
import styles from "./InputRange.module.scss";
import icons from "~/assets/icons";
import TranslateContext from "~/contexts/components/TranslateContext";

const cx = classNames.bind(styles);

type Props = {
    disabled: boolean;
    currentValue?: number[];
    min: number;
    max: number;
    onChange?: (value: number[]) => void;
};

const InputRange = function ({ disabled, min, max, currentValue, onChange }: Props) {
    const { t } = useContext(TranslateContext);

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        onChange && onChange(newValue as number[]);
    };

    useEffect(() => {
        if (disabled) {
            setValue([min, max]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled, max]);

    return (
        <div className={cx("amount-slider-container")}>
            <div className={cx("percentage")}>
                <div className={cx("percentage_min_max")}>
                    <p className={cx({ disabled })}>{t("withdraw.card.fields.ranges.min.title")}</p>
                    <Tippy render={<div>{t("withdraw.card.fields.ranges.min.instruction")}</div>}>
                        <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                    </Tippy>
                </div>
                <div className={cx("percentage_min_max")}>
                    <p className={cx({ disabled })}>{t("withdraw.card.fields.ranges.max.title")}</p>
                    <Tippy placement="top-end" render={<div>{t("withdraw.card.fields.ranges.max.instruction")}</div>}>
                        <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                    </Tippy>
                </div>
            </div>
            <div className={cx("slider-input-group")}>
                <Box sx={{ width: "100%" }}>
                    <Slider
                        sx={{
                            color: "none",
                            "& .MuiSlider-rail": {
                                background: "linear-gradient(to right, rgb(112, 84, 209) 0%, rgb(178, 117, 220) 0%, rgb(47, 51, 83) 0%) !important",
                            },
                            "& .MuiSlider-track": {
                                background: "var(--background-button-linear)",
                                border: "none",
                            },
                            "& .MuiSlider-thumb": {
                                background: "var(--background-button-linear)",
                                border: "none",
                                width: "14px",
                                height: "14px",
                            },
                            "& .MuiSlider-thumb:hover": {
                                boxShadow: "0px 0px 0px 4pxrgba(178, 117, 220,0.2)",
                            },
                            "& .MuiSlider-valueLabel": {
                                backdropFilter: "blur(4px)",
                                background: "linear-gradient(166deg, rgba(53, 52, 74, 0.72) 4%, #313862 88%)",
                                border: "1px solid#7054d1",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                wordBreak: "break-word",
                            },
                        }}
                        min={min}
                        max={max}
                        step={0.0001}
                        disabled={disabled}
                        getAriaLabel={() => "Withdraw Range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value: number) => `${value} DJED`}
                    />
                </Box>
                <div className={cx("cover_lines")}>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                    <div className={cx("vertical-line")}>
                        <Image src={icons.separate} alt="separate" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputRange;
