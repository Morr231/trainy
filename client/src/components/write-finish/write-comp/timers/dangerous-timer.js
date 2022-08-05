import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { timerTimeActions } from "../../../../store/timerTime";

import setHourFormat from "../../../../helper/setHourFormat";

const DangerousTimer = ({ stopTimer, countDown, setCountDown }) => {
    const [intervals, setIntervals] = useState([]);

    const [endInterval, setEndInterval] = useState(10);

    const dispatch = useDispatch();

    const timerUpdated = useSelector(
        (state) => state.timerTime.dangerousUpdated
    );

    const timerValueChange = useSelector(
        (state) => state.timerTime.changeValue
    );

    let countDownInterval;
    let countEndInterval;

    if (timerUpdated) {
        setEndInterval(10);
        dispatch(timerTimeActions.setDangerousUpdated());
    }

    if (endInterval === 0) {
        setEndInterval(10);
        dispatch(timerTimeActions.setDangerousFinished());
    }

    useEffect(() => {
        countEndInterval = setTimeout(() => setEndInterval((p) => p - 1), 1000);
        return () => clearInterval(countEndInterval);
    }, [endInterval]);

    if (timerValueChange) {
        dispatch(timerTimeActions.updateTime(countDown));
        dispatch(timerTimeActions.changeValue());
    }

    if (stopTimer) {
        dispatch(timerTimeActions.updateTime(countDown));
        clearTimeout(intervals[intervals.length - 1]);
    }

    useEffect(() => {
        if (stopTimer) {
            clearTimeout(countDownInterval);
        } else {
            countDownInterval = setTimeout(
                () => setCountDown((p) => p + 1),
                1000
            );

            setIntervals((prev) => {
                if (prev.length >= 2) {
                    return [prev[prev.length - 1], countDownInterval];
                }
                return [...prev, countDownInterval];
            });
        }

        return () => clearTimeout(countDownInterval);
    }, [countDown]);

    return (
        <>
            <div className="write-timer">
                10Sec: {setHourFormat(endInterval)}
            </div>
            <div className="write-timer">Timer: {setHourFormat(countDown)}</div>
        </>
    );
};

export default DangerousTimer;
