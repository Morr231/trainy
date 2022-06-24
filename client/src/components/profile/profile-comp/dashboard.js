import { useState } from "react";

import CalendarHeatmap from "react-calendar-heatmap";

import DashboardCard from "./dashboard-card";

const Dashboard = ({ userInfo, setShowTopicCard }) => {
    // console.log(userInfo);
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

    const calendarValues = [];

    if (typeof userInfo.texts !== "undefined") {
        userInfo.texts.forEach((el) => {
            const elDate = el.date.slice(0, 10);

            let valIndex = -1;

            calendarValues.forEach((el, index) => {
                if (el.date === elDate) {
                    valIndex = index;
                }
            });

            if (valIndex !== -1) {
                calendarValues[valIndex].count++;
            } else {
                calendarValues.push({ date: elDate, count: 1 });
            }
        });
    }

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
            <div className="dashboard-calendar">
                <h2 className="dashboard-header">Your progress</h2>

                <CalendarHeatmap
                    startDate={new Date(`${currentYear}-01-01`)}
                    endDate={new Date(currentTimeF)}
                    values={calendarValues && calendarValues}
                    classForValue={(value) => {
                        if (!value) {
                            return "color-empty";
                        }
                        return `color-scale-${value.count}`;
                    }}
                    onClick={calendarRectClicked}
                />
            </div>

            <div className="dashboard-grid">
                <h2 className="dashboard-grid__header">
                    {dateOfProgress ? dateOfProgress : "Your last progress"}
                </h2>

                <div className="dashboard-grid__main">
                    {typeof userInfo.texts !== "undefined" &&
                    filteredCalendarValues.length === 0
                        ? userInfo.texts.reverse().map((el, index) => {
                              console.log("hello 1");
                              return (
                                  <DashboardCard
                                      topic={el.topic}
                                      date={el.date}
                                      setShowTopicCard={setShowTopicCard}
                                      index={index}
                                  />
                              );
                          })
                        : filteredCalendarValues.length &&
                          filteredCalendarValues.map((el, index) => {
                              return (
                                  <DashboardCard
                                      topic={el.topic}
                                      date={el.date}
                                      setShowTopicCard={setShowTopicCard}
                                      index={index}
                                  />
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
