import { useState } from "react";

import Friends from "./friends";
import FriendsFilter from "./friends-filter";
import FriendsRandom from "./friends-recs";

const FriendsMain = ({ userInfo }) => {
    const [friendsState, setFriendsState] = useState(true);

    return (
        <div className="friends-main">
            <div className="friends-main__container">
                <FriendsFilter
                    friendsState={friendsState}
                    setFriendsState={setFriendsState}
                />
                {/* <FriendsRandom /> */}
            </div>
            <Friends friendsState={friendsState} userInfo={userInfo} />
        </div>
    );
};

export default FriendsMain;
