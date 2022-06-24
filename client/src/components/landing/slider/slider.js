import SliderRight from "./slider-comp/slider-right";
import SliderLeft from "./slider-comp/slider-left";

const Slider = () => {
    return (
        <div className="slider">
            <SliderRight />
            <SliderLeft />

            <div className="slider-main">
                <div className="slider-main__cta">Random essay topic theme</div>
                <div className="slider-main__description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
                <button className="slider-main__button">Choose topic!</button>
            </div>

            <SliderRight />
            <SliderLeft />
        </div>
    );
};

export default Slider;
