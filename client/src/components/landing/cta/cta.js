import { useNavigate } from "react-router-dom";

import CtaButton from "../../buttons/cta-button";

const Cta = () => {
    const navigate = useNavigate();

    return (
        <div className="cta">
            <div className="cta-header">Start writing essays now</div>
            <CtaButton
                text="Get started now"
                buttonStyle="solid"
                action={() => navigate("/login")}
            />
        </div>
    );
};

export default Cta;
