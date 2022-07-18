import { useNavigate } from "react-router-dom";

import WelcomeExample from "./welcome-comp/welcome-example";

import MainLine from "../better/line";
import WelcomeBg from "./welcome-bg";

import CtaButton from "../../buttons/cta-button";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome">
            <div className="welcome-bg-color"></div>

            <WelcomeBg />
            <div className="welcome-container">
                <div className="welcome-main">
                    <h1 className="welcome-header">
                        Boost your{" "}
                        <span className="header-first">Copywriting</span>
                        <br />
                        productivity
                    </h1>

                    <div className="welcome-description">
                        Lorem helps with your copywriting routine by providing
                        random essay title
                    </div>

                    <CtaButton
                        text="Try for free"
                        buttonStyle="outline"
                        action={() => navigate("/login")}
                    />
                </div>

                <WelcomeExample />

                <MainLine which="main-line" />
            </div>
        </div>
    );
};

export default Welcome;
