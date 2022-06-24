const SliderRight = () => {
    const tempArr = new Array(30).fill(0);

    return (
        <div className="slider-right">
            {tempArr.map(() => (
                <div className="slider-text">123</div>
            ))}
        </div>
    );
};

export default SliderRight;
