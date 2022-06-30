import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../../store/autorization";

const SignIn = ({ setSign }) => {
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
        const responce = await fetch("http://localhost:5000/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await responce.json();

        if (result.found) {
            localStorage.setItem("token", result.token);

            const JWT = encodeURIComponent(result.token);

            const date = new Date();

            document.cookie = `token=${JWT}; path=/; expires=${date.setDate(
                date.getDate() + 1
            )}${date.toGMTString()}`;

            setSigned(true);
            navigate(`/profile/${result.username}`);
        } else {
            setSigned(false);
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
                <div className="login-main__form_container_forgot_text">
                    Forgot password?
                </div>
                <div
                    className="login-main__form_container_forgot_sign_up"
                    onClick={() => setSign(false)}
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
