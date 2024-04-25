export const options = {
    series: [
        {
            name: "Series 1",
            type: "scatter",
            data: [],
        },
        {
            name: "Series 2",
            type: "area",
            data: [],
        },
    ],
    options: {
        colors: ["#7054d1", "#ab56c9", "#b275dc"],
        chart: {
            foreColor: "#fff",
            toolbar: {
                show: false,
            },
            id: "area-datetime",
            type: "line",
            height: 350,
            zoom: {
                enabled: false,
            },
            animations: {
                speed: 2000,
                easing: "linear",
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type: "datetime",
            min: new Date("01 Mar 2012").getTime(),
            tickAmount: 6,
            tooltip: {
                enabled: false,
            },
            labels: {
                format: "MMM dd yyyy HH:mm",
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                },
                tooltip: {
                    enabled: false,
                },
            },
            {
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                },
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
            enabled: true,
            style: {
                fontSize: "16px",
            },

            x: {
                show: true,
                format: "MMM dd yyyy HH:mm",
            },
            y: {
                title: {
                    formatter(_: any) {
                        return "DJED";
                    },
                },
            },
            fixed: {
                enabled: true,
                position: "topLeft",
                offsetX: 16,
                offsetY: -80,
            },
            marker: {
                show: true,
            },
        },

        grid: {
            borderColor: "#ffffff10",
        },
        fill: {
            colors: ["#7054d1", "#ab56c9", "#b275dc"],
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 100],
                inverseColors: false,
            },
        },
        stroke: {
            width: 1,
            lineCap: "round",
        },
    },

    selection: "ONE_DAY",
};

// {
//         series: [
//             {
//                 name: "Series 1",
//                 type: "scatter",
//                 data: [],
//             },
//             {
//                 name: "Series 2",
//                 type: "area",
//                 data: [],
//             },
//         ],
//         options: {
//             colors: ["#7054d1", "#ab56c9", "#b275dc"],
//             chart: {
//                 foreColor: "#fff",
//                 toolbar: {
//                     show: false,
//                 },
//                 id: "area-datetime",
//                 type: "line",
//                 height: 350,
//                 zoom: {
//                     enabled: false,
//                 },
//                 animations: {
//                     speed: 2000,
//                     easing: "linear",
//                 },
//             },
//             dataLabels: {
//                 enabled: false,
//             },
//             legend: {
//                 show: false,
//             },
//             markers: {
//                 size: 0,
//             },
//             xaxis: {
//                 type: "datetime",
//                 min: new Date("01 Mar 2012").getTime(),
//                 tickAmount: 6,
//                 tooltip: {
//                     enabled: false,
//                 },
//                 labels: {
//                     format: "MMM dd yyyy HH:mm",
//                 },
//                 axisBorder: {
//                     show: false,
//                 },
//                 axisTicks: {
//                     show: false,
//                 },
//             },
//             yaxis: [
//                 {
//                     axisTicks: {
//                         show: true,
//                     },
//                     axisBorder: {
//                         show: true,
//                     },
//                     tooltip: {
//                         enabled: false,
//                     },
//                 },
//                 {
//                     opposite: true,
//                     axisTicks: {
//                         show: true,
//                     },
//                     axisBorder: {
//                         show: true,
//                     },
//                 },
//             ],
//             tooltip: {
//                 shared: true,
//                 intersect: false,
//                 enabled: true,
//                 style: {
//                     fontSize: "16px",
//                 },

//                 x: {
//                     show: true,
//                     format: "MMM dd yyyy HH:mm",
//                 },
//                 y: {
//                     title: {
//                         formatter(_) {
//                             return "DJED";
//                         },
//                     },
//                 },
//                 fixed: {
//                     enabled: true,
//                     position: "topLeft",
//                     offsetX: 16,
//                     offsetY: -80,
//                 },
//                 marker: {
//                     show: true,
//                 },
//             },

//             grid: {
//                 borderColor: "#ffffff10",
//             },
//             fill: {
//                 colors: ["#7054d1", "#ab56c9", "#b275dc"],
//                 type: "gradient",
//                 gradient: {
//                     shadeIntensity: 1,
//                     opacityFrom: 0.7,
//                     opacityTo: 0.5,
//                     stops: [0, 100],
//                     inverseColors: false,
//                 },
//             },
//             stroke: {
//                 width: 1,
//                 lineCap: "round",
//             },
//         },

//         selection: period,
//     }
