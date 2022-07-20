import { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";

import { useSelector } from "react-redux";

import DashboardCard from "./dashboard-card";

import getUserInfo from "../../../helper/getUserInfo";

const Dashboard = () => {
    const [dateOfProgress, setDateOfProgress] = useState("");
    const [cardDeleted, setCardDeleted] = useState(false);

    let [filteredCalendarValues, setfilteredCalendarValues] = useState([]);

    const [userInfo, setUserInfo] = useState({});

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
            if (
                userUpdated ||
                cardDeleted ||
                !window.localStorage.getItem("userInfo")
            ) {
                getUserInfo({ setUserInfo: setUserInfo });
                setCardDeleted(false);
            } else {
                setUserInfo(
                    JSON.parse(window.localStorage.getItem("userInfo"))
                );
            }
        }
    }, [userUpdated, cardDeleted]);

    const currentYear = new Date().getFullYear();
    const currentTimeNF = new Date();

    const currentTimeF = `${currentTimeNF.getFullYear()}-${
        currentTimeNF.getMonth() < 10
            ? "0" + (currentTimeNF.getMonth() + 1).toString()
            : currentTimeNF.getMonth() + 1
    }-${
        currentTimeNF.getDate() < 10
            ? "0" + currentTimeNF.getDate().toString()
            : currentTimeNF.getDate()
    }`;

    function calendarRectClicked(value) {
        if (value) {
            let tempCalendarVals = userInfo.texts.filter((el) => {
                if (value.date[value.date.length - 2] === "-") {
                    return el.date.slice(0, 8) + el.date[9] === value.date;
                }

                return el.date.slice(0, 10) === value.date;
            });

            const unformattedDate = new Date(tempCalendarVals[0].date)
                .toDateString()
                .split(" ");
            const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

            setfilteredCalendarValues(tempCalendarVals);
            setDateOfProgress(formattedDate);
        }
    }

    const yLabels = ["Sun", "Mon", "Tue"];

    return (
        <div className="dashboard">
            <div className="dashboard-calendar">
                <h2 className="dashboard-header">Your progress</h2>

                {userInfo.daysTextCount && (
                    <CalendarHeatmap
                        showWeekdayLabels={true}
                        startDate={new Date(`${currentYear}-01-01`)}
                        endDate={new Date(currentTimeF)}
                        values={userInfo.daysTextCount}
                        classForValue={(value) => {
                            if (!value) {
                                return "color-empty";
                            }
                            return `color-scale-${value.count}`;
                        }}
                        onClick={calendarRectClicked}
                    />
                )}
            </div>

            <div className="dashboard-grid">
                <h2 className="dashboard-grid__header">
                    {dateOfProgress ? dateOfProgress : "Your last progress"}
                </h2>

                <div className="dashboard-grid__main">
                    {typeof userInfo.texts !== "undefined" &&
                    filteredCalendarValues.length === 0
                        ? [...userInfo.texts].reverse().map((el, index) => {
                              return (
                                  <DashboardCard
                                      topic={el.topic}
                                      date={el.date}
                                      imageUrl={el.imageUrl}
                                      index={index}
                                      username={userInfo.username}
                                      textsLength={userInfo.texts.length}
                                      setCardDeleted={setCardDeleted}
                                  />
                              );
                          })
                        : filteredCalendarValues.length &&
                          [...filteredCalendarValues].map((el, index) => {
                              return (
                                  <DashboardCard
                                      topic={el.topic}
                                      date={el.date}
                                      imageUrl={el.imageUrl}
                                      index={index}
                                      username={userInfo.username}
                                      textsLength={userInfo.texts.length}
                                      setCardDeleted={setCardDeleted}
                                  />
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
