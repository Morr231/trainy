import React from "react";

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendar,
    faTrophy,
    faCog,
    faSignOut,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const ProfileNav = ({ userInfo }) => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    return (
        <div className="profile-nav">
            <div className="profile-nav__main">
                <Link to={`/profile/${userInfo.username}`}>
                    <FontAwesomeIcon
                        className={`profile-nav__icon ${
                            currPath === userInfo.username &&
                            "profile-icon__active"
                        }`}
                        icon={faUser}
                    />
                </Link>
                <Link to={`/profile/${userInfo.username}/dashboard`}>
                    <FontAwesomeIcon
                        className={`profile-nav__icon ${
                            currPath === "dashboard" && "profile-icon__active"
                        }`}
                        icon={faCalendar}
                    />
                </Link>
                <Link to={`/profile/${userInfo.username}/statistics`}>
                    <FontAwesomeIcon
                        className={`profile-nav__icon ${
                            currPath === "statistics" && "profile-icon__active"
                        }`}
                        icon={faChartLine}
                    />
                </Link>
                <Link to={`/profile/${userInfo.username}/achievements`}>
                    <FontAwesomeIcon
                        className={`profile-nav__icon ${
                            currPath === "achievements" &&
                            "profile-icon__active"
                        }`}
                        icon={faTrophy}
                    />
                </Link>
                <Link to={`/profile/${userInfo.username}/settings`}>
                    <FontAwesomeIcon
                        className={`profile-nav__icon ${
                            currPath === "settings" && "profile-icon__active"
                        }`}
                        icon={faCog}
                    />
                </Link>
            </div>

            <FontAwesomeIcon
                className="profile-nav__disconnect"
                icon={faSignOut}
            />
        </div>
    );
};

export default ProfileNav;
