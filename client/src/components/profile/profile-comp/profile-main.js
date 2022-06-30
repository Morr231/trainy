import React from "react";

const ProfileMain = () => {
    return (
        <div className="profile-main">
            <h2 className="profile-main__header">Your profile</h2>

            <div className="profile-main__container">
                <div className="profile-main__img_container">
                    {/* <img src="" alt="" className="profile-main__img" /> */}
                </div>

                <div className="profile-main__user_name">Almaz Balgali</div>
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
