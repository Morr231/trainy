import { themes } from "../themes";

const SliderRight = () => {
    const tempArr = new Array(30).fill(0);

    return (
        <div className="slider-right">
            {tempArr.map(() => (
                <>
                    <div className="slider-text__large">
                        {themes[Math.floor(Math.random() * themes.length)]}
                    </div>
                    <div className="slider-text__small">
                        {themes[Math.floor(Math.random() * themes.length)]}
                    </div>
                </>
            ))}
        </div>
    );
};

export default SliderRight;
