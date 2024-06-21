import classNames from "classnames/bind";

import React, { useId, useLayoutEffect, useMemo, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import styles from "./CustomChart.module.scss";
import { CalculateSellingStrategy, ChartDataType } from "~/types/GenericsType";
import CountUp from "react-countup";
import Image from "next/image";
import icons from "~/assets/icons";
import Tippy from "../Tippy";
import Loading from "../Loading";
import { convertTimestampToDateObject } from "~/utils/utils";

const cx = classNames.bind(styles);

type Props = {
    data: ChartDataType;
    isLoading: boolean;
    preview?: CalculateSellingStrategy[];
    onRefresh?: () => void;
};

type DataType = {
    value: number;
    date: number;
};

const CustomChart = function ({ data, preview, isLoading, onRefresh }: Props) {
    const [show, setShow] = useState<boolean>(true);
    const [currentHoveredValue, setCurrentHoveredValue] = useState<DataType>({ date: 0, value: 0 });
    const [currentMarketPrice, setCurrentMarketPrice] = useState<DataType>({ date: 0, value: 0 });
    const chartId = useId();
    const dataObject = useMemo(() => {
        if (data && data.length > 0) {
            setCurrentMarketPrice({
                date: data[data.length - 1][0],
                value: data[data.length - 1][1],
            });
            return data.map((e) => ({
                date: e[0],
                value: e[1],
            }));
        }
        return [];
    }, [data]);
    const previewStepsChartData = useMemo(() => {
        if (!preview) return [];
        if (preview.length > 0) {
            const datetime = new Date(Date.now());
            return preview.map((record: any) => {
                const oneMonthAgo = datetime.setDate(datetime.getDate() - 1);
                return { value: record.buyPrice / 1000000, date: oneMonthAgo };
            });
        }
    }, [preview]);

    const maxPreviewStepsChartData: number | undefined = useMemo(() => {
        if (!previewStepsChartData) return undefined;
        if (previewStepsChartData.length > 0) {
            return (
                Math.max(
                    ...previewStepsChartData.map(({ value }) => {
                        return value;
                    }),
                ) + 0.5
            );
        }
    }, [previewStepsChartData]);

    useLayoutEffect(() => {
        let root = am5.Root.new(`price-chart-${chartId}`);

        // Custom Theme
        const customTheme = am5.Theme.new(root);
        customTheme.rule("Label").setAll({
            fill: am5.color(0xfffffff),
            fontSize: "1.2em",
        });

        customTheme.rule("Grid").setAll({
            stroke: am5.color(0xffffff),
            strokeOpacity: 0.1,
            strokeWidth: 0.5,
        });

        // Set Theme
        root.setThemes([am5themes_Animated.new(root), customTheme]);

        // Initialize Chart
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingLeft: 0,
                pinchZoomX: true,
                layout: root.verticalLayout,
            }),
        );

        // Create Axes
        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "day", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: false,
                    minGridDistance: 100,
                }),
                tooltip: am5.Tooltip.new(root, {
                    forceHidden: true,
                }),
            }),
        );

        xAxis.get("renderer").grid.template.set("forceHidden", true);

        // Y axis for ADA - DJED
        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 1,
                max: maxPreviewStepsChartData,
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {
                    opposite: true,
                }),
            }),
        );

        yAxis.set("numberFormatter", am5.NumberFormatter.new(root, { numberFormat: "#.####" }));

        // Add Cursor
        const cursor = chart.set(
            "cursor",
            am5xy.XYCursor.new(root, {
                xAxis: xAxis,
                behavior: "none",
            }),
        );

        cursor.lineX.set("visible", true);
        cursor.lineY.set("stroke", am5.color(0xffffff));
        cursor.lineX.set("stroke", am5.color(0xffffff));

        // Add Series
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                stroke: am5.color(0xab56c9),
            }),
        );
        const tooltip = am5.Tooltip.new(root, {
            labelText: `{valueX.formatDate('d MMMM yyyy')}\n{valueY}`,
            getFillFromSprite: false,
            animationDuration: 100,
        });

        tooltip.get("background")?.setAll({
            fill: am5.color(0xffffff),
            fillOpacity: 0.8,
            stroke: am5.color(0xab56c9),
            strokeWidth: 1,
        });

        series.set("tooltip", tooltip);

        series.fills.template.set(
            "fillGradient",
            am5.LinearGradient.new(root, {
                stops: [
                    {
                        opacity: 0.6,
                        color: am5.color(0xb275dc),
                        brighten: -0.2,
                    },
                    {
                        opacity: 0.2,
                        color: am5.color(0xb275dc),
                        brighten: 100,
                    },
                ],
                rotation: 90,
            }),
        );

        // series.bullets.push(function () {
        //     var circle = am5.Circle.new(root, {
        //         radius: 6,
        //         stroke: am5.color(0xffffff),
        //         strokeWidth: 2,
        //         interactive: true,
        //         fill: am5.color(0xb275dc),
        //         opacity: 0,
        //     });

        //     circle.states.create("default", {
        //         opacity: 0,
        //     });

        //     circle.states.create("hover", {
        //         opacity: 1,
        //     });

        //     return am5.Bullet.new(root, {
        //         sprite: circle,
        //     });
        // });

        series.fills.template.setAll({
            fillOpacity: 1,
            visible: true,
        });

        series.strokes.template.setAll({
            strokeWidth: 1,
        });

        //  Add data
        series.data.setAll(dataObject);
        if (dataObject && dataObject.length > 0) {
            setCurrentHoveredValue({
                value: dataObject[dataObject.length - 1].value,
                date: dataObject[dataObject.length - 1].date,
            });
        }

        // Create axis ranges
        function createRange({
            value,
            endValue,
            color,
        }: {
            value?: number;
            endValue?: number;
            color: am5.Color;
        }) {
            const rangeDataItem = yAxis.makeDataItem({
                value: value,
                endValue: endValue,
            });

            const range = yAxis.createAxisRange(rangeDataItem);

            if (endValue) {
                range.get("axisFill")?.setAll({
                    fill: color,
                    fillOpacity: 0.2,
                    visible: true,
                });

                range.get("label")?.setAll({
                    fill: am5.color(0xffffff),
                    text: value + "-" + endValue,
                    location: 1,
                    background: am5.RoundedRectangle.new(root, {
                        fill: color,
                    }),
                    tooltip: am5.Tooltip.new(root, {}),
                });
            } else {
                range.get("label")?.setAll({
                    fill: am5.color(0xffffff),
                    text: String(value),
                    paddingLeft: 16,
                    paddingRight: 16,
                    minWidth: 60,
                    background: am5.RoundedRectangle.new(root, {
                        fill: color,
                    }),
                });
            }

            range.get("grid")?.setAll({
                stroke: color,
                strokeWidth: 2,
                strokeOpacity: 1,
                location: 1,
            });
        }

        if (previewStepsChartData && previewStepsChartData.length > 0) {
            previewStepsChartData.forEach(({ value }) => {
                createRange({ value: value, endValue: undefined, color: am5.color(0x297373) });
            });
        }
        // Pre-zooming
        series.events.once("datavalidated", function (ev) {
            ev.target.get("xAxis").zoom(0, 1);
        });

        // Animation On Load
        series.appear(1000);
        chart.appear(1000, 100);

        // let previousBulletSprites: any = [];
        cursor.events.on("cursormoved", cursorMoved);

        function cursorMoved() {
            // for (var i = 0; i < previousBulletSprites.length; i++) {
            //     previousBulletSprites[i].unhover();
            // }

            // previousBulletSprites = [];
            chart.series.each(function (series) {
                var dataItem = series.get("tooltip")?.dataItem;
                if (dataItem) {
                    // const bulletSprite = dataItem.bullets?.[0].get("sprite");
                    // if (bulletSprite) {
                    //     bulletSprite.hover();
                    //     previousBulletSprites.push(bulletSprite);
                    // }

                    const { date, value } = dataItem.dataContext as DataType;
                    setCurrentHoveredValue({
                        date,
                        value,
                    });
                }
            });
        }
        return () => root.dispose();
    }, [chartId, dataObject, previewStepsChartData, maxPreviewStepsChartData]);

    const handleToggleChart = function () {
        setShow((prev) => !prev);
    };

    const handleRefresh = function () {
        if (onRefresh) onRefresh();
    };
    return (
        <div className={cx("wrapper")}>
            <button className={cx("button-toggle-chart-visibility")} onClick={handleToggleChart}>
                <svg
                    fill="none"
                    height={12}
                    viewBox="0 0 13 12"
                    width={13}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.0996094 6.80002C0.0996094 6.3582 0.457782 6.00002 0.899609 6.00002H2.49961C2.94144 6.00002 3.29961 6.3582 3.29961 6.80002V10.8C3.29961 11.2419 2.94144 11.6 2.49961 11.6H0.899609C0.457782 11.6 0.0996094 11.2419 0.0996094 10.8V6.80002Z"
                        fill="currentColor"
                    />
                    <path
                        d="M4.89961 3.60002C4.89961 3.1582 5.25778 2.80002 5.69961 2.80002H7.29961C7.74144 2.80002 8.09961 3.1582 8.09961 3.60002V10.8C8.09961 11.2419 7.74144 11.6 7.29961 11.6H5.69961C5.25778 11.6 4.89961 11.2419 4.89961 10.8V3.60002Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9.69961 1.20002C9.69961 0.758197 10.0578 0.400024 10.4996 0.400024H12.0996C12.5414 0.400024 12.8996 0.758197 12.8996 1.20002V10.8C12.8996 11.2419 12.5414 11.6 12.0996 11.6H10.4996C10.0578 11.6 9.69961 11.2419 9.69961 10.8V1.20002Z"
                        fill="currentColor"
                    />
                </svg>
                <span className={cx("button-toggle-chart-text")}>
                    {show ? "Hide" : "Show"} chart
                </span>
            </button>
            <div
                className={cx("chart-block", {
                    show,
                })}
            >
                <div className={cx("chart-header-wrapper")}>
                    <div className={cx("header-inner")}>
                        <div className={cx("header-left")}>
                            <div className={cx("exchange-rate-images")}>
                                <div className={cx("cardano-coin")}>
                                    <div>
                                        <Image
                                            alt="Cardano"
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                            decoding="async"
                                            data-nimg={1}
                                            src={icons.cardanoChartCoin}
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                                <div className={cx("djed-coin")}>
                                    <div>
                                        <Image
                                            alt="Djed USD"
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                            decoding="async"
                                            data-nimg={1}
                                            src={icons.djedChartCoin}
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={cx("exchange-rate-name")}>
                                    <span>ADA-DJED</span>
                                    <Tippy render={<div>This pair is verified</div>}>
                                        <div className={cx("exchange-check-icon")}>
                                            <div>
                                                <svg
                                                    fill="none"
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    width={16}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M5.01517 2.76412C5.52963 2.72307 6.01802 2.52077 6.41082 2.18603C7.32747 1.40487 8.67566 1.40487 9.5923 2.18603C9.9851 2.52077 10.4735 2.72307 10.988 2.76412C12.1885 2.85993 13.1418 3.81324 13.2376 5.01377C13.2787 5.52822 13.4809 6.01662 13.8157 6.40942C14.5969 7.32606 14.5969 8.67425 13.8157 9.5909C13.4809 9.9837 13.2787 10.4721 13.2376 10.9865C13.1418 12.1871 12.1885 13.1404 10.988 13.2362C10.4735 13.2772 9.9851 13.4795 9.5923 13.8143C8.67566 14.5954 7.32747 14.5954 6.41082 13.8143C6.01802 13.4795 5.52963 13.2772 5.01517 13.2362C3.81465 13.1404 2.86133 12.1871 2.76553 10.9865C2.72447 10.4721 2.52218 9.9837 2.18743 9.5909C1.40627 8.67425 1.40627 7.32606 2.18743 6.40942C2.52218 6.01662 2.72447 5.52822 2.76553 5.01377C2.86133 3.81324 3.81465 2.85993 5.01517 2.76412ZM10.9672 6.96584C11.2797 6.65342 11.2797 6.14689 10.9672 5.83447C10.6548 5.52205 10.1483 5.52205 9.83588 5.83447L7.20156 8.46879L6.16725 7.43447C5.85483 7.12205 5.3483 7.12205 5.03588 7.43447C4.72346 7.74689 4.72346 8.25342 5.03588 8.56584L6.63588 10.1658C6.9483 10.4783 7.45483 10.4783 7.76725 10.1658L10.9672 6.96584Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx("header-right")}>
                            <Tippy
                                placement="bottom-end"
                                hideOnClick={false}
                                render={<div>Refresh chart</div>}
                            >
                                <button
                                    className={cx("refresh-button")}
                                    type="button"
                                    onClick={handleRefresh}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={cx("refresh-icon")}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>

                <div>
                    {isLoading && (
                        <div className={cx("loading-overlay")}>
                            <Loading className={cx("loading-icon")} />
                        </div>
                    )}
                    <div
                        className={cx({
                            isLoading,
                        })}
                    >
                        <div className={cx("current-hovered-value")}>
                            <div className={cx("hovered-wrapper")}>
                                <span className={cx("price")}>
                                    {currentMarketPrice.value.toFixed(4)}
                                </span>
                                <span className={cx("token-name")}>DJED</span>
                            </div>
                            <div className={cx("datetime")}>
                                {convertTimestampToDateObject(currentMarketPrice.date)}
                            </div>
                        </div>
                        <div className={cx("chart-offset")}>
                            <div id={`price-chart-${chartId}`} className={cx("chart")} />
                        </div>
                        <div id="html-dist"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomChart;
