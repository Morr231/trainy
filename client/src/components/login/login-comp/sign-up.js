import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { authActions } from "../../../store/autorization";

const SignUp = ({ setSign }) => {
    const [signed, setSigned] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUp = (e) => {
        e.preventDefault();

        dispatch(authActions.login());

        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.surname.value,
            surname: e.target.surname.value,
        };

        sendUserData(userData);
    };

    const sendUserData = async (userData) => {
        const responce = await fetch(`${process.env.REACT_APP_IP}signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await responce.json();

        if (result) {
            localStorage.setItem("token", result.token);

            setSigned(true);
            navigate(`/profile/${userData.username}`);
        } else {
            setSigned(false);
        }
    };

    return (
        <form className="login-main__form" onSubmit={signUp}>
            {signed === false && (
                <div className="login-main__form_container login-main__form_error">
                    Incorrect username or password
                </div>
            )}

            <div className="login-main__form_container">
                <label htmlFor="username" className="login-main__form_label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="login-main__form_input"
                    required
                />
            </div>

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

            <div className="login-main__form_small_container">
                <div className="login-main__form_small_container_el">
                    <label htmlFor="name" className="login-main__form_label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="login-main__form_input"
                    />
                    required
                </div>

                <div className="login-main__form_small_container_el">
                    <label htmlFor="surname" className="login-main__form_label">
                        Surname
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        className="login-main__form_input"
                        required
                    />
                </div>
            </div>

            <div className="login-main__form_small_container">
                <input type="checkbox" id="consent" />
                <label htmlFor="consent" className="login-consent-label">
                    Creating an account means you're okay with our Terms of
                    Service, Privacy Policy, and default Notification Settings
                </label>
            </div>

            <div
                className="login-main__form_container_forgot"
                style={{ justifyContent: "flex-end" }}
            >
                <div
                    className="login-main__form_container_forgot_sign_up"
                    onClick={() => setSign(true)}
                >
                    Sign in!
                </div>
            </div>

            <div className="login-main__form_container">
                <button
                    type="submit"
                    className="login-main__form_submit
                    "
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default SignUp;
