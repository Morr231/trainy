export default function setHourFormat(timer) {
    let minute = `${Math.floor(timer / 60 / 10)}${Math.floor(
        (timer / 60) % 10
    )}`;
    let sec = `${Math.floor((timer % 60) / 10)}${Math.floor(
        (timer % 60) % 10
    )}`;

    return minute + ":" + sec;
}
