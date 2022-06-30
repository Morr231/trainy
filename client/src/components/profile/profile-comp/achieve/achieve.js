import React from "react";

import StatsBlock from "../stats/stats-comp/stats-block";

const Achieve = () => {
    return (
        <div className="achieve">
            <div className="achieve-header">Your achievements</div>
            <div className="achieve__container">
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
                <StatsBlock />
            </div>
        </div>
    );
};

export default Achieve;
