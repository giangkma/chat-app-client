import React, { FC } from 'react';

type IProps = {
    title: string;
    className?: string;
    onClick?: () => void;
};
export const ChangeButton: FC<IProps> = ({ title, className, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={` hover:bg-white outline-none focus:outline-none hover:text-woodyBrown absolute right-0 bottom-0 border-1.6px border-white text-white bg-woodyBrown rounded-full transition-all duration-150 ${className}`}
        >
            {title}
        </button>
    );
};
