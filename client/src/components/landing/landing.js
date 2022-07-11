import Welcome from "./welcome/welcome";
import Better from "./better/better";
import Motivation from "./motivation/motivation";
import Slider from "./slider/slider";
import Profession from "./profession/profession";
import Cta from "./cta/cta";

const Landing = () => {
    return (
        <div className="landing">
            <Welcome />
            <Better />
            <Motivation />
            <Slider />
            <Profession />
            <Cta />
        </div>
    );
};

export default Landing;
