import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import StatsBlock from "../stats/stats-comp/stats-block";

import { faMedal } from "@fortawesome/free-solid-svg-icons";

import getUserInfo from "../../../../helper/getUserInfo";
import getCookie from "../../../../helper/getCookie";

const Achieve = () => {
    const [userInfo, setUserInfo] = useState();

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    const otherUserInfo = useSelector((state) => {
        return state.otherUser.otherUserInfo;
    });

    useEffect(() => {
        if (otherUserInfo) {
            setUserInfo(otherUserInfo);
        } else {
            if (userUpdated || !window.localStorage.getItem("userInfo")) {
                getUserInfo({ setUserInfo: setUserInfo });
            } else {
                setUserInfo(
                    JSON.parse(window.localStorage.getItem("userInfo"))
                );
            }
        }
    }, [userUpdated]);

    let filteredAchievements;

    if (userInfo) {
        console.log(userInfo);
        filteredAchievements = userInfo.achievements.filter(
            (el) => el.achieved
        );
        filteredAchievements.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
    }

    return (
        <div className="achieve">
            <div className="achieve-header__small">Latest achieved</div>

            <div className="achieve__container">
                {userInfo &&
                    filteredAchievements
                        .filter((el, index) => index < 3)
                        .reverse()
                        .map((el) => (
                            <StatsBlock
                                header={el.description}
                                number={el.title}
                                time={
                                    el.achievedTime
                                        ? el.achievedTime
                                        : "Not achieved"
                                }
                                iconColor={
                                    el.rank === "gold"
                                        ? `#FFD700`
                                        : el.rank === "silver"
                                        ? "#99A2AD"
                                        : "#AD8A56"
                                }
                                icon={faMedal}
                            />
                        ))}
            </div>

            <div className="achieve-header__small">Gold achievements</div>

            <div className="achieve__container">
                {userInfo &&
                    userInfo.achievements
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
                {userInfo &&
                    userInfo.achievements
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
                {userInfo &&
                    userInfo.achievements
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
