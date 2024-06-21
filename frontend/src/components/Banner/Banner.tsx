"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Title from "../Title";
import TranslateContext from "~/contexts/components/TranslateContext";
const cx = classNames.bind(styles);

type Props = {
    title?: string;
    description?: string;
};

const Banner = function ({ title, description }: Props) {
    const { t } = useContext(TranslateContext);

    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: any = useMemo(
        () => ({
            fullScreen: false,
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 165,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 1,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                zIndex: -1,
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 100,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "outside",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 200,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 2, max: 6 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <section className={cx("wrapper")}>
            {init ? (
                <Particles id={cx(styles.tsparticles)} particlesLoaded={null!} options={options} />
            ) : null}
            <Title title={title} description={description} />
        </section>
    );
};

export default Banner;
