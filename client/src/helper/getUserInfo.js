import getCookie from "./getCookie";

export default async function getUserInfo({ setUserInfo }) {
    const responce = await fetch(`${process.env.REACT_APP_IP}user/my-data`, {
        mode: "cors",
        credentials: "same-origin",
        headers: {
            autorization: getCookie("token"),
        },
    });

    const result = await responce.json();

    window.localStorage.setItem("userInfo", JSON.stringify(result.userInfo));

    setUserInfo(result.userInfo);
}
