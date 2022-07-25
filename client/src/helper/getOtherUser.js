import getCookie from "./getCookie";

export default async function getOtherUserInfo(currPath, setUserInfo) {
    const responce = await fetch(
        `${process.env.REACT_APP_IP}user/other/${currPath}`,
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
        setUserInfo(data.found);
    }
}
