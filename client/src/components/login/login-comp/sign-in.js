import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../../store/autorization";

const SignIn = ({ setForgetPassword }) => {
    const [signed, setSigned] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = (e) => {
        e.preventDefault();

        dispatch(authActions.login());

        const userData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        sendUserData(userData);
    };

    const sendUserData = async (userData) => {
        const responce = await fetch(`${process.env.REACT_APP_IP}signIn`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await responce.json();

        if (result.found) {
            const date = new Date();

            document.cookie = `token=${
                result.token
            }; path=/; expires=${date.setDate(
                date.getDate() + 1
            )}${date.toGMTString()}`;

            navigate(`/profile/${result.username}`);
        }
    };

    return (
        <form className="login-main__form" onSubmit={signIn}>
            {signed === false && (
                <div className="login-main__form_container login-main__form_error">
                    Incorrect username or password
                </div>
            )}
            <div className="login-main__form_container">
                <label htmlFor="email" className="login-main__form_label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="login-main__form_input"
                    required
                />
            </div>

            <div className="login-main__form_container">
                <label htmlFor="password" className="login-main__form_label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-main__form_input"
                    required
                />
            </div>

            <div className="login-main__form_container_forgot">
                <div
                    className="login-main__form_container_forgot_text"
                    onClick={() => {
                        navigate("/login/forgot-password");
                        setForgetPassword(true);
                    }}
                >
                    Forgot password?
                </div>
                <div
                    className="login-main__form_container_forgot_sign_up"
                    onClick={() => navigate("/login/sign-up")}
                >
                    Sign up!
                </div>
            </div>

            <div className="login-main__form_container">
                <button
                    type="submit"
                    className="login-main__form_submit
                    "
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default SignIn;
