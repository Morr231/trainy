import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faUser,
    faBars,
    faBell,
} from "@fortawesome/free-solid-svg-icons";

import InstructionsModal from "../modals/instructions-modal";
import HeaderNavDropdown from "./header-nav-dropdown";

import getUserInfo from "../../helper/getUserInfo";

import HeaderDropdown from "./header-dropdown";
import CtaButton from "../buttons/cta-button";

import dog from "./dog.jpg";

const Header = () => {
    const location = useLocation();
    let currPath = location.pathname.split("/");

    const [userInfo, setUserInfo] = useState({});

    const [showDropdown, setShowDropdown] = useState(false);
    const [showNavDropdown, setShowNavDropdown] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });
    const isAuth = useSelector((state) => {
        return state.auth.isAuthed;
    });

    useEffect(() => {
        if (
            userUpdated ||
            !window.localStorage.getItem("userInfo") ||
            typeof window.localStorage.getItem("userInfo") === "undefined"
        ) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
        }
    }, [userUpdated]);

    if (
        currPath[currPath.length - 1] !== "login" &&
        currPath[currPath.length - 2] !== "login"
    ) {
        return (
            <header className="header">
                {showModal && <InstructionsModal setShowModal={setShowModal} />}

                <div className="header-container">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className="header-logo">
                            <div className="header-logo__img"></div>
                            <div className="header-logo__name">Lorem</div>
                        </div>
                    </Link>

                    {isAuth || window.localStorage.getItem("userInfo") ? (
                        <>
                            {window.innerWidth > 900 ? (
                                <div className="header__nav">
                                    <Link
                                        to="/write"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="header__link">
                                            Write essay
                                        </div>
                                    </Link>
                                    <Link
                                        to="/"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="header__link">Feed</div>
                                    </Link>
                                    <div
                                        className="header__link"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Instructions
                                    </div>
                                </div>
                            ) : (
                                <div className="header__nav">
                                    <div
                                        className="header__nav_icon_container"
                                        onClick={() => {
                                            setShowNavDropdown(
                                                !showNavDropdown
                                            );
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            className="header__nav_icon"
                                            icon={faBars}
                                        />
                                    </div>
                                    {showNavDropdown && (
                                        <HeaderNavDropdown
                                            setShowModal={setShowModal}
                                        />
                                    )}
                                </div>
                            )}
                            <div className="header__user__nav">
                                <div className="header__user__nav_container">
                                    <Link
                                        to={`/my-profile/${userInfo.username}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="header__user_img_container">
                                            {userInfo.imageUrl ? (
                                                <img
                                                    src={userInfo.imageUrl}
                                                    alt="user image"
                                                    className="header__user_img"
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    className="header__user_img_icon"
                                                    icon={faUser}
                                                />
                                            )}
                                        </div>
                                    </Link>

                                    <div
                                        className="header__user_container"
                                        onClick={() => {
                                            setShowDropdown(!showDropdown);
                                            setShowNavDropdown(false);
                                        }}
                                    >
                                        <div className="header__user_name">
                                            {userInfo.name} {userInfo.surname}
                                        </div>

                                        <FontAwesomeIcon
                                            className="header__user_icon"
                                            icon={faAngleDown}
                                        />

                                        {showDropdown && (
                                            <HeaderDropdown img={dog} />
                                        )}
                                    </div>
                                </div>
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
