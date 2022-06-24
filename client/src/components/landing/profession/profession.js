const Profession = () => {
    const tempArray = new Array(10).fill(0);

    return (
        <div className="profession">
            <div className="profession-left">
                <div className="profession-left-text">For whom</div>
            </div>
            <div className="profession-right">
                {tempArray.map(() => (
                    <div className="profession-right-element">1</div>
                ))}
            </div>
        </div>
    );
};

export default Profession;
