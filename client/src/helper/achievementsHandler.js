import achievementsManager from "./achievementsManager";

export default async function achievementsHandler({
    text,
    userInfo,
    setUserInfo,
    setAchieved,
}) {
    if (text) {
        if (userInfo.texts.length === 0) {
            const result = await achievementsManager({
                title: "first essay",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
        if (userInfo.texts.length === 10) {
            const result = await achievementsManager({
                title: "10 Essays",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
        if (userInfo.texts.length === 100) {
            const result = await achievementsManager({
                title: "100 Essays",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
        if (userInfo.texts.length === 1000) {
            const result = await achievementsManager({
                title: "1000 Essays",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }

        if (text.split().length >= 500 && text.split().length <= 600) {
            const result = await achievementsManager({
                title: "500 words",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
        if (text.split().length >= 750 && text.split().length <= 850) {
            const result = await achievementsManager({
                title: "750 Words",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
        if (text.split().length >= 1000 && text.split().length <= 1100) {
            const result = await achievementsManager({
                title: "1000 Words",
                setUserInfo: setUserInfo,
            });

            setAchieved(result);
        }
    }
}
