import { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/autorization";

import getUserInfo from "../../helper/getUserInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faCog, faUser } from "@fortawesome/free-solid-svg-icons";

const HeaderDropdown = ({ img }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({});

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    useEffect(() => {
        if (userUpdated || !window.localStorage.getItem("userInfo")) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
        }
    }, [userUpdated]);

    const logout = () => {
        dispatch(authActions.logout());

        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.localStorage.removeItem("userInfo");
        navigate(`/`);
    };

    return (
        <div className="header-dropdown">
            <div className="header-dropdown__description">Currently in</div>

            <Link
                to={`/my-profile/${userInfo.username}`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__user">
                    {userInfo.imageUrl ? (
                        <img
                            src={userInfo.imageUrl}
                            alt="user image"
                            className="header-dropdown__user_img"
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="header-dropdown__user_icon"
                            icon={faUser}
                        />
                    )}
                    <div className="header-dropdown__user_info">
                        <div className="header-dropdown__user_name">
                            {userInfo.name} {userInfo.surname}
                        </div>
                        <div className="header-dropdown__user_email">
                            {userInfo.email}
                        </div>
                    </div>
                </div>
            </Link>

            <Link
                to={`/my-profile/${userInfo.username}/settings`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className="header-dropdown_icon"
                        icon={faCog}
                    />
                    <div className="header-dropdown__item_text">Settings</div>
                </div>
            </Link>
            <div className="header-dropdown__item" onClick={logout}>
                <FontAwesomeIcon
                    className="header-dropdown_icon"
                    icon={faSignOut}
                />
                <div className="header-dropdown__item_text">Sign out</div>
            </div>
        </div>
    );
};

export default HeaderDropdown;
