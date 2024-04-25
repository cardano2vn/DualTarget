"use client";

import { useState, useEffect } from "react";

const useCopy = function (delay: number) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => setIsCopied(!isCopied), 2000);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {};
};

export default useCopy;
