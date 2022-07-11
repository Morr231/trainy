import React from "react";

const RegimesCard = ({ img, name, description }) => {
    return (
        <div className="regimes-card">
            <img className="regimes-card__img" src={img} />
            <div className="regimes-card__text">
                <div className="regimes-card__container">
                    <div className="regimes-card__header">{name}</div>
                    <div className="regimes-card__total_used">123,4K times</div>
                </div>
                <div className="regimes-card__content">{description}</div>
            </div>
        </div>
    );
};

export default RegimesCard;
