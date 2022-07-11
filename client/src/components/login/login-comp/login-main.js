import { useState } from "react";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import SignIn from "./sign-in";
import SignUp from "./sign-up";
import EmailVerification from "./email-verification";
import ForgotPassword from "./forgot-password";

const LoginMain = () => {
    const [sign, setSign] = useState(true);
    const [signUp, setSignUp] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);

    const [userData, setUserData] = useState({});

    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    console.log(forgotPassword);

    return (
        <div className="login-main">
            <div className="login-main__container">
                <h2 className="login-main__header">
                    {sign ? "Sign in" : "Sign Up"}
                </h2>
                <div className="login-main__cta">
                    Get started absolutely free
                </div>

                {signUp && (
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

                {sign ? (
                    <SignIn
                        setSign={setSign}
                        setForgotPassword={setForgotPassword}
                        setSignUp={setSignUp}
                    />
                ) : signUp ? (
                    <SignUp
                        setSign={setSign}
                        setUserData={setUserData}
                        setSignUp={setSignUp}
                    />
                ) : forgotPassword ? (
                    <ForgotPassword />
                ) : (
                    <EmailVerification
                        email={userData.email}
                        setSignUp={setSignUp}
                        userData={userData}
                    />
                )}
            </div>
        </div>
    );
};

export default LoginMain;
