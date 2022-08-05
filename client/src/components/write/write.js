import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import WriteGenerator from "./write-comp/write-generator";
import WriteMain from "./write-comp/write-main";
import WriteAll from "./write-comp/write-all";

import Timer from "./write-comp/timers/timer";

const Write = () => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [randomTopic, setRandomTopic] = useState([]);
    const [topicNumber, setTopicNumber] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [startWriting, setStartWriting] = useState(false);

    const [textId, setTextId] = useState(null);

    const [timer, setTimer] = useState(3);
    const [text, setText] = useState("");

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
                `${process.env.REACT_APP_IP}${
                    currPath === "ielts-second-part"
                        ? "randomIeltsFPTopic"
                        : "randomTopic"
                }`,
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
            {startWriting ? (
                <>
                    {timer ? (
                        <>
                            <div className="write-timer-first">{timer}</div>
                            <div className="write-cover"></div>
                        </>
                    ) : (
                        <div className="write-upper">
                            <WriteGenerator
                                randomTopic={randomTopic}
                                topicNumber={topicNumber}
                                setTopicNumber={setTopicNumber}
                                setShowAll={setShowAll}
                                setStartWriting={setStartWriting}
                                startWriting={startWriting}
                                first={false}
                            />
                            <Timer textId={textId} text={text} />
                        </div>
                    )}
                    <WriteMain
                        setTextId={setTextId}
                        randomTopic={randomTopic}
                        topicNumber={topicNumber}
                        text={text}
                        setText={setText}
                    />
                </>
            ) : showAll ? (
                <WriteAll />
            ) : (
                <WriteGenerator
                    randomTopic={randomTopic}
                    topicNumber={topicNumber}
                    setTopicNumber={setTopicNumber}
                    setShowAll={setShowAll}
                    setStartWriting={setStartWriting}
                    startWriting={startWriting}
                    first={true}
                />
            )}
        </div>
    );
};

export default Write;
