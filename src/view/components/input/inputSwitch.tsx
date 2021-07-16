import React from 'react';

interface Props {
    checked: boolean;
    labelChecked?: string;
    labelUnchecked?: string;
    classNameContainer?: string;
    onClick: () => void;
}

export const InputSwitch: React.FC<Props> = ({
    checked,
    labelChecked = 'På',
    labelUnchecked = 'Av',
    classNameContainer,
    onClick,
}) => {
    return (
        <div className={`flex items-start ${classNameContainer}`}>
            <span className="text-white mr-2">
                {checked ? labelChecked : labelUnchecked}
            </span>
            <button
                type="button"
                onClick={onClick}
                className="outline-none focus:outline-none bg-lightPeach relative  w-10 h-6 rounded-full"
            >
                <span
                    className={`${checked &&
                        'transform translate-x-4'} transition duration-300 absolute w-4 h-4 rounded-full bg-woodyBrown top-0 left-0 mt-1 ml-1`}
                ></span>
            </button>
        </div>
    );
};
