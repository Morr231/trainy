const BrowserGenerator = () => {
    return (
        <div className="browser-generator">
            <div className="browser-generator__main">
                <h2 className="browser-generator__header">
                    Topic for your essay
                </h2>

                <div className="browser-generator__types">
                    <div className="browser-generator__types_el">Politics</div>
                    <div className="browser-generator__types_el">Science</div>
                    <div className="browser-generator__types_el">School</div>
                </div>
                <div className="browser-generator__text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iusto asperiores accusamus temporibus voluptate facere
                    placeat, non magni ea enim modi aperiam cupiditate natus
                    error sint recusandae nemo tempora quam maiores.
                </div>
                <div className="browser-generator__buttons">
                    <button className="browser-generator__button header-autorization__button">
                        Previous
                    </button>
                    <button className=" browser-generator__button header-autorization__button">
                        All
                    </button>
                    <button className=" browser-generator__button header-autorization__button">
                        Next
                    </button>
                </div>
            </div>

            <button className="browser-generator__choose_topic">
                Choose this topic
            </button>
        </div>
    );
};

export default BrowserGenerator;
