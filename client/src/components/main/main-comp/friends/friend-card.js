import { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { otherUserActions } from "../../../../store/otherUser";

import CtaButton from "../../../buttons/cta-button";
import getCookie from "../../../../helper/getCookie";

const FriendsCard = ({ user, badges, recommendations, myId, incoming }) => {
    const dispatch = useDispatch();

    const [buttonClicked, setButtonClicked] = useState(true);

    const addFriend = async () => {
        const responce = await fetch(`${process.env.REACT_APP_IP}friend/add`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                autorization: getCookie("token"),
            },
            body: JSON.stringify({
                userId: user["_id"],
                myId: myId,
            }),
        });

        const data = await responce.json();

        if (data.saved) {
            setButtonClicked(false);
        }
    };

    const acceptFriend = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}friend/accept`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    userId: user["_id"],
                    myId: myId,
                }),
            }
        );

        const data = await responce.json();

        if (data.saved) {
            setButtonClicked(false);
        }
    };

    const handleLinkClick = () => {
        dispatch(otherUserActions.setOtherUserInfo(user));
    };

    return (
        <div className="friends-card">
            <div className="friends-card__container">
                <img src={user.imageUrl} className="friends-card__img" />
                <div className="friends-card__info">
                    <Link
                        to={`/profile/${user.username}`}
                        style={{ textDecoration: "none" }}
                        onClick={handleLinkClick}
                    >
                        <div className="friends-card__name">
                            {user.name} {user.surname}
                        </div>
                        <div className="friends-card__badges">{badges}</div>
                        <div className="friends-card__mutual_friends">
                            <div className="friends-card__mutual_friends_images">
                                <div className="friends-card__mutual_friends_images_el"></div>
                                <div className="friends-card__mutual_friends_images_el"></div>
                                <div className="friends-card__mutual_friends_images_el"></div>
                            </div>
                            <div className="friends-card__mutual_friends_number">
                                10 mutual friends
                            </div>
                        </div>
                    </Link>
                    {recommendations && buttonClicked && (
                        <div className="friends-card__buttons">
                            <div className="friends-card__buttons_el">
                                <CtaButton
                                    text={"Add"}
                                    buttonStyle="solid"
                                    action={addFriend}
                                />
                            </div>
                            <div className="friends-card__buttons_el">
                                <CtaButton text="Skip" buttonStyle="outline" />
                            </div>
                        </div>
                    )}
                    {incoming && buttonClicked && (
                        <div className="friends-card__buttons">
                            <div className="friends-card__buttons_el">
                                <CtaButton
                                    text={"Accept"}
                                    buttonStyle="solid"
                                    action={acceptFriend}
                                />
                            </div>
                            <div className="friends-card__buttons_el">
                                <CtaButton text="Skip" buttonStyle="outline" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendsCard;
