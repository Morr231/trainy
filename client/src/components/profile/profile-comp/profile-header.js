import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const ProfileHeader = () => {
    return (
        <div className="profile-header">
            <div className="profile-header__logo_container"></div>
            <div className="profile-header__container">
                <div className="profile-header__heading">Dashboard</div>
                <Link to="/write">
                    <div className="profile-header__link">Write</div>
                </Link>
                <div className="profile-header__user">
                    {/* <div className="profile-header__user_notifications">
                        <FontAwesomeIcon icon={faBell} />
                    </div> */}
                    <div className="profile-header__user_main"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
