import React from "react";

import CtaButton from "../../../buttons/cta-button";

const FriendsCard = ({ img, name, surname, badges, recommendations }) => {
    return (
        <div className="friends-card">
            <div className="friends-card__container">
                <img src={img} className="friends-card__img" />
                <div className="friends-card__info">
                    <div className="friends-card__name">
                        {name} {surname}
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
                    {recommendations && (
                        <div className="friends-card__buttons">
                            <div className="friends-card__buttons_el">
                                <CtaButton text="Add" buttonStyle="solid" />
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
