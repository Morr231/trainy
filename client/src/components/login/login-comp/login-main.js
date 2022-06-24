import { useState } from "react";

import SignIn from "./sign-in";
import SignUp from "./sign-up";

import google_img from "../login-img/google.png";
import facebook_img from "../login-img/facebook.png";
import apple_img from "../login-img/apple.png";

const LoginMain = () => {
    const [sign, setSign] = useState(true);

    return (
        <div className="login-main">
            <div className="login-main__container">
                <h2 className="login-main__header">
                    {sign ? "Sign in" : "Sign Up"}
                </h2>
                <div className="login-main__cta">
                    Get started absolutely free
                </div>

                <div className="login-main__sign_in_other">
                    <div className="login-main__sign_in_google">
                        <img
                            src={google_img}
                            alt="google"
                            className="google_img"
                        />
                        <div className="sign_in_google">
                            Sign in with google
                        </div>
                    </div>
                    <div className="login-main__sign_in_facebook">
                        <img
                            src={facebook_img}
                            alt="facebook"
                            className="facebook_img"
                        />
                    </div>
                    <div className="login-main__sign_in_apple">
                        <img
                            src={apple_img}
                            alt="apple"
                            className="apple_img"
                        />
                    </div>
                </div>

                {sign ? (
                    <SignIn setSign={setSign} />
                ) : (
                    <SignUp setSign={setSign} />
                )}
            </div>
        </div>
    );
};

export default LoginMain;
