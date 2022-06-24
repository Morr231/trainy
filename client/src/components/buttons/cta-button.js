import React from "react";

const CtaButton = ({ text, buttonStyle, action }) => {
    return (
        <button
            className={`cta-button ${
                buttonStyle === "solid"
                    ? "cta-button-solid"
                    : "cta-button-outline"
            }`}
            onClick={action && action}
        >
            {text}
        </button>
    );
};

export default CtaButton;
