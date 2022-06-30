import { useState } from "react";

import CalendarHeatmap from "react-calendar-heatmap";

import DashboardCard from "./dashboard-card";

const Dashboard = ({ userInfo }) => {
    const [dateOfProgress, setDateOfProgress] = useState("");

    let [filteredCalendarValues, setfilteredCalendarValues] = useState([]);

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
            let tempCalendarVals = userInfo.texts.filter(
                (el) => el.date.slice(0, 10) === value.date
            );

            const unformattedDate = new Date(tempCalendarVals[0].date)
                .toDateString()
                .split(" ");
            const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

            setfilteredCalendarValues(tempCalendarVals);
            setDateOfProgress(formattedDate);
        }
    }

    return (
        <div className="dashboard">
            <h2 className="dashboard-header">Your Dashboard</h2>

            <div className="dashboard-calendar">
                <h2 className="dashboard-header">Your progress</h2>

                {userInfo.daysTextCount && (
                    <CalendarHeatmap
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
                                  />
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
