import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import getCookie from "../../helper/getCookie";

const ShareModal = ({ setShowModal, username }) => {
    const [postPrivacy, setPostPrivacy] = useState("private");

    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShare = async () => {
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
            dispatch(userUpdatedActions.setUserUpdated());
            navigate(`/profile/${username}`);
        }
    };

    console.log(postPrivacy);

    return ReactDOM.createPortal(
        <div className="photo-upload-modal">
            <div className="description-change photo-upload-modal__container">
                <form className="share-modal-form">
                    <div className="photo-upload-modal__header">
                        Set description for your post
                    </div>

                    <textarea
                        rows="5"
                        cols="60"
                        name="text"
                        className="description-change__input"
                        ref={inputRef}
                        style={{ marginBottom: "2rem" }}
                    ></textarea>

                    <div className="photo-upload-modal__header">
                        Choose your sharing mode
                    </div>

                    <div className="share-modal-form__container">
                        <button
                            className={`share-modal-form__button ${
                                postPrivacy === "friends"
                                    ? "share-modal-form__button-solid"
                                    : "share-modal-form__button-outline"
                            }`}
                            onClick={() => setPostPrivacy("friends")}
                            style={{ marginRight: "2rem" }}
                            type="button"
                        >
                            Only friends
                        </button>
                        <button
                            className={`share-modal-form__button ${
                                postPrivacy === "public"
                                    ? "share-modal-form__button-solid"
                                    : "share-modal-form__button-outline"
                            }`}
                            type="button"
                            onClick={() => setPostPrivacy("public")}
                        >
                            Public
                        </button>
                    </div>
                </form>

                <div className="photo-upload-modal__buttons">
                    <button
                        className="photo-upload-modal__button photo-modal__close_button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="photo-upload-modal__button photo-modal__upload_button photo-modal__upload_button_active"
                        onSubmit={handleShare}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default ShareModal;
