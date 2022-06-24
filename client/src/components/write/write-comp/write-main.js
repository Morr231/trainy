import { useState, useRef, useEffect, createRef } from "react";
import JoditEditor from "jodit-react";

const config = {
    buttons: ["bold", "italic", "underline"],
};

const WriteMain = ({ randomTopic, topicNumber }) => {
    const editor = useRef(null);
    const [text, setText] = useState("");

    const debounce = (fn, ms) => {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn.apply(this, arguments);
            }, ms);
        };
    };

    const getValue = (value) => {
        setText(value);
        console.log("hello");

        updateText({ value });
    };

    const tempValueFN = debounce(getValue, 1000);

    const updateText = async ({ value }) => {
        const textData = {
            text: value,
            topic: randomTopic[topicNumber],
            date: new Date(),
        };

        const responce = await fetch("http://localhost:5000/text/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                autorization: window.localStorage.getItem("token"),
            },
            body: JSON.stringify(textData),
        });
        const result = await responce.json();
    };

    return (
        <div className="write-main">
            <div className="write-main-container">
                <div className="write-main__form">
                    <JoditEditor
                        ref={editor}
                        value={text}
                        config={config}
                        tabIndex={1}
                        //   onBlur={(newContent) => getValue(newContent)}
                        onChange={tempValueFN}
                    />
                </div>
            </div>
        </div>
    );
};

export default WriteMain;
