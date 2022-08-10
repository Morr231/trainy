import { Link, useLocation } from "react-router-dom";

import Inst from "./github.jpg";
import Linkedin from "./linkedin.jpg";

const Footer = () => {
    const location = useLocation();

    let currPath = location.pathname.split("/");

    if (
        currPath[currPath.length - 1] !== "login" &&
        currPath[currPath.length - 2] !== "login"
    ) {
        return (
            <div className="footer">
                <div className="footer-container">
                    <Link to="/">
                        <div className="header-logo">
                            <div className="header-logo__name">Trainy</div>
                        </div>
                    </Link>

                    <div className="footer-ref">Project of Almaz © 2022</div>

                    <div className="footer-icons">
                        <div className="footer-icon">
                            <img className="footer-img github-img" src={Inst} />
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
