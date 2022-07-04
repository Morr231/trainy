import { useState, useEffect } from "react";

import WriteGenerator from "./write-comp/write-generator";
import WriteMain from "./write-comp/write-main";
import WriteAll from "./write-comp/write-all";

import Timer from "./write-comp/timers/timer";

import AchieveModal from "../modals/achieve-modal";

const Write = () => {
    const [randomTopic, setRandomTopic] = useState([]);
    const [topicNumber, setTopicNumber] = useState(0);
    const [showAll, setShowAll] = useState(false);
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

    useEffect(() => {
        const getRandomTopic = async () => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}randomTopic`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                }
            );
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
            {/* {timer === 0 && countDown >= 0.3 && countDown <= 3 && (
                <AchieveModal name="first essay" />
            )} */}

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
                    ) : (
                        <Timer />
                    )}
                    <WriteMain
                        randomTopic={randomTopic}
                        topicNumber={topicNumber}
                    />
                </>
            )}
        </div>
    );
};

export default Write;
