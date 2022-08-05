import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import BrowserGenerator from "./browser-comp/browser-generator";
import Generate from "./1.png";

import video from "./browser-comp/123.mp4";

const Browser = ({ browserSwitch }) => {
    return (
        <div className="browser-video-container">
            <video src={video} className="browser-video" autoPlay muted></video>
        </div>
    );
};

export default Browser;

// <div className="browser">
{
    /* <div className="browser-header">
                <div className="browser-header__buttons">
                    <div className="browser-button-red browser-header__button"></div>
                    <div className="browser-header__button browser-button-yellow"></div>
                    <div className="browser-header__button browser-button-green"></div>
                </div>
                <div className="browser-header__search">
                    <div className="browser-header__search_container">
                        <div className="browser-header__search_icon">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <div className="browser-header__search_bar"></div>
                    </div>
                </div>
            </div> */
}

/* {browserSwitch === "generate" && (
                <img src={Generate} className="browser-image" />
            )} */

/* {browserSwitch === "generate" && <BrowserGenerator />} */
// </div>
