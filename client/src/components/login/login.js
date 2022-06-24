import { Link } from "react-router-dom";

import LoginMain from "./login-comp/login-main";

const Login = () => {
    return (
        <div className="login">
            <div className="login-left">
                <Link to="/">
                    <div className="login-left__container">
                        <div className="login-left__logo"></div>
                        <div className="login-left__name">Lorem</div>
                    </div>
                </Link>
            </div>
            <LoginMain />
        </div>
    );
};

export default Login;
