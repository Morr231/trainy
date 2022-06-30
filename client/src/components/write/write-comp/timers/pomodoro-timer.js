import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import CtaButton from "../../../buttons/cta-button";

const PomodoroTimer = ({ countDown, stopTimerCount }) => {
    const [hideContainer, setHideContainer] = useState(false);

    return (
        <div
            className={`write-container ${
                hideContainer && "write-container-hided"
            }`}
        >
            <div className="write-container__el">
                <FontAwesomeIcon
                    icon={faEye}
                    className="write-container-hide"
                    onClick={() => setHideContainer(!hideContainer)}
                />
            </div>
            {!hideContainer && (
                <>
                    <div className="write-container__el">
                        <div className="write-timer">
                            {Math.floor(countDown / 60 / 10)}
                            {Math.floor((countDown / 60) % 10)}:
                            {Math.floor((countDown % 60) / 10)}
                            {Math.floor((countDown % 60) % 10)}
                        </div>
                    </div>
                    <div className="write-container__el">
                        <CtaButton
                            text="stop"
                            buttonStyle="solid"
                            action={stopTimerCount}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default PomodoroTimer;
