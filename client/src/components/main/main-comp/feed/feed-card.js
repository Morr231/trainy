import React from "react";

const FeedCard = ({ img, name, surname, data, essay }) => {
    return (
        <div className="feed-card">
            <div className="feed-card-container">
                <div className="feed-card-img"></div>
                <div className="feed-card-details">
                    <div className="feed-card-name"></div>
                    <div className="feed-card-data"></div>
                </div>
            </div>

            <div className="feed-card-description"></div>

            <div className="feed-card-essay"></div>
        </div>
    );
};

export default FeedCard;
