import React from "react";

import StatsBlock from "../stats/stats-comp/stats-block";

import { faMedal } from "@fortawesome/free-solid-svg-icons";

const Achieve = ({ userInfo }) => {
    const filteredAchievements = userInfo.achievements.filter(
        (el) => el.achieved
    );

    filteredAchievements.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return (
        <div className="achieve">
            <div className="achieve-header">Your achievements</div>

            <div className="achieve-header__small">Latest achieved</div>

            <div className="achieve__container">
                {filteredAchievements
                    .filter((el, index) => index < 3)
                    .map((el) => (
                        <StatsBlock
                            header={el.description}
                            number={el.title}
                            time={
                                el.achievedTime
                                    ? el.achievedTime
                                    : "Not achieved"
                            }
                            iconColor="#FFD700"
                            icon={faMedal}
                        />
                    ))}
            </div>

            <div className="achieve-header__small">Gold achievements</div>

            <div className="achieve__container">
                {userInfo.achievements
                    .filter((el) => el.rank === "gold")
                    .map((el) => (
                        <StatsBlock
                            header={el.description}
                            number={el.title}
                            time={
                                el.achievedTime
                                    ? el.achievedTime
                                    : "Not achieved"
                            }
                            iconColor={el.achieved ? `#FFD700` : "#B4B4B4"}
                            icon={faMedal}
                        />
                    ))}
            </div>

            <div className="achieve-header__small">Silver achievements</div>

            <div className="achieve__container">
                {userInfo.achievements
                    .filter((el) => el.rank === "silver")
                    .map((el) => (
                        <StatsBlock
                            header={el.description}
                            number={el.title}
                            time={
                                el.achievedTime
                                    ? el.achievedTime
                                    : "Not achieved"
                            }
                            iconColor={el.achieved ? "#99A2AD" : "#B4B4B4"}
                            icon={faMedal}
                        />
                    ))}
            </div>

            <div className="achieve-header__small">Bronze achievements</div>

            <div className="achieve__container">
                {userInfo.achievements
                    .filter((el) => el.rank === "bronze")
                    .map((el) => (
                        <StatsBlock
                            header={el.description}
                            number={el.title}
                            time={
                                el.achievedTime
                                    ? el.achievedTime
                                    : "Not achieved"
                            }
                            iconColor={el.achieved ? "#AD8A56" : "#B4B4B4"}
                            icon={faMedal}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Achieve;
