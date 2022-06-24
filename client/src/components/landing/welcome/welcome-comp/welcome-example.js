import { useState } from "react";

import Browser from "./browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLightbulb,
    faEdit,
    faRoute,
    faComment,
} from "@fortawesome/free-solid-svg-icons";

const WelcomeExample = () => {
    const [browserSwitch, setBrowserSwitch] = useState("generate");

    return (
        <div className="welcome-example">
            <div className="welcome-example__switch">
                <div
                    className="welcome-example__switch_item"
                    onClick={() => setBrowserSwitch("generate")}
                >
                    <div className="welcome-icon-container">
                        <FontAwesomeIcon icon={faLightbulb} />
                    </div>
                    Generate
                </div>
                <div
                    className="welcome-example__switch_item"
                    onClick={() => setBrowserSwitch("write")}
                >
                    <div className="welcome-icon-container">
                        <FontAwesomeIcon icon={faEdit} />
                    </div>
                    Write
                </div>
                <div
                    className="welcome-example__switch_item"
                    onClick={() => setBrowserSwitch("set-goal")}
                >
                    <div className="welcome-icon-container">
                        <FontAwesomeIcon icon={faRoute} />
                    </div>
                    Set goal
                </div>
                <div
                    className="welcome-example__switch_item"
                    onClick={() => setBrowserSwitch("share")}
                >
                    <div className="welcome-icon-container">
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    Share
                </div>
            </div>
            <Browser browserSwitch={browserSwitch} />
        </div>
    );
};

export default WelcomeExample;
