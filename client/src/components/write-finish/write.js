import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import WriteGenerator from "./write-comp/write-generator";
import WriteMain from "./write-comp/write-main";

import Timer from "./write-comp/timers/timer";

const Write = () => {
    const location = useLocation();

    const { state } = useLocation();
    const { text } = state;

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [startWriting, setStartWriting] = useState(false);

    const [timer, setTimer] = useState(3);

    let timerInterval;

    const setTimerCount = () => {
        if (timer !== 0) {
            timerInterval = setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            clearInterval(timerInterval);
        }
    };

    if (startWriting) {
        setTimerCount();
    }

    return (
        <div className="write">
            <WriteGenerator
                randomTopic={text.topic}
                setStartWriting={setStartWriting}
            />

            {timer ? (
                <>
                    <div
                        className="write-timer"
                        style={{ marginBottom: "3rem", height: "10vh" }}
                    >
                        {timer}
                    </div>
                    <div className="write-cover"></div>
                </>
            ) : (
                <Timer />
            )}

            <WriteMain topic={text.topic} prevText={text.text} />
        </div>
    );
};

export default Write;
