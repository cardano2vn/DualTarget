"use client";

import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

type Props = {};
const Aos = function ({}: Props) {
    useEffect(function () {
        AOS.init({
            duration: 1000,
            offset: 10,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);
    return null;
};

export default Aos;
