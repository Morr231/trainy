import React, { useState, useRef, useEffect, createRef } from "react";
import JoditEditor from "jodit-react";

import { useScreenshot } from "use-react-screenshot";

const config = {
    buttons: ["bold", "italic", "underline"],
};

const WriteMain = React.memo(function MemoWriteMain({
    randomTopic,
    topicNumber,
    countDownEnd,
}) {
    const [text, setText] = useState("");

    const editor = useRef(null);
    const ref = createRef(null);

    const [image, takeScreenshot] = useScreenshot();
    const getImage = () => takeScreenshot(ref.current);

    useEffect(() => {
        if (image) {
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
                });
        }
    }, [image, countDownEnd]);

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
        getImage();
    };

    const tempValueFN = debounce(getValue, 1000);

    const updateText = async ({ text, imageUrl }) => {
        const textData = {
            text: text,
            topic: randomTopic[topicNumber],
            date: new Date(),
            imageUrl: imageUrl,
        };

        if (countDownEnd) {
            textData.timeSpend = countDownEnd;
        }

        console.log(countDownEnd, textData);

        const responce = await fetch(`${process.env.REACT_APP_IP}text/save`, {
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
                <div className="write-main__form" ref={ref}>
                    <JoditEditor
                        ref={editor}
                        value={text}
                        config={config}
                        tabIndex={1}
                        //   onBlur={(newContent) => getValue(newContent)}
                        onChange={tempValueFN}
                        height="500px"
                        spellCheck={1}
                    />
                </div>
            </div>
        </div>
    );
});

export default WriteMain;
