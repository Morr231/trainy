import React from "react";
import { Link } from "react-router-dom";

import RegimesCard from "./regimes-comp/regimes-card";

import typewriter from "./regimes-img/typewriter.jpg";
import tomatoes from "./regimes-img/tomatoes.jpg";
import towerClock from "./regimes-img/tower-clock.jpg";
import Ielst from "./regimes-img/ielts.jpg";
import ten from "./regimes-img/10sec.jpg";

const Regimes = () => {
    return (
        <div className="regimes">
            <h2 className="regimes-header">Choose your regime</h2>

            <div className="regimes-container">
                <div className="regimes-container__el">
                    <Link
                        to="/write/classic"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard
                            name="Classic"
                            description="Play classic regime with no limitations"
                            img={typewriter}
                        />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/pomodoro"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard
                            name="Pomodoro"
                            description="Combine writing with pomodoro technique"
                            img={tomatoes}
                        />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/hardcore"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard
                            name="Hardcore"
                            description="Write an essay in limited time"
                            img={towerClock}
                        />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/10-sec"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard
                            name="10 sec"
                            description="If you don't write in 10 sec, your text will be deleted"
                            img={ten}
                        />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/ielts-second-part"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard
                            name="IELTS second part"
                            description="Write essay for IELTS second part topics"
                            img={Ielst}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Regimes;
