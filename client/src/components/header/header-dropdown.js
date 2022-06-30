import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/autorization";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faCog } from "@fortawesome/free-solid-svg-icons";

const HeaderDropdown = ({ img }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => {
        return state.userInfo.userInfo;
    });

    // const getUserInfo = async () => {
    //     const responce = await fetch(`http://localhost:5000/user/data`, {
    //         headers: {
    //             autorization: localStorage.getItem("token"),
    //         },
    //     });

    //     const result = await responce.json();

    //     setUserInfo(result.userInfo);
    //     dispatch(userInfoActions.setUserInfo({ userInfo: result.userInfo }));
    // };

    // if (!userInfo) {
    //     getUserInfo();
    // }

    const logout = () => {
        dispatch(authActions.logout());
        window.localStorage.removeItem("token");
        navigate(`/`);
    };

    return (
        <div className="header-dropdown">
            <div className="header-dropdown__description">Currently in</div>

            <Link to={`/profile/${userInfo.username}`}>
                <div className="header-dropdown__user">
                    <img src={img} className="header-dropdown__user_img" />
                    <div className="header-dropdown__user_info">
                        <div className="header-dropdown__user_name">
                            {userInfo.name} {userInfo.surname}
                        </div>
                        <div className="header-dropdown__user_email">
                            {userInfo.email}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="header-dropdown__item">
                <FontAwesomeIcon
                    className="header-dropdown_icon"
                    icon={faCog}
                />
                <div className="header-dropdown__item_text">Settings</div>
            </div>
            <div className="header-dropdown__item" onClick={logout}>
                <FontAwesomeIcon
                    className="header-dropdown_icon"
                    icon={faSignOut}
                />
                <div className="header-dropdown__item_text">Sign out</div>
            </div>
        </div>
    );
};

export default HeaderDropdown;
