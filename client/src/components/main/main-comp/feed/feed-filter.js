import React from "react";

const FeedFilter = ({ feedFilter, setFeedFilter }) => {
    return (
        <div className="friends-filter" style={{ width: "100%" }}>
            <div
                className={`friends-filter__el ${
                    feedFilter === "friends" && "friends-filter__el_active"
                }`}
                onClick={() => setFeedFilter("friends")}
            >
                Friends
            </div>
            <div
                className={`friends-filter__el ${
                    feedFilter === "random" && "friends-filter__el_active"
                }`}
                onClick={() => setFeedFilter("random")}
            >
                World
            </div>
            <div
                className={`friends-filter__el ${
                    feedFilter === "my" && "friends-filter__el_active"
                }`}
                onClick={() => setFeedFilter("my")}
            >
                My feed
            </div>
        </div>
    );
};

export default FeedFilter;
