import { useState, useEffect } from "react";

import ProfileHeader from "./profile-comp/profile-header";
import ProfileNav from "./profile-comp/profile-nav";
import Dashboard from "./profile-comp/dashboard";
import TopicCard from "./profile-comp/topic-card";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [showTopicCard, setShowTopicCard] = useState(-1);

    useEffect(() => {
        const getUserInfo = async () => {
            const responce = await fetch(`http://localhost:5000/user/data`, {
                headers: {
                    autorization: localStorage.getItem("token"),
                },
            });

            const result = await responce.json();

            setUserInfo(result.userInfo);
        };

        getUserInfo();
    }, []);

    console.log(userInfo);

    if (userInfo.texts) {
        console.log(showTopicCard);
        // console.log(userInfo.texts.reverse()[showTopicCard].text);
        // console.log(userInfo.texts.reverse()[showTopicCard].topic);
    }

    return (
        <div className="profile">
            <ProfileHeader />

            <div className="profile-container">
                <ProfileNav userInfo={userInfo} />
                {userInfo && showTopicCard === -1 ? (
                    <Dashboard
                        userInfo={userInfo}
                        setShowTopicCard={setShowTopicCard}
                    />
                ) : (
                    showTopicCard !== -1 && (
                        <TopicCard
                            text={
                                userInfo.texts.reverse()[showTopicCard + 1].text
                            }
                            topic={
                                userInfo.texts.reverse()[showTopicCard].topic
                            }
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Profile;
