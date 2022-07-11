import { Link, useLocation } from "react-router-dom";

import Inst from "./inst.png";
import Linkedin from "./linkedin.png";

const Footer = () => {
    const location = useLocation();

    if (location.pathname !== "/login") {
        return (
            <div className="footer">
                <div className="footer-container">
                    <Link to="/">
                        <div className="header-logo">
                            <div className="header-logo__img"></div>
                            <div className="header-logo__name">Lorem</div>
                        </div>
                    </Link>

                    <div className="footer-ref">Project of Almaz © 2022</div>

                    <div className="footer-icons">
                        <div className="footer-icon">
                            <img className="footer-img" src={Inst} />
                        </div>
                        <div className="footer-icon">
                            <img className="footer-img" src={Linkedin} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default Footer;
