import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

import FeedFilter from "./feed-filter";
import FeedCard from "./feed-card";
import FeedPlaceholder from "./feed-placeholder";

import getCookie from "../../../../helper/getCookie";

const Feed = ({ userInfo }) => {
    const [feedFilter, setFeedFilter] = useState("friends");
    const [friendsPosts, setFriendsPosts] = useState([]);

    const userUpdated = useSelector((state) => {
        return state.userUpdated.updated;
    });

    useEffect(() => {
        const getFriendsPost = async () => {
            const responce = await fetch(
                `${process.env.REACT_APP_IP}post/friends`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        autorization: getCookie("token"),
                    },
                }
            );

            const data = await responce.json();
            if (data.found) {
                setFriendsPosts(data.found);
            }
        };

        getFriendsPost();
    }, [userUpdated]);

    if (!userInfo) {
        return <div class="loader"></div>;
    } else {
        if (!userInfo.posts.length) {
            return <FeedPlaceholder />;
        } else {
            return (
                <div className="feed">
                    <div className="feed-container">
                        <FeedFilter
                            feedFilter={feedFilter}
                            setFeedFilter={setFeedFilter}
                        />
                    </div>

                    <div className="feed-main">
                        {/* <form className="friends-search__form">
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
                        </form> */}

                        <div className="feed-main-container">
                            {feedFilter === "my"
                                ? [...userInfo.posts]
                                      .reverse()
                                      .map((el) => (
                                          <FeedCard
                                              key={el["_id"]}
                                              postId={el["_id"]}
                                              userId={userInfo["_id"]}
                                              img={userInfo.imageUrl}
                                              name={userInfo.name}
                                              surname={userInfo.surname}
                                              date={el.date}
                                              description={el.description}
                                              likesNumber={el.likes.likesNumber}
                                              whoLiked={el.likes.whoLiked}
                                              dislikesNumber={
                                                  el.dislikes.dislikesNumber
                                              }
                                              whoDisliked={
                                                  el.dislikes.whoDisliked
                                              }
                                              comments={el.comments}
                                          />
                                      ))
                                : [...friendsPosts]
                                      .reverse()
                                      .map((el) => (
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
                                              dislikesNumber={
                                                  el.dislikes.dislikesNumber
                                              }
                                              whoDisliked={
                                                  el.dislikes.whoDisliked
                                              }
                                              comments={el.comments}
                                          />
                                      ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default Feed;
