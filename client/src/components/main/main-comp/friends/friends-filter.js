import React from "react";

const FriendsFilter = ({ friendsState, setFriendsState }) => {
    return (
        <div className="friends-filter">
            <div
                className={`friends-filter__el ${
                    friendsState && "friends-filter__el_active"
                }`}
            >
                My friends
            </div>
            <div
                className={`friends-filter__el ${
                    !friendsState && "friends-filter__el_active"
                }`}
            >
                Incoming requests
            </div>
        </div>
    );
};

export default FriendsFilter;
