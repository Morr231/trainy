import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setSign }) => {
    const [signed, setSigned] = useState();
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();

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

        console.log(result);

        if (result.found) {
            localStorage.setItem("token", result.token);

            setSigned(true);
            navigate(`/profile/${result.username}`);
        } else {
            setSigned(false);
        }
    };

    return (
        <form className="login-main__form" onSubmit={signIn}>
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
