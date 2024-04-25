const convertDatetime = function (blockTime: number): string {
    const date = new Date(blockTime * 1000);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return day + " " + month + ", " + year + " " + hour + ":" + minute;
};

export default convertDatetime;
