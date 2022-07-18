import { useState, useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userUpdatedActions } from "../../store/userUpdated";

import MainNav from "./main-comp/main-nav";
import Feed from "./main-comp/feed";
import FriendsMain from "./main-comp/friends/friends-main";

import getUserInfo from "../../helper/getUserInfo";

const Main = () => {
    const [userInfo, setUserInfo] = useState({});

    const dispatch = useDispatch();
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
        <div className="main">
            <div className="main-container">
                <MainNav userInfo={userInfo} />

                <div className="main-container__el">
                    <h2 className="main-header">
                        {currPath === "feed"
                            ? "Your Feed"
                            : currPath === "friends" && "Your Friends"}
                    </h2>

                    <Routes>
                        <Route path="/feed" element={<Feed />} />
                        <Route
                            path="/friends"
                            element={<FriendsMain userInfo={userInfo} />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Main;