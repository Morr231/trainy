import React from "react";

const InstructionCard = ({ header, img, description }) => {
    return (
        <div className="instruction-card">
            <div className="instruction-card__header">{header}</div>
            <img src={img} className="instruction-card__img" />
            <div className="instruction-card__description">{description}</div>
        </div>
    );
};

export default InstructionCard;
