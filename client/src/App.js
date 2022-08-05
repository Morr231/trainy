import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./components/header/header";

import Landing from "./components/landing/landing";
import Main from "./components/main/main";

import Login from "./components/login/login";
import Profile from "./components/profile";
import OtherProfile from "./components/other-profile/other-profile";

import Regimes from "./components/regimes";

import Write from "./components/write/write";
import WriteFinish from "./components/write-finish/write";

import Footer from "./components/footer/footer";

import "./app-sass/App.sass";
import "./app-sass/loader.css";

const App = () => {
    const isAuth = useSelector((state) => {
        return state.auth.isAuthed;
    });

    return (
        <div className="app">
            <Header />

            <Routes>
                {!isAuth && <Route path="/" element={<Landing />} />}
                <Route path="/login/*" element={<Login />} />
                <Route path="/profile/:username/*" element={<OtherProfile />} />
                <Route path="/my-profile/:username/*" element={<Profile />} />
                <Route path="/write" element={<Regimes />} />
                <Route path="/feed" element={<Main />} />
                <Route path="/friends" element={<Main />} />
                <Route path="/write/:regime" element={<Write />} />
                <Route path="/write/finish/:regime" element={<WriteFinish />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
