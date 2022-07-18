import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./components/header/header";

import Landing from "./components/landing/landing";
import Main from "./components/main/main";

import Login from "./components/login/login";
import Profile from "./components/profile";
import Regimes from "./components/regimes";
import Write from "./components/write/write";

import Footer from "./components/footer/footer";

import "./app-sass/App.sass";

const App = () => {
    const isAuth = useSelector((state) => {
        return state.auth.isAuthed;
    });

    return (
        <div className="app">
            <Header />

            <Routes>
                {isAuth ? (
                    <Route path="/" element={<Landing />} />
                ) : (
                    <Route path="/*" element={<Main />} />
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
