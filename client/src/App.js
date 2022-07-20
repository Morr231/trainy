import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/autorization";

import Header from "./components/header/header";

import Landing from "./components/landing/landing";
import Main from "./components/main/main";

import Login from "./components/login/login";
import Profile from "./components/profile";
import Regimes from "./components/regimes";
import Write from "./components/write/write";

import Footer from "./components/footer/footer";

import "./app-sass/App.sass";

import getCookie from "./helper/getCookie";

const App = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (getCookie("token")) {
    //         dispatch(authActions.login());
    //     }
    // }, []);

    const isAuth = useSelector((state) => {
        return state.auth.isAuthed;
    });

    return (
        <div className="app">
            <Header />

            <Routes>
                {isAuth ? (
                    <Route path="/*" element={<Main />} />
                ) : (
                    <Route path="/" element={<Landing />} />
                )}
                <Route path="/login/*" element={<Login />} />
                <Route path="/profile/:username/*" element={<Profile />} />
                <Route path="/write" element={<Regimes />} />
                <Route path="/write/:regime" element={<Write />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
