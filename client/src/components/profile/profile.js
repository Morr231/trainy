import { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import getUserInfo from "../../helper/getUserInfo";

import ProfileNav from "./profile-comp/profile-nav";
import ProfileMain from "./profile-comp/profile-main";
import Dashboard from "./profile-comp/dashboard";
import Achieve from "./profile-comp/achieve";
import Stats from "./profile-comp/stats/stats";
import Settings from "./profile-comp/settings";
import TopicCard from "./profile-comp/topic-card";
import InstructionsModal from "../modals/instructions-modal";

import ProfileDropdown from "../header/profile-dropdown";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // console.log(windowWidth);

    // useEffect(() => {
    //     setWindowWidth(window.innerWidth);
    // }, [window.innerWidth]);

    const dispatch = useDispatch();
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    const otherUserInfo = useSelector((state) => {
        return state.otherUser.otherUserInfo;
    });

    // useEffect(() => {
    //     if (otherUserInfo) {
    //         setUserInfo(otherUserInfo);
    //     }
    // }, [otherUserInfo]);

    useEffect(() => {
        console.log(otherUserInfo);
        if (otherUserInfo) {
            setUserInfo(otherUserInfo);
        } else {
            if (userUpdated) {
                dispatch(userUpdatedActions.setUserUpdated());
                dispatch(userUpdatedActions.setUserUpdated());
            } else {
                dispatch(userUpdatedActions.setUserUpdated());
            }

            if (userUpdated || !window.localStorage.getItem("userInfo")) {
                getUserInfo({ setUserInfo: setUserInfo });
            } else {
                setUserInfo(
                    JSON.parse(window.localStorage.getItem("userInfo"))
                );
            }
        }
    }, [userUpdated]);

    window.addEventListener("scroll", () => {
        setShowModal(false);
    });

    return (
        <div className="profile">
            <div className="profile-container">
                {userInfo && userInfo.firstEnter && (
                    <InstructionsModal setUserInfo={setUserInfo} />
                )}

                {window.innerWidth >= 600 && <ProfileNav userInfo={userInfo} />}

                <div className="profile-container__main">
                    <div className="profile-container__main_header">
                        {showModal && (
                            <ProfileDropdown setShowModal={setShowModal} />
                        )}

                        {window.innerWidth < 600 && (
                            <div
                                className="profile-container__main_header_nav"
                                onClick={() => setShowModal(!showModal)}
                            >
                                Menu
                                <FontAwesomeIcon
                                    className="profile-container__main_header_icon"
                                    icon={faAngleDown}
                                />
                            </div>
                        )}

                        <h2 className="profile-container__main_header_text">
                            {userInfo && currPath === userInfo.username
                                ? "Your Profile"
                                : currPath === "dashboard"
                                ? "Your Dashboard"
                                : currPath === "statistics"
                                ? "Your statistics"
                                : currPath === "achievements"
                                ? "Your achievements"
                                : currPath === "settings" && "Your settings"}
                        </h2>
                    </div>

                    {userInfo && currPath === userInfo.username && (
                        <ProfileMain userInfo={userInfo} />
                    )}

                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route
                            path=":topicId"
                            element={<TopicCard userInfo={userInfo} />}
                        />

                        <Route
                            path="statistics"
                            element={<Stats userInfo={userInfo} />}
                        />
                        <Route
                            path="achievements"
                            element={<Achieve userInfo={userInfo} />}
                        />
                        {!otherUserInfo && (
                            <Route
                                path="settings/*"
                                element={<Settings userInfo={userInfo} />}
                            />
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Profile;
