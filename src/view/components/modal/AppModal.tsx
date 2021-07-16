import React, { FC, RefObject, useEffect, useRef } from 'react';

type IProps = {
    clickOutside: () => void;
};

const useOutsideAlerter = (
    ref: RefObject<HTMLDivElement>,
    clickOutside: () => void,
): void => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent): void {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                clickOutside();
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return (): void => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clickOutside, ref]);
};

export const AppModal: FC<IProps> = ({ children, clickOutside }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef, clickOutside);
    return (
        <div ref={wrapperRef}>
            <div>{children}</div>
        </div>
    );
};
