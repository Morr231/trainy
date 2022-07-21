import ReactDOM from "react-dom";

const CommentedModal = ({ xPos, yPos, name, surname, img, text, date }) => {
    const currDate = new Date(date);

    const minutes = `${Math.floor(currDate.getMinutes() / 10)}${Math.floor(
        currDate.getMinutes() % 10
    )}`;

    const currDateFixed = `${currDate.getDay()} ${currDate.toLocaleString(
        "en-us",
        {
            month: "long",
        }
    )} at ${currDate.getHours()}:${minutes}`;

    return ReactDOM.createPortal(
        <div
            className="comment-modal"
            style={{
                top: yPos,
                left: xPos + 20,
                transform: "translateY(-50%)",
            }}
        >
            <div className="comment-modal-container">
                <img src={img} alt="" className="comment-modal-img" />
                <div className="comment-modal-info">
                    <div className="comment-modal-name">
                        {name} {surname}
                    </div>
                    <div className="comment-modal-date">{currDateFixed}</div>
                </div>
            </div>

            <div className="comment-modal-text">{text}</div>
        </div>,
        document.getElementById("portal")
    );
};

export default CommentedModal;
