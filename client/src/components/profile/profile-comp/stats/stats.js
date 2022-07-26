import React from "react";

import {
    faFireAlt,
    faBolt,
    faBook,
    faStar,
    faClock,
    faPen,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons";

import StatsBlock from "./stats-comp/stats-block";

import LineRendered from "./stats-comp/stats-chart";

const Stats = ({ userInfo }) => {
    if (userInfo.statistics) {
        return (
            <div className="stats">
                <div className="stats-container">
                    <StatsBlock
                        header="Days streak"
                        number={userInfo.statistics.daysStreak}
                        time="All time"
                        iconColor="#F9837C"
                        icon={faFireAlt}
                    />
                    <StatsBlock
                        header="Fastest essay"
                        number={
                            userInfo.statistics.fastestEssay
                                ? userInfo.statistics.fastestEssay.timeSpend
                                : 0
                        }
                        time="All time"
                        iconColor="#70B6C1"
                        icon={faBolt}
                    />
                    <StatsBlock
                        header="Longest essay"
                        number={
                            userInfo.statistics.longestEssay
                                ? userInfo.statistics.longestEssay.wordCount
                                : 0
                        }
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
                        number={userInfo.statistics.averageTime}
                        time="All time"
                        iconColor="#70B6C1"
                        icon={faClock}
                    />
                    <StatsBlock
                        header="Average word count"
                        number={userInfo.statistics.averageWordCount}
                        time="All time"
                        iconColor="#775DA6"
                        icon={faPen}
                    />
                    <StatsBlock
                        header="Average words per minute"
                        number={userInfo.statistics.averageWPM}
                        time="All time"
                        iconColor="#F9837C"
                        icon={faHourglass}
                    />
                    <StatsBlock
                        header="Average words per minute"
                        number={userInfo.statistics.averageWPM}
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
                        <LineRendered
                            data={userInfo.statistics.dailyTime}
                            name="dailyTime"
                        />
                    </div>
                    <div className="stats-charts__el">
                        <div className="stats-charts__header">
                            Everyday word count
                        </div>
                        <LineRendered
                            data={userInfo.statistics.dailyWordCount}
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
