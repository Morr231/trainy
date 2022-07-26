import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { authActions } from "../../../store/autorization";

const EmailVerification = ({ userData, forgotPassword }) => {
    const [signed, setSigned] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const number =
            e.target.first.value +
            e.target.second.value +
            e.target.third.value +
            e.target.fourth.value +
            e.target.fifth.value +
            e.target.sixth.value;

        const data = {
            ...userData,
            number: number,
        };

        if (forgotPassword) {
            passwordConfirmation(data);
        } else {
            sendUserData(data);
        }
    };

    const passwordConfirmation = async (userData) => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}forgot-password`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const result = await responce.json();

        console.log(result);

        if (result.found) {
            navigate("/login");
        }
    };

    const sendUserData = async (userData) => {
        const responce = await fetch(`${process.env.REACT_APP_IP}signUp`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await responce.json();

        console.log(result);

        // if (!result.token) {
        //     setSigned(false);
        // }

        if (result.saved) {
            const date = new Date();

            document.cookie = `token=${
                result.token
            }; path=/; expires=${date.setDate(
                date.getDate() + 1
            )}${date.toGMTString()}`;

            dispatch(authActions.login());
            navigate(`/my-profile/${result.username}`);
        }
    };

    function autotab({ e, original, destination, before }) {
        if (!original && !destination) {
            return;
        }
        if (e.code === "Backspace") {
            before.focus();
        } else if (
            original.getAttribute &&
            original.value.length == original.getAttribute("maxlength")
        ) {
            destination.focus();
        }
    }

    return (
        <div className="email-verification">
            {signed === false && <div>Error</div>}

            <div className="email-verification__header">
                Please verify your email
            </div>

            <div className="email-verification__text">
                Code send to your email {userData.email}
            </div>

            <form
                className="email-verification__form"
                name="email-verification__form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="first"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(event) =>
                        autotab({
                            e: event,
                            original:
                                document["email-verification__form"].first,
                            destination:
                                document["email-verification__form"].second,
                        })
                    }
                />
                <input
                    type="text"
                    name="second"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(e) =>
                        autotab({
                            e: e,
                            original:
                                document["email-verification__form"].second,
                            destination:
                                document["email-verification__form"].third,
                            before: document["email-verification__form"].first,
                        })
                    }
                />
                <input
                    type="text"
                    name="third"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(e) =>
                        autotab({
                            e: e,
                            original:
                                document["email-verification__form"].third,
                            destination:
                                document["email-verification__form"].fourth,
                            before: document["email-verification__form"].second,
                        })
                    }
                />
                <input
                    type="text"
                    name="fourth"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(e) =>
                        autotab({
                            e: e,
                            original:
                                document["email-verification__form"].fourth,
                            destination:
                                document["email-verification__form"].fifth,
                            before: document["email-verification__form"].third,
                        })
                    }
                />
                <input
                    type="text"
                    name="fifth"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(e) =>
                        autotab({
                            e: e,
                            original:
                                document["email-verification__form"].fifth,
                            destination:
                                document["email-verification__form"].sixth,
                            before: document["email-verification__form"].fourth,
                        })
                    }
                />
                <input
                    type="text"
                    name="sixth"
                    className="email-verification__form_el"
                    placeholder="0"
                    maxLength="1"
                    onKeyUp={(e) =>
                        autotab({
                            e: e,
                            before: document["email-verification__form"].fifth,
                        })
                    }
                />

                <div className="email-verification__form_buttons">
                    <button
                        className="login-main__form_submit"
                        style={{ width: "30%" }}
                        onClick={() => navigate("/login/sign-up")}
                    >
                        Change email
                    </button>
                    <button
                        className="login-main__form_submit"
                        style={{ width: "30%" }}
                    >
                        Send again
                    </button>
                    <button
                        type="submit"
                        className="login-main__form_submit"
                        style={{ width: "30%" }}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerification;
