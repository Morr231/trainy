const WriteGenerator = ({ topic, setStartWriting, startWriting }) => {
    return (
        <div
            className="write-generator"
            style={{
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="write-generator-main">{topic}</div>
            <div className="write-generator-buttons">
                {!startWriting && (
                    <button
                        className="write-generator-button generator-button-choose"
                        onClick={() => setStartWriting(true)}
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
};

export default WriteGenerator;
