import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { timerTimeActions } from "../../../../store/timerTime";

import setHourFormat from "../../../../helper/setHourFormat";

const PomodoroTimer = ({ stopTimer, countDown, setCountDown }) => {
    useEffect(() => {
        setCountDown(25 * 60);
    }, []);

    const [intervals, setIntervals] = useState([]);

    const [iteration, setIteration] = useState(0);

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
        dispatch(timerTimeActions.updateTime(countDown));
        clearTimeout(intervals[intervals.length - 1]);
    }

    if (countDown === 0) {
        setIteration(iteration + 1);

        if (iteration % 2 == 0) {
            dispatch(timerTimeActions.setPomodoroFinished());
            setCountDown(5 * 60);
        } else {
            dispatch(timerTimeActions.setPomodoroFinished());
            setCountDown(25 * 60);
        }
    }

    useEffect(() => {
        if (stopTimer) {
            clearTimeout(countDownInterval);
        } else {
            countDownInterval = setTimeout(
                () => setCountDown((p) => p - 1),
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

export default PomodoroTimer;
