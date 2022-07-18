import React from "react";

import FriendsCard from "./friend-card";

const FriendsRecs = () => {
    return (
        <div className="friends-recommendation">
            <div className="friends-recommendation__container">
                <h3 className="friends-recommendation__header">
                    Recommendations
                </h3>
                <div className="friends-recommendation__link">
                    Show all &#62;
                </div>
            </div>

            <FriendsCard
                name="Almaz"
                surname="Balgali"
                badges="Best, Fastest, Greatest"
                recommendations={true}
            />
            <FriendsCard
                name="Almaz"
                surname="Balgali"
                badges="Best, Fastest, Greatest"
                recommendations={true}
            />
            <FriendsCard
                name="Almaz"
                surname="Balgali"
                badges="Best, Fastest, Greatest"
                recommendations={true}
            />
        </div>
    );
};

export default FriendsRecs;
