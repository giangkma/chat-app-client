import React, { FC } from 'react';

type IProps = {
    title: string;
    active?: boolean;
    submit?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    color?: 'blue' | 'green';
};
export const PrimaryButton: FC<IProps> = ({
    title,
    active,
    submit,
    className = 'px-12 py-3 mx-2 ',
    onClick,
    disabled,
    color = 'blue',
}) => {
    return (
        <button
            type={submit ? 'submit' : 'button'}
            className={`rounded-3xl border-b-6px outline-none hover:bg-opacity-75 focus:outline-none transition duration-150 ${
                color === 'green'
                    ? 'bg-brightGreen border-oliveGreen '
                    : color === 'blue'
                    ? 'bg-dodgerBlue border-easternBlue '
                    : ''
            } text-white sm:text-xl text-base ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};
