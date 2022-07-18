import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import SettingsHeader from "./settings-comp/settings-header";
import SettingsNav from "./settings-comp/settings-nav";

import EditUser from "./settings-comp/edit-user";
import ChangePassword from "./settings-comp/change-password";

const Settings = ({ userInfo }) => {
    const location = useLocation();

    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    return (
        <div className="settings">
            <SettingsHeader userInfo={userInfo} />

            <div className="settings-container">
                <SettingsNav userInfo={userInfo} />

                {currPath === "settings" && (
                    <EditUser username={userInfo.username} />
                )}

                <Routes>
                    <Route
                        path="change-password"
                        element={<ChangePassword />}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Settings;
