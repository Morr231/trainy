import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

import getUserInfo from "../../helper/getUserInfo";

const HeaderNavDropdown = ({ setShowModal }) => {
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

    return (
        <div className="header-dropdown header-dropdown-nav">
            <Link
                to={`/profile/${userInfo.username}`}
                style={{ textDecoration: "none" }}
            >
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className="header-dropdown_icon"
                        icon={faUser}
                    />
                    <div className="header-dropdown__item_text">Profile</div>
                </div>
            </Link>
            <Link to={`/write`} style={{ textDecoration: "none" }}>
                <div className="header-dropdown__item">
                    <FontAwesomeIcon
                        className="header-dropdown_icon"
                        icon={faPen}
                    />
                    <div className="header-dropdown__item_text">
                        Write Essay
                    </div>
                </div>
            </Link>
            <div
                className="header-dropdown__item"
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon
                    className="header-dropdown_icon"
                    icon={faBook}
                />
                <div className="header-dropdown__item_text">Instructions</div>
            </div>
        </div>
    );
};

export default HeaderNavDropdown;
