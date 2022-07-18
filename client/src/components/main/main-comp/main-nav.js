import React from "react";

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNodes, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const linkStyle = {
    textDecoration: "none",
    display: "flex",
    marginBottom: "4.8rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
};

const MainNav = ({ userInfo }) => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    return (
        <div className="profile-nav main-nav">
            <div className="profile-nav__main">
                <Link to={`/feed`} style={linkStyle}>
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === "feed" &&
                                    "profile-icon__active"
                                }`}
                                icon={faCircleNodes}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === "feed" &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Feed
                        </div>
                    </div>
                </Link>
                <Link to={`/friends`} style={linkStyle}>
                    <div className="profile-nav__main_el">
                        <div className="profile-nav__icon_container">
                            <FontAwesomeIcon
                                className={`profile-nav__icon ${
                                    currPath === "friends" &&
                                    "profile-icon__active"
                                }`}
                                icon={faUserGroup}
                            />
                        </div>
                        <div
                            className={`profile-nav__text ${
                                currPath === "friends" &&
                                "profile-nav__text_active"
                            }`}
                        >
                            Friends
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MainNav;
