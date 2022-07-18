import { useState, useEffect } from "react";

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

import getUserInfo from "../../helper/getUserInfo";

const ProfileDropdown = ({ setShowModal }) => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [userInfo, setUserInfo] = useState({});

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    useEffect(() => {
        if (userUpdated || !window.localStorage.getItem("userInfo")) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
        }
    }, [userUpdated]);

    return (
        <div className="header-dropdown profile-dropdown">
            <Link
                to={`/profile/${userInfo.username}`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className={`header-dropdown_icon ${
                            currPath === userInfo.username &&
                            "profile-icon__active"
                        }`}
                        icon={faUser}
                    />
                    <div className="header-dropdown__item_text">Profile</div>
                </div>
            </Link>
            <Link
                to={`/profile/${userInfo.username}/dashboard`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className={`header-dropdown_icon ${
                            currPath === "dashboard" && "profile-icon__active"
                        }`}
                        icon={faCalendar}
                    />
                    <div className="header-dropdown__item_text">Dashboard</div>
                </div>
            </Link>
            <Link
                to={`/profile/${userInfo.username}/statistics`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className={`header-dropdown_icon ${
                            currPath === "statistics" && "profile-icon__active"
                        }`}
                        icon={faChartLine}
                    />
                    <div className="header-dropdown__item_text">Statistics</div>
                </div>
            </Link>
            <Link
                to={`/profile/${userInfo.username}/achievements`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className={`header-dropdown_icon ${
                            currPath === "achievements" &&
                            "profile-icon__active"
                        }`}
                        icon={faTrophy}
                    />
                    <div className="header-dropdown__item_text">
                        Achievements
                    </div>
                </div>
            </Link>
            <Link
                to={`/profile/${userInfo.username}/settings`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className={`header-dropdown_icon ${
                            currPath === "settings" && "profile-icon__active"
                        }`}
                        icon={faCog}
                    />
                    <div className="header-dropdown__item_text">Settings</div>
                </div>
            </Link>
        </div>
    );
};

export default ProfileDropdown;
