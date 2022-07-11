import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import getCookie from "../../../helper/getCookie";

const DashboardCard = ({
    topic,
    date,
    imageUrl,
    index,
    username,
    textsLength,
    setCardDeleted,
}) => {
    const unformattedDate = new Date(date).toDateString().split(" ");
    const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

    let formattedTopic = topic;

    if (typeof formattedTopic !== "undefined" && formattedTopic.length > 40) {
        formattedTopic = formattedTopic.slice(0, 40) + "...";
    }

    console.log(topic, textsLength - index - 1);

    const deleteText = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}text/delete/${textsLength - index - 1}`,
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
        if (data.deleted) {
            setCardDeleted(true);
        }
        console.log("deleted", data);
    };

    return (
        <div className="dashboard-card">
            <div
                className="dashboard-card__icon_container"
                onClick={deleteText}
            >
                <FontAwesomeIcon
                    icon={faX}
                    className="dashboard-card__delete"
                />
            </div>

            <Link
                to={`/profile/${username}/${index}`}
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
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DashboardCard;
