import CtaButton from "../../buttons/cta-button";

const TopicCard = ({ userInfo }) => {
    let topicId = window.location.pathname.split("/");
    topicId = topicId[topicId.length - 1];

    const textsIndex = userInfo.texts.length - topicId - 1;

    const topic = userInfo.texts[textsIndex].topic;
    const text = userInfo.texts[textsIndex].text;

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
