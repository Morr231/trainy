import getCookie from "./getCookie";

export default async function getUserInfo({ setUserInfo }) {
    const responce = await fetch(`${process.env.REACT_APP_IP}user/data`, {
        mode: "cors",
        credentials: "same-origin",
        headers: {
            autorization: getCookie("token"),
        },
    });

    const result = await responce.json();

    const date = new Date();

    document.cookie = `userInfo=${JSON.stringify(
        result.userInfo
    )}; path=/; expires=${date.setTime(
        date.getTime() + 10 * 60 * 1000
    )}${date.toGMTString()}`;

    setUserInfo(result.userInfo);
}
