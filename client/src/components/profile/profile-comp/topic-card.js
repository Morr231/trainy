import { useState, useRef, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import CommentModal from "../../modals/comment-modal";
import CommentedModal from "../../modals/commented-modal";

import CtaButton from "../../buttons/cta-button";

import getCookie from "../../../helper/getCookie";

const TopicCard = ({ userInfo }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { id } = location.state;

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
    const [commentAdded, setCommentAdded] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    const [yPos, setYPos] = useState(null);

    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);

    const [allComments, setAllComments] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const [prevCommentHeight, setPrevCommentHeight] = useState(null);

    useEffect(() => {
        // const getUsers = async () => {
        //     const responce = await fetch(
        //         `${process.env.REACT_APP_IP}user/all-users/${userInfo["_id"]}`,
        //         {
        //             mode: "cors",
        //             credentials: "same-origin",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 autorization: getCookie("token"),
        //             },
        //         }
        //     );
        //     const data = await responce.json();

        //     if (data.found) {
        //         setAllUsers(data.found);
        //     }
        // };

        const addComment = async (text) => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}text/all-comments/${id}`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        autorization: getCookie("token"),
                    },
                }
            );
            const data = await responce.json();

            if (data.found) {
                setAllUsers(data.users);
                setAllComments(data.found);
            }
        };

        addComment();
        // getUsers();
    }, [commentAdded]);

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

    console.log(allUsers);

    return (
        <div className="topic-card" ref={topicCardRef}>
            {allComments &&
                allUsers &&
                allComments.map((el, index) => {
                    const commentedUser = allUsers.filter(
                        (user) => user.id === el.user
                    )[0];

                    return (
                        <CommentedModal
                            xPos={
                                topicCardRef.current.getBoundingClientRect()
                                    .right
                            }
                            yPos={
                                index === 0
                                    ? el.yPos
                                    : (prevCommentHeight + 10) * index + el.yPos
                            }
                            name={commentedUser.name}
                            surname={commentedUser.surname}
                            img={commentedUser.imageUrl}
                            text={el.text}
                            date={el.date}
                            setPrevCommentHeight={setPrevCommentHeight}
                        />
                    );
                })}

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
                    topicId={topicId}
                    commentAdded={commentAdded}
                    setCommentAdded={setCommentAdded}
                    textId={id}
                />
            )}
            <div className="topic-card-top">
                <h3 className="topic-card-header">Your text:</h3>

                <div className="topic-card-top__buttons">
                    {userInfo && !userInfo.texts[textsIndex].finished && (
                        <div className="topic-card-top__button">
                            <CtaButton
                                text="Finish writing"
                                buttonStyle="solid"
                                action={() =>
                                    navigate(
                                        `/write/finish/${userInfo.texts[textsIndex].regime}`,
                                        {
                                            state: {
                                                text: userInfo.texts[
                                                    textsIndex
                                                ],
                                            },
                                        }
                                    )
                                }
                            />
                        </div>
                    )}
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
