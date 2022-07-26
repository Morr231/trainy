import React from "react";

import CtaButton from "../../../buttons/cta-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const FeedPlaceholder = () => {
    const navigate = useNavigate();

    return (
        <div className="feed-placeholder">
            <FontAwesomeIcon
                className="feed-placeholder-icon"
                icon={faUserPlus}
            />

            <div className="feed-placeholder-header">Find friends</div>

            <div className="feed-placeholder-description">
                Find friends to view posts that they have shared
            </div>

            <CtaButton
                text="Find friends"
                buttonStyle="solid"
                action={() => navigate("/friends")}
            />
        </div>
    );
};

export default FeedPlaceholder;
