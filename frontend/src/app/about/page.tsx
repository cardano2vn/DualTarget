import React from "react";
import classNames from "classnames/bind";
import Founder from "~/components/Founder";
import founders from "~/constants/founders";
import styles from "./About.module.scss";
import Banner from "~/components/Banner";

const cx = classNames.bind(styles);

const About = function () {
    return (
        <main className={cx("wrapper")}>
            <title>About - Dualtarget</title>
            <div className={cx("container")}>
                <Banner />

                <section className={cx("founder-wrapper")}>
                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder, index: number) {
                            return (
                                <Founder
                                    id={founder.id}
                                    role={founder.role}
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
