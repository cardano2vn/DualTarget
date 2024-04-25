"use client";

import { useState } from "react";

const useModal = function () {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const toggle = function () {
        setIsShowing(!isShowing);
    };

    return { isShowing, toggle };
};

export default useModal;
