import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import FriendsCard from "./friend-card";

import getCookie from "../../../../helper/getCookie";

const Friends = ({ userInfo }) => {
    const [search, setSearch] = useState(null);

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
            `${process.env.REACT_APP_IP}search-users`,
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

                    {search.map((el) => {
                        return (
                            <FriendsCard
                                img={el.imageUrl}
                                name={el.name}
                                surname={el.surname}
                                badges="Best, Fastest, Greatest"
                                recommendations={true}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="friends-mine">
                    <h3 className="friends-header">My friends</h3>

                    <FriendsCard
                        name="Almaz"
                        surname="Balgali"
                        badges="Best, Fastest, Greatest"
                    />
                    <FriendsCard
                        name="Almaz"
                        surname="Balgali"
                        badges="Best, Fastest, Greatest"
                    />
                    <FriendsCard
                        name="Almaz"
                        surname="Balgali"
                        badges="Best, Fastest, Greatest"
                    />
                </div>
            )}
        </div>
    );
};

export default Friends;
