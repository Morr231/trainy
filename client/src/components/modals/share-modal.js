import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import getCookie from "../../helper/getCookie";
import { text } from "@fortawesome/fontawesome-svg-core";

const ShareModal = ({ setShowModal, textId }) => {
    const [postPrivacy, setPostPrivacy] = useState("private");

    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShare = () => {
        changeTextPrivacy();
        savePost();
    };

    const changeTextPrivacy = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}text/change-privacy`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    text: textId,
                    privacy: postPrivacy,
                }),
            }
        );

        const result = await responce.json();
    };

    const savePost = async () => {
        const responce = await fetch(`${process.env.REACT_APP_IP}post/save`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                autorization: getCookie("token"),
            },
            body: JSON.stringify({
                description: inputRef.current.value,
                date: new Date(),
                text: textId,
                privacy: postPrivacy,
            }),
        });

        const result = await responce.json();

        if (result.saved) {
            dispatch(userUpdatedActions.setUserUpdated());
            navigate(`/`);
        }
    };

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
                        onClick={handleShare}
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
