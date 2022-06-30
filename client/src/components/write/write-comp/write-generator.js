const WriteGenerator = ({
    randomTopic,
    topicNumber,
    setTopicNumber,
    setShowAll,
    setStartWriting,
    startWriting,
}) => {
    const handlePrevious = () => {
        if (topicNumber - 1 != -1) {
            setTopicNumber(topicNumber - 1);
        }
    };

    const handleNext = () => {
        if (topicNumber + 1 != randomTopic.length) {
            setTopicNumber(topicNumber + 1);
        }
    };

    return (
        <div className="write-generator">
            <div className="write-generator-header">Choose your topic</div>
            <div className="write-generator-main">
                {randomTopic.length ? randomTopic[topicNumber] : "Generating"}
            </div>
            <div className="write-generator-buttons">
                {!startWriting && (
                    <button
                        className="write-generator-button generator-button-switch"
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                )}
                <button
                    className="write-generator-button generator-button-choose"
                    onClick={() => setStartWriting(true)}
                >
                    Take this topic
                </button>
                {!startWriting && (
                    <button
                        className="write-generator-button generator-button-switch"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                )}
            </div>
            {topicNumber == 4 && !startWriting && (
                <div className="write-generator-buttons">
                    <button
                        className="write-generator-button generator-button-showAll"
                        onClick={() => setShowAll(true)}
                    >
                        Show all
                    </button>
                </div>
            )}
        </div>
    );
};

export default WriteGenerator;
