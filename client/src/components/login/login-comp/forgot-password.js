import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ setUserData }) => {
    const navigate = useNavigate();

    const emailRef = useRef(null);

    const handleSubmit = (e) => {
        sendEmail(e.target.email.value);
        setUserData({ email: e.target.email.value });
    };

    const sendEmail = async (email) => {
        const responce = await fetch(`${process.env.REACT_APP_IP}send-email`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        const result = await responce.json();
        navigate("/login/forgot-password");
    };

    const handleBack = () => {
        emailRef.current.setAttribute("required", false);
        navigate("/login");
    };

    return (
        <div className="forgot-password">
            <div className="forgot-password__header">
                Enter your email to restore your password
            </div>

            <form className="forgot-password__form" onSubmit={handleSubmit}>
                <div className="login-main__form_container">
                    <label htmlFor="email" className="login-main__form_label">
                        Enter your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="login-main__form_input"
                        required
                        ref={emailRef}
                    />
                </div>

                <div className="forgot-password__form_buttons">
                    <button
                        className="forgot-password__form_button login-main__form_submit"
                        style={{ width: "40%" }}
                        onClick={handleBack}
                    >
                        Go back
                    </button>
                    <button
                        type="submit"
                        className="forgot-password__form_button login-main__form_submit"
                        style={{ width: "40%" }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
