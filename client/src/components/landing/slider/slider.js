import { useNavigate } from "react-router-dom";

import SliderRight from "./slider-comp/slider-right";
import SliderLeft from "./slider-comp/slider-left";

import CtaButton from "../../buttons/cta-button";

const Slider = () => {
    const navigate = useNavigate();

    return (
        <div className="slider">
            <SliderRight />
            <SliderLeft />

            <div className="slider-main">
                <div className="slider-main__cta">Random essay topic theme</div>
                <div className="slider-main__description">
                    Choose any topic and start writing on different themes
                </div>
                <CtaButton
                    text="Choose topic"
                    buttonStyle="solid"
                    action={() => navigate("/login")}
                />
            </div>

            <SliderRight />
            <SliderLeft />
        </div>
    );
};

export default Slider;
