import React from "react";

const CtaButton = ({ text, buttonStyle, action, type, comment }) => {
    return (
        <button
            className={`cta-button ${
                buttonStyle === "solid"
                    ? "cta-button-solid"
                    : "cta-button-outline"
            } ${comment === "cta-button-comment"}`}
            onClick={action && action}
            type={type && type}
        >
            {text}
        </button>
    );
};

export default CtaButton;
