import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { useLocation } from "react-router-dom";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import SignIn from "./sign-in";
import SignUp from "./sign-up";
import EmailVerification from "./email-verification";
import ForgotPassword from "./forgot-password";

const LoginMain = () => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [forgotPassword, setForgotPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const [userData, setUserData] = useState({});

    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    return (
        <div className="login-main">
            <div className="login-main__container">
                <h2 className="login-main__header">
                    {currPath === "login" ? "Sign in" : "Sign Up"}
                </h2>
                <div className="login-main__cta">
                    Get started absolutely free
                </div>

                {currPath === "login" && currPath === "sign-up" && (
                    <div className="login-main__sign_other">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLEID}
                            buttonText="Sign in with google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            className="login-main__sign_other_el"
                        />

                        <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOKID}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="facebook_login login-main__sign_other_el"
                            icon="fa-facebook"
                            textButton="Sign in with facebook"
                        />
                    </div>
                )}

                {currPath === "login" && (
                    <SignIn setForgotPassword={setForgotPassword} />
                )}

                <Routes>
                    <Route
                        path="/sign-up"
                        element={<SignUp setUserData={setUserData} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword setUserData={setUserData} />}
                    />
                    <Route
                        path="/email-verification"
                        element={
                            <EmailVerification
                                userData={userData}
                                forgotPassword={forgotPassword}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default LoginMain;
