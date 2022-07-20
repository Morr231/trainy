import { useState, useRef, useEffect } from "react";

import CommentModal from "../../modals/comment-modal";

import CtaButton from "../../buttons/cta-button";

const TopicCard = ({ userInfo }) => {
    const textRef = useRef(null);
    const topicCardRef = useRef(null);

    let topicId = window.location.pathname.split("/");
    topicId = topicId[topicId.length - 1];

    const textsIndex = userInfo.texts.length - topicId - 1;

    const topic = userInfo.texts[textsIndex].topic;

    const [text, setText] = useState(userInfo.texts[textsIndex].text);
    const [pureText, setPureText] = useState(
        userInfo.texts[textsIndex].text.replace(/<[^>]+>/g, "")
    );

    const [comment, setComment] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const [yPos, setYPos] = useState(null);

    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);

    const handleCommnent = () => {
        setComment(!comment);
    };

    const handleMouseDown = () => {
        setText(text.replace(/<[^>]+>/g, ""));
        setShowCommentModal(false);
    };

    const handleTextSelection = (e) => {
        if (window.getSelection && comment) {
            const startPoint = window.getSelection().getRangeAt(0).startOffset;
            const endPoint = window.getSelection().getRangeAt(0).endOffset;

            setStartPosition(startPoint);
            setEndPosition(endPoint);

            setYPos(
                window.getSelection().getRangeAt(0).getBoundingClientRect().top
            );

            const startText = pureText.slice(0, startPoint);

            const resultText = `<span style="background-color: yellow;">${pureText.slice(
                startPoint,
                endPoint
            )}</span>`;

            const endText = pureText.slice(endPoint, pureText.length);

            setText(startText + resultText + endText);
            setShowCommentModal(true);
        }
    };

    return (
        <div className="topic-card" ref={topicCardRef}>
            {showCommentModal && (
                <CommentModal
                    xPos={topicCardRef.current.getBoundingClientRect().right}
                    yPos={yPos}
                    name={userInfo.name}
                    surname={userInfo.surname}
                    img={userInfo.imageUrl}
                    userId={userInfo["_id"]}
                    startPosition={startPosition}
                    endPosition={endPosition}
                    setShowCommentModal={setShowCommentModal}
                    topic={topic}
                />
            )}
            <div className="topic-card-top">
                <h3 className="topic-card-header">Your text:</h3>

                <div className="topic-card-top__buttons">
                    <div className="topic-card-top__button">
                        <CtaButton
                            text="Commentator mode"
                            buttonStyle="solid"
                            action={handleCommnent}
                        />
                    </div>
                    <div className="topic-card-top__button">
                        <CtaButton text="go back" buttonStyle="solid" />
                    </div>
                </div>
            </div>
            <h2 className="topic-card-main">{topic}</h2>
            <div className="topic-card-text__container">
                <div
                    className="topic-card-text"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleTextSelection}
                    ref={textRef}
                    dangerouslySetInnerHTML={{ __html: text }}
                ></div>
            </div>
        </div>
    );
};

export default TopicCard;
