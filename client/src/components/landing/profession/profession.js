const professions = [
    "Writers",
    "Copywriters",
    "Journalists",
    "Students",
    "Editors",
    "Translators",
    "Reporters",
    "Novelists",
    "Bloggers",
];

const colors = [
    "#FF0000",
    "#00FFFF",
    "#00008B",
    "#FFFF00",
    "#00FF00",
    "#FF00FF",
    "#800000",
    "#FF7F50",
    "#B22222",
    "#FF69B4",
];

const Profession = () => {
    return (
        <div className="profession">
            <div className="profession-left">
                <div className="profession-left-text">For whom</div>
            </div>
            <div className="profession-right">
                {professions.map((el) => (
                    <div
                        className="profession-right-element"
                        style={{
                            color: colors[
                                Math.floor(Math.random() * colors.length)
                            ],
                        }}
                    >
                        {el}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profession;
