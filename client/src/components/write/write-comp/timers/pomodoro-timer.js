import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import CtaButton from "../../../buttons/cta-button";

const PomodoroTimer = ({ stopTimerCount }) => {
    const [hideContainer, setHideContainer] = useState(false);

    const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60);
    const [restTimer, setRestTimer] = useState(0);

    let pomodoroInterval;
    let restInterval;

    const setPomodoorTimerCount = () => {
        if (pomodoroTimer !== 0 && restTimer === 0) {
            clearInterval(restInterval);
            pomodoroInterval = setTimeout(
                () => setPomodoroTimer(pomodoroTimer - 1),
                1000
            );
        } else {
            clearInterval(pomodoroInterval);
            restInterval = setTimeout(() => setRestTimer(restTimer - 1), 1000);
        }
    };

    const setTimeMode = (timer) => {
        let minute = `${Math.floor(timer / 60 / 10)}${Math.floor(
            (timer / 60) % 10
        )}`;
        let sec = `${Math.floor((timer % 60) / 10)}${Math.floor(
            (timer % 60) % 10
        )}`;

        return minute + ":" + sec;
    };

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
                            {pomodoroTimer !== 0
                                ? setTimeMode(pomodoroTimer)
                                : setTimeMode(restTimer)}
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
