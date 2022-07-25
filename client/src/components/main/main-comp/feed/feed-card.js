import React from "react";

import DashboardCard from "../../../profile/profile-comp/dashboard-card";

import lake from "./lake.webp";

const FeedCard = ({ img, name, surname, date, description }) => {
    const currDate = new Date(date);

    const minutes = `${Math.floor(currDate.getMinutes() / 10)}${Math.floor(
        currDate.getMinutes() % 10
    )}`;

    const currDateFixed = `${currDate.getDay()} ${currDate.toLocaleString(
        "en-us",
        {
            month: "long",
        }
    )} at ${currDate.getHours()}:${minutes}`;

    return (
        <div className="feed-card">
            <div className="feed-card-container">
                <div className="feed-card-img__container">
                    <img src={img} alt="" className="feed-card-img" />
                </div>
                <div className="feed-card-details">
                    <div className="feed-card-name">
                        {name} {surname}
                    </div>
                    <div className="feed-card-data">{currDateFixed}</div>
                </div>
            </div>

            <div className="feed-card-description">{description}</div>

            <div className="feed-card-essay">
                <img src={lake} alt="" className="feed-card-essay__img" />
                {/* <DashboardCard img={}/> */}
            </div>
        </div>
    );
};

export default FeedCard;
