import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileMain = ({ userInfo }) => {
    return (
        <div className="profile-main">
            <div className="profile-main__container">
                <div className="profile-main__img_container">
                    {userInfo.imageUrl ? (
                        <img
                            src={userInfo.imageUrl}
                            alt="user image"
                            className="settings-header__img"
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="profile-main__img_icon"
                            icon={faUser}
                        />
                    )}
                </div>

                <div className="profile-main__user_name">
                    {userInfo.name} {userInfo.surname}
                </div>
                <div className="profile-main__user_description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="profile-main__user_achievements">
                    <div className="profile-main__user_achievement">
                        Best writer
                    </div>
                    <div className="profile-main__user_achievement">
                        The fastest
                    </div>
                    <div className="profile-main__user_achievement">
                        The Best
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileMain;
