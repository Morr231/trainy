import { Routes, Route } from "react-router-dom";

import SettingsHeader from "./settings-comp/settings-header";
import SettingsNav from "./settings-comp/settings-nav";

import EditUser from "./settings-comp/edit-user";
import ChangePassword from "./settings-comp/change-password";

const Settings = ({ userInfo }) => {
    return (
        <div className="settings">
            <SettingsHeader userInfo={userInfo} />

            <div className="settings-container">
                <SettingsNav />

                <Routes>
                    <Route path="edit-profile" element={<EditUser />} />
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
