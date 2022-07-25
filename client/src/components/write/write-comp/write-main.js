import React, { useState, useRef, useEffect, createRef } from "react";
import JoditEditor from "jodit-react";

import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userUpdatedActions } from "../../../store/userUpdated";
import { timerTimeActions } from "../../../store/timerTime";

import { useScreenshot } from "use-react-screenshot";

import debounce from "../../../helper/debounce";
import getCookie from "../../../helper/getCookie";
import getUserInfo from "../../../helper/getUserInfo";
import achievementsHandler from "../../../helper/achievementsHandler";

import AchieveModal from "../../modals/achieve-modal";

const config = {
    buttons: ["bold", "italic", "underline"],
};

const WriteMain = ({ randomTopic, topicNumber }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [text, setText] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [achieved, setAchieved] = useState("");

    const editor = useRef(null);
    const ref = createRef(null);

    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);

    const timerTime = useSelector((state) => state.timerTime.value);

    const essayFinished = useSelector((state) => state.timerTime.essayFinished);
    const pomodoroFinished = useSelector(
        (state) => state.timerTime.pomodoroFinished
    );
    const dangerousFinished = useSelector(
        (state) => state.timerTime.dangerousFinished
    );

    useEffect(() => {
        if (dangerousFinished) {
            setText("");
        }
    }, [dangerousFinished]);

    useEffect(() => {
        if (currPath === "10-sec" && text) {
            dispatch(timerTimeActions.setDangerousUpdated());
        }
    }, [text]);

    useEffect(() => {
        if (!window.localStorage.getItem("userInfo")) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
        }
    }, []);

    useEffect(() => {
        achievementsHandler({
            text: text,
            userInfo: userInfo,
            setUserInfo: setUserInfo,
            setAchieved: setAchieved,
        });
    }, [text]);

    useEffect(() => {
        if (image && text) {
            dispatch(timerTimeActions.changeValue());
            const formdata = new FormData();

            formdata.append("file", image);
            formdata.append(
                "upload_preset",
                process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            );
            formdata.append(
                "cloud_name",
                process.env.REACT_APP_CLOUDINARY_NAME
            );

            fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: "POST",
                body: formdata,
            })
                .then((responce) => responce.json())
                .then((data) => {
                    updateText({ text: text, imageUrl: data.url });

                    dispatch(userUpdatedActions.setUserUpdated());
                });
        }
    }, [image, timerTime]);

    const getValue = (value) => {
        setText(value);
        getImage();
    };

    const tempValueFN = debounce(getValue, 500);

    const updateText = async ({ text, imageUrl }) => {
        const textData = {
            text: text,
            regime: currPath,
            topic: randomTopic[topicNumber],
            date: new Date(),
            imageUrl: imageUrl,
            finished: essayFinished,
        };

        if (timerTime) {
            textData.timeSpend = timerTime;
        }

        if (essayFinished) {
            dispatch(timerTimeActions.setEssayFinishedFalse());
        }

        const responce = await fetch(`${process.env.REACT_APP_IP}text/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                autorization: getCookie("token"),
            },
            body: JSON.stringify(textData),
        });

        const result = await responce.json();
    };

    return (
        <div className="write-main">
            {achieved && <AchieveModal name={achieved} />}
            {pomodoroFinished && <div className="write-cover"></div>}
            <div className="write-main-container">
                <div className="write-main__form" ref={ref}>
                    <JoditEditor
                        ref={editor}
                        value={text}
                        config={config}
                        tabIndex={1}
                        onChange={tempValueFN}
                        height="500px"
                        spellCheck={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default WriteMain;
