import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

import PhotoUpload from "../../../../modals/photo-upload";
import DescriptionModal from "../../../../modals/description-modal";

const SettingsHeader = ({ userInfo }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const handleDescriptionChange = () => {
        setShowDescriptionModal(true);
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

            {showDescriptionModal && (
                <DescriptionModal
                    setShowDescriptionModal={setShowDescriptionModal}
                    username={userInfo.username}
                />
            )}

            <div className="settings-header__img_container">
                <div
                    className="settings-header__img_container_icon"
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon
                        className="settings-header__img_icon"
                        icon={faCamera}
                    />
                </div>
                {userInfo.imageUrl ? (
                    <img
                        src={userInfo.imageUrl}
                        alt="user image"
                        className="settings-header__img"
                    />
                ) : (
                    <FontAwesomeIcon
                        className="settings-header__img_placeholder"
                        icon={faUser}
                    />
                )}
            </div>
            <div className="settins-header__info">
                <div className="settings-header__name">
                    {userInfo.name} {userInfo.surname}
                </div>
                <div className="settings-header__description">
                    <div className="settings-header__description_text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                    </div>
                    {/* <div
                        className="settings-header__img_container_icon settings-header__description_icon"
                        onClick={handleDescriptionChange}
                    >
                        <FontAwesomeIcon
                            className="settings-header__img_icon"
                            icon={faPen}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default SettingsHeader;
