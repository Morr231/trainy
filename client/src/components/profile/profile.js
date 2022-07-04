import { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import getCookie from "../../helper/getCookie";
import getUserInfo from "../../helper/getUserInfo";

import ProfileNav from "./profile-comp/profile-nav";
import ProfileMain from "./profile-comp/profile-main";
import Dashboard from "./profile-comp/dashboard";
import Achieve from "./profile-comp/achieve";
import Stats from "./profile-comp/stats/stats";
import Settings from "./profile-comp/settings";
import TopicCard from "./profile-comp/topic-card";

const Profile = () => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    const [userInfo, setUserInfo] = useState({});

    const cardDeleted = useSelector((state) => {
        return state.deleteCard.deleted;
    });

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    useEffect(() => {
        if (cardDeleted || userUpdated || !getCookie("userInfo")) {
            getUserInfo({ setUserInfo: setUserInfo });
        } else {
            setUserInfo(JSON.parse(getCookie("userInfo")));
        }
    }, [cardDeleted, userUpdated]);

    return (
        <div className="profile">
            <div className="profile-container">
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
