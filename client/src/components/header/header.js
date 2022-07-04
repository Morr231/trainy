import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import getCookie from "../../helper/getCookie";
import getUserInfo from "../../helper/getUserInfo";

import HeaderDropdown from "./header-dropdown";
import CtaButton from "../buttons/cta-button";

import dog from "./dog.jpg";

const Header = () => {
    const location = useLocation();

    const [showDropdown, setShowDropdown] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    useEffect(() => {
        if (userUpdated || !getCookie("userInfo")) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(getCookie("userInfo")));
        }
    }, [userUpdated]);

    const isAuth = useSelector((state) => {
        return state.auth.isAuthed;
    });

    if (location.pathname !== "/login") {
        return (
            <header className="header">
                <div className="header-container">
                    <Link to="/">
                        <div className="header-logo">
                            <div className="header-logo__img"></div>
                            <div className="header-logo__name">Lorem</div>
                        </div>
                    </Link>

                    {/* <nav className="header-navigation">
                <ul className="header-navigation__main">
                    li.header-navigation__link*
                </ul>
            </nav> */}

                    {isAuth ? (
                        <>
                            <Link to="/write">
                                <div className="header__link">Write</div>
                            </Link>
                            <div
                                className="header__user_container"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className="header__user">
                                    {/* <div className="profile-header__user_notifications">
                        <FontAwesomeIcon icon={faBell} />
                    </div> */}
                                    {userInfo.imageUrl && (
                                        <img
                                            src={userInfo.imageUrl}
                                            alt="user image"
                                            className="header-dropdown__user_img"
                                        />
                                    )}
                                </div>
                                <FontAwesomeIcon
                                    className="header__user_icon"
                                    icon={faAngleDown}
                                />

                                {showDropdown && <HeaderDropdown img={dog} />}
                            </div>
                        </>
                    ) : (
                        <div className="header-autorization">
                            <Link to="/login" style={{ marginRight: "1rem" }}>
                                <CtaButton
                                    text="Sign in"
                                    buttonStyle="outline"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        );
    }
};

export default Header;
