import { useEffect, useState } from "react";

const useDeviceSize = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowResize = function () {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [width, height];
};

export default useDeviceSize;
