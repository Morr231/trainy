import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { timerTimeActions } from "../../../../store/timerTime";

import setHourFormat from "../../../../helper/setHourFormat";

const DefaultTimer = ({ stopTimer, countDown, setCountDown }) => {
    const [intervals, setIntervals] = useState([]);

    const dispatch = useDispatch();
    const timerValueChange = useSelector(
        (state) => state.timerTime.changeValue
    );

    let countDownInterval;

    if (timerValueChange) {
        dispatch(timerTimeActions.updateTime(countDown));
        dispatch(timerTimeActions.changeValue());
    }

    if (stopTimer) {
        dispatch(timerTimeActions.setEssayFinishedTrue());
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

    return <div className="write-timer">{setHourFormat(countDown)}</div>;
};

export default DefaultTimer;
