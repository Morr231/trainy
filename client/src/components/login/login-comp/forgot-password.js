import React from "react";

const ForgotPassword = () => {
    return (
        <div className="forgot-password">
            <div className="forgot-password__form">
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
