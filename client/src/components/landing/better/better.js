import LineLeft from "./lineLeft";
import MainLine from "./line";
import LastLine from "./lastLine";

import Write from "./better-img/write.png";
import Thinking from "./better-img/thinking.png";
import Creativity from "./better-img/creativity.png";
import Niche from "./better-img/niche.png";

const Better = () => {
    return (
        <div className="better">
            <div className="better-container better-main">
                <img
                    src={Write}
                    className="better-illustrations first-illustration"
                />
                <h2 className="better-header">Train your writing skills</h2>
                <div className="better-description">
                    Practice as much as possible to become the best writer and
                    create engaging and well-thought-out papers with no effort.
                </div>
            </div>
            <LineLeft />
            <div className="better-container better-right">
                <img
                    src={Thinking}
                    className="better-illustrations second-illustration"
                />
                <h2 className="better-header">Improve critical thinking</h2>
                <div className="better-description">
                    Assess different arguments, come up with stronger positions
                    and observe different perspectives and views.
                </div>
            </div>
            <MainLine which="line-right" />
            <div className="better-container better-left">
                <img
                    src={Creativity}
                    className="better-illustrations third-illustration"
                />
                <h2 className="better-header">Train your creativity</h2>
                <div className="better-description">
                    Practice your creativity by regularly writing and become
                    more creative
                </div>
            </div>
            <LineLeft style={{ top: "95rem" }} />
            <div className="better-mobile better-container better-right">
                <img
                    src={Niche}
                    className="better-illustrations fourth-illustration"
                />
                <h2 className="better-header">
                    Increase your knowledge in different niches
                </h2>
                <div className="better-description">
                    Become professional writer by writing essays on different
                    niche and gain more knowledge.
                </div>
            </div>
            <LastLine />
        </div>
    );
};

export default Better;
