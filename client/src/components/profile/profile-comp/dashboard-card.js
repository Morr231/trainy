import React from "react";

const DashboardCard = ({ topic, date, setShowTopicCard, index }) => {
    const unformattedDate = new Date(date).toDateString().split(" ");
    const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

    let formattedTopic = topic;

    // console.log(formattedTopic.length);

    // console.log(formattedTopic);

    if (typeof formattedTopic !== "undefined" && formattedTopic.length > 40) {
        formattedTopic = formattedTopic.slice(0, 40) + "...";
    }

    return (
        <div className="dashboard-card" onClick={() => setShowTopicCard(index)}>
            <div className="dashboard-card__img_container"></div>
            <div className="dashboard-card__info">
                <h3 className="dashboard-card__topic">{formattedTopic}</h3>
                <div className="dashboard-card__date">{formattedDate}</div>
            </div>
        </div>
    );
};

export default DashboardCard;
