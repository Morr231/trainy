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

import getCookie from "../../helper/getCookie";

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [otherUserInfo, setOtherUserInfo] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [cardDeleted, setCardDeleted] = useState(false);
    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    const isOtherUser = useSelector((state) => {
        return state.otherUser.otherUserInfo;
    });

    const getOtherUserInfo = async () => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}user/${currPath}`,
            {
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    autorization: getCookie("token"),
                },
            }
        );

        const data = await responce.json();

        if (data.found) {
            setOtherUserInfo(data.found);
        }
    };

    useEffect(() => {
        if (isOtherUser) {
            getOtherUserInfo();
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
    }, [userUpdated, cardDeleted]);

    window.addEventListener("scroll", () => {
        setShowModal(false);
    });

    console.log(otherUserInfo);

    if (!userInfo && !otherUserInfo) {
        return <div class="loader"></div>;
    } else {
        return (
            <div className="profile">
                <div className="profile-container">
                    {userInfo && userInfo.firstEnter && (
                        <InstructionsModal setUserInfo={setUserInfo} />
                    )}

                    {window.innerWidth >= 600 && (
                        <ProfileNav
                            userInfo={otherUserInfo ? otherUserInfo : userInfo}
                        />
                    )}

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
                                    : currPath === "settings" &&
                                      "Your settings"}
                            </h2>
                        </div>

                        {userInfo && currPath === userInfo.username && (
                            <ProfileMain userInfo={userInfo} />
                        )}

                        {otherUserInfo &&
                            currPath === otherUserInfo.username && (
                                <ProfileMain userInfo={otherUserInfo} />
                            )}

                        <Routes>
                            <Route
                                path="dashboard"
                                element={
                                    <Dashboard
                                        userInfo={
                                            otherUserInfo
                                                ? otherUserInfo
                                                : userInfo
                                        }
                                        setCardDeleted={setCardDeleted}
                                    />
                                }
                            />
                            <Route
                                path=":topicId"
                                element={
                                    <TopicCard
                                        userInfo={
                                            otherUserInfo
                                                ? otherUserInfo
                                                : userInfo
                                        }
                                    />
                                }
                            />

                            <Route
                                path="statistics"
                                element={
                                    <Stats
                                        userInfo={
                                            otherUserInfo
                                                ? otherUserInfo
                                                : userInfo
                                        }
                                    />
                                }
                            />
                            <Route
                                path="achievements"
                                element={
                                    <Achieve
                                        userInfo={
                                            otherUserInfo
                                                ? otherUserInfo
                                                : userInfo
                                        }
                                    />
                                }
                            />
                            {!isOtherUser && (
                                <Route
                                    path="settings/*"
                                    element={
                                        <Settings
                                            userInfo={
                                                otherUserInfo
                                                    ? otherUserInfo
                                                    : userInfo
                                            }
                                        />
                                    }
                                />
                            )}
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
