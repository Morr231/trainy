import CtaButton from "../../buttons/cta-button";

const TopicCard = ({ topic, text }) => {
    return (
        <div className="topic-card">
            <div className="topic-card-top">
                <h3 className="topic-card-header">Your text:</h3>
                <CtaButton text="go back" buttonStyle="solid" />
            </div>
            <h2 className="topic-card-main">{topic}</h2>
            <div className="topic-card-text">
                {text.replace(/<[^>]+>/g, "")}
            </div>
        </div>
    );
};

export default TopicCard;
