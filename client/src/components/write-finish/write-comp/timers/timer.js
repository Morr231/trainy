import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../../../store/userUpdated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import CtaButton from "../../../buttons/cta-button";

import DefaultTimer from "./default-timer";
import PomodoroTimer from "./pomodoro-timer";
import HardcoreTimer from "./hardcore-timer";
import DangerousTimer from "./dangerous-timer";
import IeltsSPTimer from "./ielts-second-part";

import ShareModal from "../../../modals/share-modal";

const Timer = ({ textId, text }) => {
    const [hideContainer, setHideContainer] = useState(false);
    const [stopTimer, setStopTimer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [countDown, setCountDown] = useState(0);

    const [WPM, setWPM] = useState(0);

    const dispatch = useDispatch();
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const stopTimerCount = () => {
        setStopTimer(true);
        dispatch(userUpdatedActions.setUserUpdated());
    };

    const handleShare = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (text.length) {
            const totalWords = text.split(" ").length;
            setWPM(Math.floor(totalWords / (countDown / 60)));
        }
    }, [text]);

    return (
        <div className="write-timer-main">
            {showModal && (
                <ShareModal setShowModal={setShowModal} textId={textId} />
            )}
            {!hideContainer ? (
                <>
                    <FontAwesomeIcon
                        icon={faEye}
                        className="write-container-hide"
                        onClick={() => setHideContainer(!hideContainer)}
                    />
                    <div className="write-statistics">
                        <h3 className="write-statistics-header">Your stats:</h3>
                        <div className="write-statistics-container">
                            <div className="write-statistics-container-timer">
                                <div className="write-statistics-container-timer-text">
                                    Timer
                                </div>
                                {currPath === "classic" ? (
                                    <DefaultTimer
                                        stopTimer={stopTimer}
                                        countDown={countDown}
                                        setCountDown={setCountDown}
                                    />
                                ) : currPath === "pomodoro" ? (
                                    <PomodoroTimer
                                        stopTimer={stopTimer}
                                        countDown={countDown}
                                        setCountDown={setCountDown}
                                    />
                                ) : currPath === "hardcore" ? (
                                    <HardcoreTimer
                                        stopTimer={stopTimer}
                                        setStopTimer={setStopTimer}
                                        countDown={countDown}
                                        setCountDown={setCountDown}
                                    />
                                ) : currPath === "10-sec" ? (
                                    <DangerousTimer
                                        stopTimer={stopTimer}
                                        setStopTimer={setStopTimer}
                                        countDown={countDown}
                                        setCountDown={setCountDown}
                                    />
                                ) : (
                                    <IeltsSPTimer
                                        stopTimer={stopTimer}
                                        setStopTimer={setStopTimer}
                                        countDown={countDown}
                                        setCountDown={setCountDown}
                                    />
                                )}
                            </div>

                            <div className="write-total">
                                <div className="write-total-text">
                                    Word Count
                                </div>
                                <div className="write-total-number">
                                    {text.split(" ").length - 1}
                                </div>
                            </div>
                            <div className="write-wpm">
                                <div className="write-wpm-text">WPM</div>
                                <div className="write-wpm-number">{WPM}</div>
                            </div>
                        </div>
                    </div>
                    <div className="write-timer-buttons">
                        {stopTimer && (
                            <div
                                className="write-container__el"
                                style={{ marginRight: "2rem" }}
                            >
                                <CtaButton
                                    text="share"
                                    buttonStyle="solid"
                                    action={handleShare}
                                />
                            </div>
                        )}
                        <div className="write-container__el">
                            <CtaButton
                                text="stop"
                                buttonStyle="solid"
                                action={stopTimerCount}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="write-container__el">
                    <FontAwesomeIcon
                        icon={faEye}
                        className="write-container-hide"
                        onClick={() => setHideContainer(!hideContainer)}
                    />
                </div>
            )}
        </div>
    );
};

export default Timer;
