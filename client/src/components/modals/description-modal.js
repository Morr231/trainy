import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import getCookie from "../../helper/getCookie";

const DescriptionModal = ({ setShowDescriptionModal, username }) => {
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpload = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}settings/edit-profile`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({ description: inputRef.current.value }),
            }
        );
        const result = await responce.json();

        if (result.userChanged) {
            setShowDescriptionModal(false);
            dispatch(userUpdatedActions.setUserUpdated());
            navigate(`/profile/${username}`);
        }
    };

    return ReactDOM.createPortal(
        <div className="photo-upload-modal">
            <div className="description-change photo-upload-modal__container">
                <div className="photo-upload-modal__header">
                    Change your description
                </div>

                <textarea
                    rows="10"
                    cols="60"
                    name="text"
                    className="description-change__input"
                    ref={inputRef}
                ></textarea>

                <div className="photo-upload-modal__buttons">
                    <button
                        className="photo-upload-modal__button photo-modal__close_button"
                        onClick={() => setShowDescriptionModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="photo-upload-modal__button photo-modal__upload_button photo-modal__upload_button_active"
                        onClick={handleUpload}
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default DescriptionModal;
