import { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import ProfileNav from "./profile-comp/profile-nav";
import ProfileMain from "../profile/profile-comp/profile-main";
import Dashboard from "../profile/profile-comp/dashboard";
import Achieve from "../profile/profile-comp/achieve";
import Stats from "../profile/profile-comp/stats/stats";
import TopicCard from "../profile/profile-comp/topic-card";
import InstructionsModal from "../modals/instructions-modal";

import ProfileDropdown from "../header/profile-dropdown";

import getOtherUserInfo from "../../helper/getOtherUser";

const OtherProfile = () => {
    const [userInfo, setUserInfo] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

    let unformattedPath = location.pathname.split("/");
    let currPath = unformattedPath[unformattedPath.length - 1];

    useEffect(() => {
        if (!userInfo) {
            if (
                currPath === "dashboard" ||
                currPath === "statistics" ||
                currPath === "achievements"
            ) {
                currPath = unformattedPath[unformattedPath.length - 2];
            }

            getOtherUserInfo(currPath, setUserInfo);
        }
    }, [userInfo]);

    window.addEventListener("scroll", () => {
        setShowModal(false);
    });

    if (!userInfo) {
        return <div class="loader"></div>;
    } else {
        return (
            <div className="profile">
                <div className="profile-container">
                    {userInfo && userInfo.firstEnter && (
                        <InstructionsModal setUserInfo={setUserInfo} />
                    )}

                    {window.innerWidth >= 600 && (
                        <ProfileNav userInfo={userInfo} />
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

                        <Routes>
                            <Route
                                path="dashboard"
                                element={
                                    <Dashboard
                                        userInfo={userInfo}
                                        otherProfile={true}
                                    />
                                }
                            />
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
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
};

export default OtherProfile;
