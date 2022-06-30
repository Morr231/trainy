import React from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteCardActions } from "../../../store/deleteCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const DashboardCard = ({ topic, date, imageUrl, index, username }) => {
    const dispatch = useDispatch();

    const unformattedDate = new Date(date).toDateString().split(" ");
    const formattedDate = `${unformattedDate[2]} ${unformattedDate[1]} ${unformattedDate[3]}`;

    let formattedTopic = topic;

    if (typeof formattedTopic !== "undefined" && formattedTopic.length > 40) {
        formattedTopic = formattedTopic.slice(0, 40) + "...";
    }

    const deleteText = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}text/delete/${index}`,
            {
                method: "DELETE",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    autorization: localStorage.getItem("token"),
                },
            }
        );
        const data = await responce.json();
        if (data.deleted) {
            dispatch(deleteCardActions.setDeleteCard());
        }
        console.log("deleted", data);
    };

    return (
        <div className="dashboard-card">
            <div className="dashboard-card__icon_container">
                <FontAwesomeIcon
                    icon={faX}
                    className="dashboard-card__delete"
                    onClick={deleteText}
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
