import React from "react";

import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendar,
    faTrophy,
    faCog,
    faSignOut,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const linkStyle = {
    textDecoration: "none",
    display: "flex",
    marginBottom: "4.8rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
};

const ProfileNav = ({ userInfo }) => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const otherUserInfo = useSelector((state) => {
        return state.otherUser.otherUserInfo;
    });

    return (
        <div className="profile-nav">
            <div className="profile-nav__main">
                <Link to={`/profile/${userInfo.username}`} style={linkStyle}>
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === userInfo.username &&
                                    "profile-icon__active"
                                }`}
                                icon={faUser}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === userInfo.username &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Profile
                        </div>
                    </div>
                </Link>
                <Link
                    to={`/profile/${userInfo.username}/dashboard`}
                    style={linkStyle}
                >
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === "dashboard" &&
                                    "profile-icon__active"
                                }`}
                                icon={faCalendar}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === "dashboard" &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Dashboard
                        </div>
                    </div>
                </Link>
                <Link
                    to={`/profile/${userInfo.username}/statistics`}
                    style={linkStyle}
                >
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === "statistics" &&
                                    "profile-icon__active"
                                }`}
                                icon={faChartLine}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === "statistics" &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Statistics
                        </div>
                    </div>
                </Link>
                <Link
                    to={`/profile/${userInfo.username}/achievements`}
                    style={linkStyle}
                >
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === "achievements" &&
                                    "profile-icon__active"
                                }`}
                                icon={faTrophy}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === "achievements" &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Achievements
                        </div>
                    </div>
                </Link>
                {!otherUserInfo && (
                    <Link
                        to={`/profile/${userInfo.username}/settings`}
                        style={linkStyle}
                    >
                        <div className="profile-nav__main_el">
                            <div className="profile-nav__icon_container">
                                <FontAwesomeIcon
                                    className={`profile-nav__icon ${
                                        currPath === "settings" &&
                                        "profile-icon__active"
                                    }`}
                                    icon={faCog}
                                />
                            </div>
                            <div
                                className={`profile-nav__text ${
                                    currPath === "settings" &&
                                    "profile-nav__text_active"
                                }`}
                            >
                                Settings
                            </div>
                        </div>
                    </Link>
                )}
            </div>

            {!otherUserInfo && (
                <FontAwesomeIcon
                    className="profile-nav__disconnect"
                    icon={faSignOut}
                />
            )}
        </div>
    );
};

export default ProfileNav;
