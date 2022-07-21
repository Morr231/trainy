import { useState } from "react";
import ReactDOM from "react-dom";

import CtaButton from "../buttons/cta-button";
import getCookie from "../../helper/getCookie";

const CommentModal = ({
    xPos,
    yPos,
    name,
    surname,
    img,
    userId,
    startPosition,
    endPosition,
    setShowCommentModal,
    topic,
    topicId,
    commentAdded,
    setCommentAdded,
}) => {
    const currDate = new Date();

    const minutes = `${Math.floor(currDate.getMinutes() / 10)}${Math.floor(
        currDate.getMinutes() % 10
    )}`;

    const currDateFixed = `${currDate.getDay()} ${currDate.toLocaleString(
        "en-us",
        {
            month: "long",
        }
    )} at ${currDate.getHours()}:${minutes}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        addComment(e.target.textarea.value);
    };

    const addComment = async (text) => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}text/comment/${topicId}`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    text: text,
                    date: currDate,
                    user: userId,
                    startPosition: startPosition,
                    endPosition: endPosition,
                    yPos: yPos,
                    topic: topic,
                }),
            }
        );
        const data = await responce.json();

        console.log(data);

        if (data.saved) {
            setCommentAdded(!commentAdded);
            setShowCommentModal(false);
        }
    };

    return ReactDOM.createPortal(
        <div
            className="comment-modal"
            style={{
                top: yPos,
                left: xPos + 20,
                transform: "translateY(-50%)",
            }}
        >
            <div className="comment-modal-container">
                <img src={img} alt="" className="comment-modal-img" />
                <div className="comment-modal-info">
                    <div className="comment-modal-name">
                        {name} {surname}
                    </div>
                    <div className="comment-modal-date">{currDateFixed}</div>
                </div>
            </div>
            <form className="comment-modal-form" onSubmit={handleSubmit}>
                <textarea
                    name="textarea"
                    cols="30"
                    rows="5"
                    className="comment-modal-form__textarea"
                ></textarea>

                <div className="comment-modal-form__container">
                    <CtaButton
                        text="Submit"
                        buttonStyle="solid"
                        type="submit"
                    />
                </div>
            </form>
        </div>,
        document.getElementById("portal")
    );
};

export default CommentModal;
