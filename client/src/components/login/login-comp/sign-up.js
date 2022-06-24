import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setSign }) => {
    const [signed, setSigned] = useState();
    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        sendUserData(userData);
    };

    const sendUserData = async (userData) => {
        const responce = await fetch("http://localhost:5000/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await responce.json();

        if (result) {
            setSigned(true);
            navigate(`/profile/${userData.username}`);
        } else {
            setSigned(false);
        }
    };

    return (
        <form className="login-main__form" onSubmit={signUp}>
            <div className="login-main__form_container">
                <label htmlFor="username" className="login-main__form_label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="login-main__form_input"
                />
            </div>

            <div className="login-main__form_container">
                <label htmlFor="email" className="login-main__form_label">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="login-main__form_input"
                />
            </div>

            {signed === false && <div>Error in signing</div>}

            <div className="login-main__form_container">
                <label htmlFor="password" className="login-main__form_label">
                    Password
                </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    className="login-main__form_input"
                />
            </div>

            <div className="login-main__form_container">
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
