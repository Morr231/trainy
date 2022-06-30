import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatsBlock = ({ number, header, time, iconColor, icon }) => {
    return (
        <div className="stats-block">
            <div className="stats-block__upper">
                <div className="stats-block__number">{number}</div>
                <div
                    className="stats-block__icon"
                    style={iconColor && { color: iconColor }}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>
            </div>
            <div className="stats-block__description">{header}</div>
            <div className="stats-block__time">{time}</div>
        </div>
    );
};

export default StatsBlock;
