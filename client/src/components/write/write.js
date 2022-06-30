import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import WriteGenerator from "./write-comp/write-generator";
import WriteMain from "./write-comp/write-main";
import WriteAll from "./write-comp/write-all";

import DefaultTimer from "./write-comp/timers/default-timer";
import PomodoroTimer from "./write-comp/timers/pomodoro-timer";

const Write = () => {
    const [randomTopic, setRandomTopic] = useState([]);
    const [topicNumber, setTopicNumber] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [startWriting, setStartWriting] = useState(false);

    const [timer, setTimer] = useState(3);
    const [countDown, setCountDown] = useState(0);
    const [countDownEnd, setCountDownEnd] = useState(0);

    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    let interval;

    const setTimerCount = () => {
        if (timer !== 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            if (countDownEnd === 0) {
                interval = setTimeout(() => setCountDown(countDown + 1), 1000);
            }
        }
    };

    const stopTimerCount = () => {
        clearTimeout(interval);
        setCountDownEnd(countDown);
    };

    if (startWriting) {
        setTimerCount();
    }

    useEffect(() => {
        const getRandomTopic = async () => {
            const responce = await fetch("http://localhost:5000/randomTopic");
            const result = await responce.json();

            const resultArray = [];

            result.randomTopics.forEach((el) => {
                let generatedText = el.text;
                const lastLetter = generatedText[generatedText.length - 1];

                if (lastLetter !== "?") {
                    for (let i = generatedText.length - 1; i >= 0; i--) {
                        if (/^[a-zA-Z]+$/.test(generatedText[i])) {
                            if (i == generatedText.length - 1) {
                                generatedText += "?";
                            } else {
                                generatedText =
                                    generatedText.slice(0, i + 1) + "?";
                            }
                            break;
                        }
                    }
                }

                resultArray.push(generatedText);
            });

            setRandomTopic(resultArray);
        };

        getRandomTopic();
    }, []);

    return (
        <div className="write">
            {showAll ? (
                <WriteAll />
            ) : (
                <WriteGenerator
                    randomTopic={randomTopic}
                    topicNumber={topicNumber}
                    setTopicNumber={setTopicNumber}
                    setShowAll={setShowAll}
                    setStartWriting={setStartWriting}
                    startWriting={startWriting}
                />
            )}
            {startWriting && (
                <>
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
                    ) : currPath === "classic" ? (
                        <DefaultTimer
                            stopTimerCount={stopTimerCount}
                            countDown={countDown}
                        />
                    ) : (
                        currPath === "pomodoro" && (
                            <DefaultTimer
                                stopTimerCount={stopTimerCount}
                                countDown={countDown}
                            />
                        )
                    )}
                    <WriteMain
                        randomTopic={randomTopic}
                        topicNumber={topicNumber}
                        countDownEnd={countDownEnd}
                    />
                </>
            )}
        </div>
    );
};

export default Write;
