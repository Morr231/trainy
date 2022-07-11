import CtaButton from "../../buttons/cta-button";

const Cta = () => {
    return (
        <div className="cta">
            <div className="cta-header">Start writing essays now</div>
            <CtaButton text="Get started now" buttonStyle="solid" />
            {/* <img src={ctaImg} className="cta-img" /> */}
        </div>
    );
};

export default Cta;
