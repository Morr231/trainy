import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import Profile from "./components/profile";
import Regimes from "./components/regimes";
import Write from "./components/write/write";

import "./app-sass/App.sass";

const App = () => {
    return (
        <div className="app">
            <Header />

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:username/*" element={<Profile />} />
                <Route path="/write" element={<Regimes />} />
                <Route path="/write/:regime" element={<Write />} />
            </Routes>
        </div>
    );
};

export default App;
