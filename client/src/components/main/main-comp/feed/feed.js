import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import FeedCard from "./feed-card";
import FeedPlaceholder from "./feed-placeholder";

const Feed = ({ userInfo }) => {
    if (!userInfo) {
        return <div class="loader"></div>;
    } else {
        if (!userInfo.posts.length) {
            return <FeedPlaceholder />;
        } else {
            return (
                <div className="feed">
                    <form className="friends-search__form">
                        <div className="friends-search__form_el">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="friends-search__form_input feed-search__form_input"
                                // onChange={handleSearch}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="friends-search__form_icon"
                            />
                        </div>
                    </form>

                    <div className="feed-container">
                        {[...userInfo.posts].reverse().map((el) => (
                            <FeedCard
                                key={el["_id"]}
                                postId={el["_id"]}
                                userId={userInfo["_id"]}
                                img={userInfo.image}
                                name={userInfo.name}
                                surname={userInfo.surname}
                                date={el.date}
                                description={el.description}
                                likesNumber={el.likes.likesNumber}
                                whoLiked={el.likes.whoLiked}
                                dislikesNumber={el.dislikes.dislikesNumber}
                                whoDisliked={el.dislikes.whoDisliked}
                                comments={el.comments}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }
};

export default Feed;
