"use client";
import { useState, useEffect } from "react";

type Props = {
    offset?: number;
};

const useScroll = function ({ offset = 0 }: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = function () {
            setIsScrolled(window.scrollY > offset);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return [isScrolled, setIsScrolled];
};

export default useScroll;
