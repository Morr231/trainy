import { useNavigate } from "react-router-dom";

const SignUp = ({ setUserData, setSignUp }) => {
    const navigate = useNavigate();

    const sendEmail = async (email) => {
        console.log(email);
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
        console.log(result);
        navigate("/login/email-verification");
    };

    const signUp = (e) => {
        e.preventDefault();

        const userData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
        };

        sendEmail(e.target.email.value);

        setUserData(userData);
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
                    minlength="4"
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
                <label
                    htmlFor="password"
                    className="login-main__form_label_description"
                >
                    Password should contain more than 8 symbols, numbers and
                    uppercase letter
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="login-main__form_input"
                    required
                    minlength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                        minlength="2"
                        required
                    />
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
                        minlength="2"
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
                    onClick={() => navigate("/login")}
                >
                    Sign in!
                </div>
            </div>

            <div className="login-main__form_container">
                <button type="submit" className="login-main__form_submit">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default SignUp;
