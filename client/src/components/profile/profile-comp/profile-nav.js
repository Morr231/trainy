import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faCog,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const ProfileNav = ({ userInfo }) => {
    return (
        <div className="profile-nav">
            <div className="profile-nav__main">
                <Link to={`/profile/${userInfo.username}`}>
                    <FontAwesomeIcon
                        className="profile-nav__icon profile-icon__active"
                        icon={faCalendar}
                    />
                </Link>
                {/* <FontAwesomeIcon className="profile-nav__icon" icon={faCog} /> */}
            </div>

            <FontAwesomeIcon
                className="profile-nav__disconnect"
                icon={faSignOut}
            />
        </div>
    );
};

export default ProfileNav;
