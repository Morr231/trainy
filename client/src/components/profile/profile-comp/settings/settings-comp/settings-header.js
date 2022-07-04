import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import PhotoUpload from "../../../../modals/photo-upload";

const SettingsHeader = ({ userInfo }) => {
    const [showModal, setShowModal] = useState(false);

    const getUserData = (e) => {
        setShowModal(true);

        // e.preventDefault();
        // console.log(e.target);
        // const userData = {};
        // editUser(userData);
    };

    const editUser = async (userData) => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}settings/edit-profile`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(userData),
            }
        );
        const data = await responce.json();
        console.log(data);

        if (data.userChanged) {
            // dispatch(authActions.logout());
            // window.localStorage.removeItem("token");
            // navigate(`/`);
        }
    };

    console.log(userInfo);

    return (
        <div className="settings-header">
            {showModal && (
                <PhotoUpload
                    setShowModal={setShowModal}
                    username={userInfo.username}
                />
            )}

            <div className="settings-header__img_container">
                <div
                    className="settings-header__img_container_icon"
                    onClick={getUserData}
                >
                    <FontAwesomeIcon
                        className="settings-header__img_icon"
                        icon={faCamera}
                    />
                </div>
                {userInfo.imageUrl && (
                    <img
                        src={userInfo.imageUrl}
                        alt="user image"
                        className="settings-header__img"
                    />
                )}
            </div>
            <div className="settins-header__info">
                <div className="settings-header__name">Almaz Balgali</div>
                <div className="settings-header__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
            </div>
        </div>
    );
};

export default SettingsHeader;
