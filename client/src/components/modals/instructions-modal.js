import { useState } from "react";
import ReactDOM from "react-dom";

import { useDispatch } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import InstructionCard from "./instruction-card";

import getCookie from "../../helper/getCookie";
import { instructionImages } from "./instruction-img/instruction-img";

const InstructionsModal = ({ setUserInfo, setShowModal }) => {
    const [currentInstruction, setCurrentInstruction] = useState(0);
    const dispatch = useDispatch();

    const handleNext = () => {
        if (currentInstruction < instructionImages.length - 1) {
            setCurrentInstruction(currentInstruction + 1);
        }
    };

    const handlePrev = () => {
        if (currentInstruction > 0) {
            setCurrentInstruction(currentInstruction - 1);
        }
    };

    const closeModal = async () => {
        console.log(setShowModal);

        if (!setShowModal) {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}user/first-enter`,
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        autorization: getCookie("token"),
                    },
                }
            );
            const result = await responce.json();

            window.localStorage.setItem(
                "userInfo",
                JSON.stringify(result.userInfo)
            );

            setUserInfo(result.userInfo);

            dispatch(userUpdatedActions.setUserUpdatedTrue);
        } else {
            setShowModal(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="instruction-modal">
            <div className="instruction-modal__container">
                <div className="instruction-modal__main">
                    <div className="instruction-modal__upper">
                        <div className="instruction-modal__number">{`${
                            currentInstruction + 1
                        }/${instructionImages.length}`}</div>
                        <div
                            className="instruction-modal__close"
                            onClick={closeModal}
                        >
                            <FontAwesomeIcon
                                className="instruction-modal__close_icon"
                                icon={faX}
                            />
                        </div>
                    </div>

                    <InstructionCard
                        header={instructionImages[currentInstruction].header}
                        img={instructionImages[currentInstruction].img}
                        description={
                            instructionImages[currentInstruction].description
                        }
                    />
                </div>
                <div className="instruction-modal__buttons">
                    <button
                        className="instruction-modal__button"
                        onClick={handlePrev}
                    >
                        Previous
                    </button>
                    <button
                        className={`instruction-modal__button`}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default InstructionsModal;
