"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import Founder from "~/components/Founder";
import { founders } from "~/constants/founders";
import styles from "./About.module.scss";
import Banner from "~/components/Banner";
import { TranslateContextType } from "~/types/contexts/TranslateContextType";
import TranslateContext from "~/contexts/components/TranslateContext";

const cx = classNames.bind(styles);

const About = function () {
    const { t } = useContext<TranslateContextType>(TranslateContext);
    return (
        <main className={cx("wrapper")}>
            <title>About - Dualtarget</title>
            <div className={cx("container")}>
                <Banner
                    title={t("about.founders title")}
                    description={t("about.founders sub title")}
                />

                <section className={cx("founder-wrapper")}>
                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder, index: number) {
                            return (
                                <Founder
                                    id={founder.id}
                                    role={"founders"}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder?.company}
                                    avatar={founder.avatar}
                                    key={index}
                                    description={founder.description}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
            <div className={cx("container")}>
                <Banner
                    title={t("about.developers title")}
                    description={t("about.developers sub title")}
                />

                <section className={cx("founder-wrapper")}>
                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder, index: number) {
                            return (
                                <Founder
                                    id={founder.id}
                                    role={"developers"}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder?.company}
                                    avatar={founder.avatar}
                                    key={index}
                                    description={founder.description}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
            <div className={cx("container")}>
                <Banner
                    title={t("about.advisors title")}
                    description={t("about.advisors sub title")}
                />

                <section className={cx("founder-wrapper")}>
                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder, index: number) {
                            return (
                                <Founder
                                    id={founder.id}
                                    role={"advisors"}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder?.company}
                                    avatar={founder.avatar}
                                    key={index}
                                    description={founder.description}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;
