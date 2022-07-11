import { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import getUserInfo from "../../helper/getUserInfo";

import ProfileNav from "./profile-comp/profile-nav";
import ProfileMain from "./profile-comp/profile-main";
import Dashboard from "./profile-comp/dashboard";
import Achieve from "./profile-comp/achieve";
import Stats from "./profile-comp/stats/stats";
import Settings from "./profile-comp/settings";
import TopicCard from "./profile-comp/topic-card";
import InstructionsModal from "../modals/instructions-modal";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});

    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

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
        <div className="profile">
            <div className="profile-container">
                {userInfo && userInfo.firstEnter && (
                    <InstructionsModal setUserInfo={setUserInfo} />
                )}

                <ProfileNav userInfo={userInfo} />

                {userInfo && currPath === userInfo.username && (
                    <ProfileMain userInfo={userInfo} />
                )}

                <Routes>
                    <Route
                        path="dashboard"
                        element={<Dashboard userInfo={userInfo} />}
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
                    <Route
                        path="settings/*"
                        element={<Settings userInfo={userInfo} />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;
