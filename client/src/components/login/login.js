import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import LoginMain from "./login-comp/login-main";

const loginSlider = [
    "TRACK YOUR ESSAY",
    "GET STATISTICS",
    "ACHIEVE",
    "ADD FRIENDS",
    "COMMENT ESSAY",
    "SHARE ESSAY",
];

const Login = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [currArr, setCurrArr] = useState([]);

    useEffect(() => {
        if (sliderIndex === 0) {
            setCurrArr([
                loginSlider[loginSlider.length - 1],
                loginSlider[0],
                loginSlider[1],
            ]);
        } else if (sliderIndex === loginSlider.length - 1) {
            setCurrArr([
                loginSlider[loginSlider.length - 2],
                loginSlider[loginSlider.length - 1],
                loginSlider[0],
            ]);
        } else {
            setCurrArr([
                loginSlider[sliderIndex - 1],
                loginSlider[sliderIndex],
                loginSlider[sliderIndex + 1],
            ]);
        }
    }, [sliderIndex]);

    let interval;

    useEffect(() => {
        interval = setInterval(
            () =>
                setSliderIndex((p) => {
                    if (p + 1 >= loginSlider.length) {
                        return 0;
                    }
                    return p + 1;
                }),
            3000
        );

        return () => clearInterval(interval);
    }, []);

    console.log(sliderIndex);

    return (
        <div className="login">
            <div className="login-left">
                <div className="login-slider">
                    {currArr.map((el, index, arr) => {
                        if (index === 0) {
                            return (
                                <h3 className="login-slider-header-second">
                                    {el}
                                </h3>
                            );
                        } else if (index === 2) {
                            return (
                                <h3 className="login-slider-header-second">
                                    {el}
                                </h3>
                            );
                        }
                        return <h3 className="login-slider-header">{el}</h3>;
                    })}
                </div>
            </div>
            <LoginMain />
        </div>
    );
};

export default Login;
