import React from "react";
import { Link } from "react-router-dom";

import RegimesCard from "./regimes-comp/regimes-card";

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
                        <RegimesCard />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/pomodoro"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard />
                    </Link>
                </div>
                <div className="regimes-container__el">
                    <Link
                        to="/write/pomodoro"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RegimesCard />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Regimes;
