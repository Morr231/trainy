import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../../store/userUpdated";

import DashboardCard from "../../../profile/profile-comp/dashboard-card";
import FeedCardComments from "./feed-card-comment";

import getCookie from "../../../../helper/getCookie";

import lake from "./lake.webp";

const FeedCard = ({
    img,
    name,
    surname,
    date,
    description,
    postId,
    userId,
    likesNumber,
    dislikesNumber,
    whoLiked,
    whoDisliked,
    comments,
}) => {
    const dispatch = useDispatch();

    const [likePressed, setLikePressed] = useState(false);
    const [dislikePressed, setDislikePressed] = useState(false);

    const [allComments, setAllComments] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    useEffect(() => {
        if (whoLiked.indexOf(userId) !== -1) {
            setLikePressed(true);
        }
        if (whoDisliked.indexOf(userId) !== -1) {
            setDislikePressed(true);
        }
    }, []);

    useEffect(() => {
        const getComments = async () => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}post/get-comments`,
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        autorization: getCookie("token"),
                    },
                    body: JSON.stringify({
                        comments,
                    }),
                }
            );

            const data = await responce.json();
            if (data.found) {
                setAllComments(data.found);
                setAllUsers(data.users);
            }
        };

        getComments();
    }, []);

    const currDate = new Date(date);

    const minutes = `${Math.floor(currDate.getMinutes() / 10)}${Math.floor(
        currDate.getMinutes() % 10
    )}`;

    const currDateFixed = `${currDate.getDay()} ${currDate.toLocaleString(
        "en-us",
        {
            month: "long",
        }
    )} at ${currDate.getHours()}:${minutes}`;

    const handleLike = () => {
        let dislikedBefore = false;

        if (dislikePressed) {
            setDislikePressed(false);
            dislikedBefore = true;
        }

        setLikePressed(!likePressed);
        saveLike(dislikedBefore);
    };

    const saveLike = async (dislikedBefore) => {
        const responce = await fetch(`${process.env.REACT_APP_IP}post/like`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                autorization: getCookie("token"),
            },
            body: JSON.stringify({
                postId: postId,
                dislikedBefore: dislikedBefore,
                userId: userId,
                likePressed: likePressed,
            }),
        });

        const data = await responce.json();
        dispatch(userUpdatedActions.setUserUpdated());
    };

    const handleDislike = () => {
        let likedBefore = false;

        if (likePressed) {
            setLikePressed(false);
            likedBefore = true;
        }

        setDislikePressed(!dislikePressed);
        saveDislike(likedBefore);
    };

    const saveDislike = async (likedBefore) => {
        console.log(likedBefore);

        const responce = await fetch(
            `${process.env.REACT_APP_IP}post/dislike`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    postId: postId,
                    likedBefore: likedBefore,
                    userId: userId,
                    dislikePressed: dislikePressed,
                }),
            }
        );

        const data = await responce.json();
        dispatch(userUpdatedActions.setUserUpdated());
    };

    const handleComment = async (e) => {
        e.preventDefault();

        console.log("Hello");

        const responce = await fetch(
            `${process.env.REACT_APP_IP}post/comment`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    date: new Date(),
                    text: e.target.text.value,
                }),
            }
        );

        const data = await responce.json();
        dispatch(userUpdatedActions.setUserUpdated());
    };

    console.log(allUsers);

    return (
        <div className="feed-card">
            <div className="feed-card-container">
                <div className="feed-card-img__container">
                    <img src={img} alt="" className="feed-card-img" />
                </div>
                <div className="feed-card-details">
                    <div className="feed-card-name">
                        {name} {surname}
                    </div>
                    <div className="feed-card-data">{currDateFixed}</div>
                </div>
            </div>

            <div className="feed-card-description">{description}</div>

            <div className="feed-card-essay">
                <img src={lake} alt="" className="feed-card-essay__img" />
            </div>

            <div className="feed-card-numbers">
                <div className="feed-card-number feed-card-numbers__likes">
                    {likesNumber} Likes
                </div>
                <div className="feed-card-number feed-card-numbers__dislikes">
                    {dislikesNumber} Dislikes
                </div>
                <div className="feed-card-number feed-card-numbers__comments">
                    0 Comments
                </div>
            </div>

            <hr className="feed-card-line" />

            <div className="feed-card-buttons">
                <div
                    className={`feed-card-button ${
                        likePressed && "feed-card-button__like"
                    }`}
                    onClick={handleLike}
                >
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="feed-card-button__icon"
                    />
                    <div className="feed-card-button__text">Like</div>
                </div>
                <div
                    className={`feed-card-button ${
                        dislikePressed && "feed-card-button__dislike"
                    }`}
                    onClick={handleDislike}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="feed-card-button__icon"
                    />
                    Dislike
                </div>
            </div>

            <hr className="feed-card-line" />

            <div className="feed-card-comment">
                <div className="feed-card-comment__reply">
                    <div className="feed-card-comment__reply_img"></div>

                    <form
                        className="feed-card-comment__reply_form"
                        onSubmit={handleComment}
                    >
                        <input
                            type="text"
                            className="feed-card-comment__reply_form_input"
                            placeholder="Tweet your reply"
                            name="text"
                        />
                    </form>
                </div>

                <hr
                    className="feed-card-line"
                    style={{ marginBottom: "2rem" }}
                />

                <div className="feed-card-comment__all">
                    {allComments &&
                        allUsers &&
                        allComments.map((el) => {
                            const user = allUsers.filter((user) => {
                                return user.userId === el.user["_id"];
                            })[0];

                            return (
                                <FeedCardComments
                                    name={user.name}
                                    surname={user.surname}
                                    date={el.date}
                                    text={el.text}
                                    likes={el.likes.likesNumber}
                                    dislikes={el.dislikes.dislikesNumber}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default FeedCard;
