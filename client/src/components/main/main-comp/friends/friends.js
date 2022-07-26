import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import FriendsCard from "./friend-card";

import getCookie from "../../../../helper/getCookie";

const Friends = ({ userInfo, friendsState }) => {
    const [search, setSearch] = useState(null);

    const [requests, setRequests] = useState(null);
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        const getAllFriends = async (search) => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}friend/all-friends`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        autorization: getCookie("token"),
                    },
                }
            );

            const data = await responce.json();

            if (data.found) {
                setFriends(data.found);
            }
        };

        const getIncomingRequests = async (search) => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}friend/incoming-requests`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        autorization: getCookie("token"),
                    },
                }
            );

            const data = await responce.json();

            if (data.found) {
                setRequests(data.found);
            }
        };

        getAllFriends();
        getIncomingRequests();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        if (e.target.value.length !== 0) {
            getSearchUsers(e.target.value);
        } else {
            setSearch(null);
        }
    };

    const getSearchUsers = async (search) => {
        const responce = await fetch(
            `${process.env.REACT_APP_IP}search/search-users`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    autorization: getCookie("token"),
                },
                body: JSON.stringify({
                    search: search,
                    userId: userInfo["_id"],
                }),
            }
        );

        const data = await responce.json();

        if (data.found) {
            console.log(data.found);
            setSearch(data.found);
        }
    };

    return (
        <div className="friends">
            <form className="friends-search__form">
                <div className="friends-search__form_el">
                    <input
                        type="text"
                        name="search"
                        placeholder="Enter your friends name"
                        className="friends-search__form_input"
                        onChange={handleSearch}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="friends-search__form_icon"
                    />
                </div>
            </form>

            {search ? (
                <div className="friends-result">
                    <h3 className="friends-header">Recommendations</h3>

                    {search.map((el, index) => {
                        return (
                            <FriendsCard
                                key={el["_id"]}
                                user={el}
                                myId={userInfo["_id"]}
                                originalUser={userInfo.username}
                                badges="Best, Fastest, Greatest"
                                recommendations={true}
                            />
                        );
                    })}
                </div>
            ) : friendsState && friends ? (
                <div className="friends-mine">
                    <h3 className="friends-header">My friends</h3>

                    {friends.length === 0 && (
                        <div className="friends-description">
                            Start adding friends
                        </div>
                    )}

                    {friends.map((el) => {
                        return (
                            <FriendsCard
                                key={el["_id"]}
                                user={el}
                                myId={userInfo["_id"]}
                                originalUser={userInfo.username}
                                badges="Best, Fastest, Greatest"
                            />
                        );
                    })}
                </div>
            ) : (
                requests &&
                requests.map((el) => {
                    return (
                        <FriendsCard
                            key={el["_id"]}
                            myId={userInfo["_id"]}
                            user={el}
                            badges="Best, Fastest, Greatest"
                            originalUser={userInfo.username}
                            incoming={true}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Friends;
