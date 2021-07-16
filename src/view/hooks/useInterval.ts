import { useRef, useEffect } from 'react';
type IntervalFunction = () => unknown | void;

export const useInterval = (
    callback: IntervalFunction,
    delay: number | null,
): void => {
    const savedCallback = useRef<IntervalFunction>(callback);
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        if (delay == null || !savedCallback.current) {
            return;
        }
        const tick = (): void => {
            if (!savedCallback.current) return;
            savedCallback.current();
        };
        const id = setInterval(tick, delay);
        return (): void => clearInterval(id);
    }, [delay]);
};
