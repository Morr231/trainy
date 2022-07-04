import React from "react";

import StatsBlock from "../stats/stats-comp/stats-block";

import { faFireAlt } from "@fortawesome/free-solid-svg-icons";

const Achieve = () => {
    return (
        <div className="achieve">
            <div className="achieve-header">Your achievements</div>
            <div className="achieve__container">
                <StatsBlock
                    header="Write your first essay"
                    number="First essay"
                    time="1 July 2022"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
                <StatsBlock
                    header="Days streak"
                    number="123"
                    time="All time"
                    iconColor="#F9837C"
                    icon={faFireAlt}
                />
            </div>
        </div>
    );
};

export default Achieve;
