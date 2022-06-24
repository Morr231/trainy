import WelcomeExample from "./welcome-comp/welcome-example";

import MainLine from "../better/line";

import WelcomeBg from "./welcome-bg";

import CtaButton from "../../buttons/cta-button";

const Welcome = () => {
    return (
        <div className="welcome">
            <div className="welcome-bg-color"></div>

            <WelcomeBg />
            <div className="welcome-container">
                <h1 className="welcome-header">
                    Boost your <span className="header-first">copywriting</span>
                    <br />
                    productivity
                </h1>

                <div className="welcome-description">
                    Lorem helps with your copywriting routine by providing
                    random essay title
                </div>

                <CtaButton text="Try for free" buttonStyle="outline" />

                <WelcomeExample />

                <MainLine which="main-line" />
            </div>
        </div>
    );
};

export default Welcome;
