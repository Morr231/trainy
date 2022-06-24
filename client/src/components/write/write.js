import { useState, useEffect } from "react";

import Header from "../header/header";
import WriteGenerator from "./write-comp/write-generator";
import WriteMain from "./write-comp/write-main";
import WriteAll from "./write-comp/write-all";

import CtaButton from "../buttons/cta-button";

const Write = () => {
    const [randomTopic, setRandomTopic] = useState([]);
    const [topicNumber, setTopicNumber] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [startWriting, setStartWriting] = useState(false);

    const [timer, setTimer] = useState(5);
    const [countDown, setCountDown] = useState(0);

    let interval;

    const setTimerCount = () => {
        if (timer !== 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            interval = setTimeout(() => setCountDown(countDown + 1), 1000);
        }
    };

    const stopTimerCount = () => {
        clearTimeout(interval);
    };

    if (startWriting) {
        setTimerCount();
    }

    useEffect(() => {
        const getRandomTopic = async () => {
            const responce = await fetch("http://localhost:5000/randomTopic");
            const result = await responce.json();

            console.log(result);
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

    console.log(showAll);

    return (
        <div className="write">
            <div className="header-bg"></div>
            <Header />
            {showAll ? (
                <WriteAll />
            ) : (
                <WriteGenerator
                    randomTopic={randomTopic}
                    topicNumber={topicNumber}
                    setTopicNumber={setTopicNumber}
                    setShowAll={setShowAll}
                    setStartWriting={setStartWriting}
                />
            )}
            {startWriting && (
                <>
                    {timer ? (
                        <>
                            <div className="write-timer">{timer}</div>
                            <div className="write-cover"></div>
                        </>
                    ) : (
                        <div className="write-container">
                            <div></div>
                            <div className="write-timer">
                                {Math.floor(countDown / 60 / 10)}
                                {Math.floor((countDown / 60) % 10)}:
                                {Math.floor((countDown % 60) / 10)}
                                {Math.floor((countDown % 60) % 10)}
                            </div>
                            <CtaButton
                                text="stop"
                                buttonStyle="cta-button-solid"
                                action={stopTimerCount}
                            />
                        </div>
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
