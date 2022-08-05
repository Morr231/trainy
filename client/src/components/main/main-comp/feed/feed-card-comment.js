import React from "react";

const FeedCardComments = ({ name, surname, date, text, likes, dislikes }) => {
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
        <div className="feed-card-comment">
            <div className="feed-card-comment__container">
                <div className="feed-card-comment__img"></div>

                <div className="feed-card-comment__info_container">
                    <div className="feed-card-comment__info">
                        <div className="feed-card-comment__info_upper">
                            <div className="feed-card-comment__name">
                                {name} {surname}
                            </div>
                            <div className="feed-card-comment__date">
                                {currDateFixed}
                            </div>
                        </div>
                    </div>
                    <div className="feed-card-comment__text">{text}</div>
                </div>
            </div>
        </div>
    );
};

export default FeedCardComments;
