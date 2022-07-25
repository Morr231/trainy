const WriteGenerator = ({ randomTopic, setStartWriting }) => {
    return (
        <div className="write-generator">
            <div className="write-generator-header">Choose your topic</div>
            <div className="write-generator-main">{randomTopic}</div>
            <div className="write-generator-buttons">
                <button
                    className="write-generator-button generator-button-choose"
                    onClick={() => setStartWriting(true)}
                >
                    Take this topic
                </button>
            </div>
        </div>
    );
};

export default WriteGenerator;
