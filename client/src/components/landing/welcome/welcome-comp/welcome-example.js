import { useState } from "react";

import Browser from "./browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLightbulb,
    faEdit,
    faRoute,
    faComment,
} from "@fortawesome/free-solid-svg-icons";

import generate from "./browser-comp/generate.mp4";
import write from "./browser-comp/write.mp4";
import share from "./browser-comp/share.mp4";
import achieve from "./browser-comp/achieve.mp4";

const WelcomeExample = () => {
    const [browserSwitch, setBrowserSwitch] = useState("generate");

    console.log(browserSwitch);

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
                    onClick={() => setBrowserSwitch("achieve")}
                >
                    <div className="welcome-icon-container">
                        <FontAwesomeIcon icon={faRoute} />
                    </div>
                    Achieve
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
            <Browser
                browserSwitch={browserSwitch}
                video={
                    browserSwitch === "generate"
                        ? generate
                        : browserSwitch === "write"
                        ? write
                        : browserSwitch === "achieve"
                        ? achieve
                        : share
                }
            />
        </div>
    );
};

export default WelcomeExample;
