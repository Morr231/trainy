import { Link, useLocation } from "react-router-dom";

const SettingsNav = () => {
    const location = useLocation();
    let currPath = location.pathname.split("/");
    currPath = currPath[currPath.length - 1];

    return (
        <div className="settings-nav">
            <Link to="edit-profile" style={{ textDecoration: "none" }}>
                <div
                    className={`settings-nav__el ${
                        currPath === "edit-profile" && "settings-nav__el_active"
                    }`}
                >
                    Edit profile
                </div>
            </Link>
            <Link to="change-password" style={{ textDecoration: "none" }}>
                <div
                    className={`settings-nav__el ${
                        currPath === "change-password" &&
                        "settings-nav__el_active"
                    }`}
                >
                    Change Password
                </div>
            </Link>
        </div>
    );
};

export default SettingsNav;
