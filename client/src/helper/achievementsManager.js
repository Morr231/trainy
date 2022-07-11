import getCookie from "./getCookie";
import getUserInfo from "./getUserInfo";

export default async function achievementsManager({ title, setUserInfo }) {
    const responce = await fetch(`${process.env.REACT_APP_IP}user/achieve`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            autorization: getCookie("token"),
        },
        body: JSON.stringify({
            title: title,
            achievedTime: new Date(),
        }),
    });

    const result = await responce.json();

    if (result.exists) {
        return;
    }

    return title;

    // getUserInfo({ setUserInfo: setUserInfo });
}
