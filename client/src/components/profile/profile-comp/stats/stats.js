import React, { useState, useEffect } from "react";

import {
    faFireAlt,
    faBolt,
    faBook,
    faStar,
    faClock,
    faPen,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons";

import getCookie from "../../../../helper/getCookie";

import StatsBlock from "./stats-comp/stats-block";

import LineRendered from "./stats-comp/stats-chart";

const Stats = ({ userInfo }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}user/all-stats/${userInfo.statistics}`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        autorization: getCookie("token"),
                    },
                }
            );

            const data = await responce.json();
            console.log(data);

            if (data.found) {
                setStats(data.found);
            }
        };

        if (userInfo) {
            getStats();
        }
    }, [userInfo]);

    if (userInfo.statistics && stats) {
        return (
            <div className="stats">
                <div className="stats-container">
                    <StatsBlock
                        header="Days streak"
                        number={stats.daysStreak}
                        time="All time"
                        iconColor="#F9837C"
                        icon={faFireAlt}
                    />
                    <StatsBlock
                        header="Fastest essay"
                        number={stats.fastestEssay}
                        time="All time"
                        iconColor="#70B6C1"
                        icon={faBolt}
                    />
                    <StatsBlock
                        header="Longest essay"
                        number={stats.longestEssay}
                        time="All time"
                        iconColor="#F3CC5C"
                        icon={faBook}
                    />
                    <StatsBlock
                        header="Best day"
                        number="0"
                        time="All time"
                        iconColor="#775DA6"
                        icon={faStar}
                    />

                    <StatsBlock
                        header="Average time"
                        number={stats.averageTime}
                        time="All time"
                        iconColor="#70B6C1"
                        icon={faClock}
                    />
                    <StatsBlock
                        header="Average word count"
                        number={stats.averageWordCount}
                        time="All time"
                        iconColor="#775DA6"
                        icon={faPen}
                    />
                    <StatsBlock
                        header="Average words per minute"
                        number={stats.averageWPM}
                        time="All time"
                        iconColor="#F9837C"
                        icon={faHourglass}
                    />
                    <StatsBlock
                        header="Average words per minute"
                        number={stats.averageWPM}
                        time="All time"
                        iconColor="#F9837C"
                        icon={faFireAlt}
                    />
                </div>

                <div className="stats-charts">
                    <div className="stats-charts__el">
                        <div className="stats-charts__header">
                            Everyday time count
                        </div>
                        <LineRendered data={stats.dailyTime} name="dailyTime" />
                    </div>
                    <div className="stats-charts__el">
                        <div className="stats-charts__header">
                            Everyday word count
                        </div>
                        <LineRendered
                            data={stats.dailyWordCount}
                            name="dailyWordCount"
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="stats">
                <h2 className="stats-header">
                    Start writing essays to get your statistics
                </h2>
            </div>
        );
    }
};

export default Stats;
