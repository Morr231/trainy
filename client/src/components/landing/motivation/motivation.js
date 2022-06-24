import Best from "./best.png";

const Motivation = () => {
    return (
        <div className="motivation">
            <h2 className="motivation-header">Become the best writer</h2>
            <div className="motivation-icon__container">
                <img src={Best} className="motivation-icon" />
            </div>
        </div>
    );
};

export default Motivation;
