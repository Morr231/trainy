import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import getCookie from "../../../helper/getCookie";

const DashboardCard = ({
    topic,
    date,
    imageUrl,
    textId,
    index,
    username,
    textsLength,
    setCardDeleted,
    finished,
    otherProfile,
}) => {
    const unformattedDate = new Date(date).toDateString().split(" ");
    const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

    let formattedTopic = topic;

    if (typeof formattedTopic !== "undefined" && formattedTopic.length > 40) {
        formattedTopic = formattedTopic.slice(0, 40) + "...";
    }

    const handleDelete = () => {
        setCardDeleted(true);

        deleteText();
    };

    const deleteText = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}text/delete/${textId}`,
            {
                method: "DELETE",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    autorization: getCookie("token"),
                },
            }
        );
        const data = await responce.json();
    };

    return (
        <div className="dashboard-card">
            {!otherProfile && (
                <div
                    className="dashboard-card__icon_container"
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon
                        icon={faX}
                        className="dashboard-card__delete"
                    />
                </div>
            )}

            <Link
                to={`/profile/${username}/${index}`}
                state={{ id: textId }}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="dashboard-card__container">
                    <img
                        className="dashboard-card__img_container"
                        src={imageUrl}
                    />
                    <div className="dashboard-card__info">
                        <h3 className="dashboard-card__topic">
                            {formattedTopic}
                        </h3>
                        <div className="dashboard-card__date">
                            {formattedDate}
                        </div>
                        <div className="dashboard-card__date">
                            {finished ? "Finished" : "Not finished"}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DashboardCard;
