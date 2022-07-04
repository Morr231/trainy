import ReactDOM from "react-dom";
import "./achieve.sass";

const AchieveModal = ({ name }) => {
    return ReactDOM.createPortal(
        <div className="achieve-modal">
            <div className="achieve-modal__icon">
                <div className="main-container">
                    <div className="check-container">
                        <div className="check-background">
                            <SvgComponent />
                        </div>
                        <div className="check-shadow"></div>
                    </div>
                </div>
            </div>
            <div className="achieve-modal__name">{name}</div>
        </div>,
        document.getElementById("portal")
    );
};

const SvgComponent = (props) => (
    <svg
        viewBox="0 0 65 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="m7 25 20.308 19L58.5 7" stroke="#fff" />
    </svg>
);

export default AchieveModal;