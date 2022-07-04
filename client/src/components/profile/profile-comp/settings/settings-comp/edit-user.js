import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../../../store/autorization";

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserData = (e) => {
        e.preventDefault();

        console.log(e.target);

        const userData = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            username: e.target.username.value,
            email: e.target.email.value,
        };
        editUser(userData);
    };

    const editUser = async (userData) => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}settings/edit-profile`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(userData),
            }
        );
        const data = await responce.json();
        console.log(data);

        if (data.userChanged) {
            dispatch(authActions.logout());
            window.localStorage.removeItem("token");
            navigate(`/`);
        }
    };

    return (
        <div className="edit-user">
            <div className="edit-user__header">Edit profile</div>

            <form className="edit-user__form" onSubmit={getUserData}>
                <div className="edit-user__form_container">
                    <div className="edit-user__form_container_el">
                        <label
                            htmlFor="name"
                            className="login-main__form_label"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="login-main__form_input"
                        />
                    </div>

                    <div className="edit-user__form_container_el">
                        <label
                            htmlFor="surname"
                            className="login-main__form_label"
                        >
                            Surname
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="login-main__form_input"
                        />
                    </div>
                </div>
                <div className="edit-user__form_container">
                    <div className="edit-user__form_container_el">
                        <label
                            htmlFor="username"
                            className="login-main__form_label"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="login-main__form_input"
                        />
                    </div>
                    <div className="edit-user__form_container_el">
                        <label
                            htmlFor="email"
                            className="login-main__form_label"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="login-main__form_input"
                        />
                    </div>
                </div>
                <div className="edit-user__form_container">
                    <div></div>
                    <button
                        type="submit"
                        className="edit-user__form_submit login-main__form_submit
                    "
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
