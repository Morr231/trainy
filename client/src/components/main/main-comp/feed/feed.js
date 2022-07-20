import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Feed = () => {
    return (
        <div className="feed">
            <form className="friends-search__form">
                <div className="friends-search__form_el">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        className="friends-search__form_input"
                        // onChange={handleSearch}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="friends-search__form_icon"
                    />
                </div>
            </form>
        </div>
    );
};

export default Feed;
