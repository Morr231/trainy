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
    console.log(userInfo.statistics);

    if (userInfo.statistics) {
        return (
            <div className="stats">
                <h2 className="stats-header">Your Statistics</h2>

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
                        number={userInfo.statistics.fastestEssay.timeSpend}
                        time="All time"
                        iconColor="#70B6C1"
                        icon={faBolt}
                    />
                    <StatsBlock
                        header="Longest essay"
                        number={userInfo.statistics.longestEssay.wordCount}
                        time="All time"
                        iconColor="#F3CC5C"
                        icon={faBook}
                    />
                    <StatsBlock
                        header="Best day"
                        number="73"
                        time="All time"
                        iconColor="#775DA6"
                        icon={faStar}
                    />
                </div>

                <div className="stats-container">
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
        <div className="stats">No info</div>;
    }
};

export default Stats;
