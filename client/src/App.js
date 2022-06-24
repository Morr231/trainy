import { Routes, Route } from "react-router-dom";

import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import Profile from "./components/profile";
import Write from "./components/write/write";

import "./app-sass/App.sass";

const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </div>
    );
};

export default App;
