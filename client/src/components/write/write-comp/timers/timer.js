import { useState } from "react";

import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../../store/userUpdated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import CtaButton from "../../../buttons/cta-button";

import DefaultTimer from "./default-timer";
import PomodoroTimer from "./pomodoro-timer";

const Timer = () => {
    const [hideContainer, setHideContainer] = useState(false);
    const [stopTimer, setStopTimer] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const stopTimerCount = () => {
        setStopTimer(true);
        dispatch(userUpdatedActions.setUserUpdatedTrue());
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
                        {currPath === "classic" ? (
                            <DefaultTimer stopTimer={stopTimer} />
                        ) : (
                            <PomodoroTimer stopTimer={stopTimer} />
                        )}
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

export default Timer;
