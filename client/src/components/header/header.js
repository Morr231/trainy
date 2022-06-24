import { Link } from "react-router-dom";

import CtaButton from "../buttons/cta-button";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <Link to="/">
                    <div className="header-logo">
                        <div className="header-logo__img"></div>
                        <div className="header-logo__name">Lorem</div>
                    </div>
                </Link>

                {/* <nav className="header-navigation">
                <ul className="header-navigation__main">
                    li.header-navigation__link*
                </ul>
            </nav> */}

                <div className="header-autorization">
                    <Link to="/login" style={{ marginRight: "1rem" }}>
                        <CtaButton text="Sign in" buttonStyle="outline" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
