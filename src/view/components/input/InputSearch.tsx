import React, { FC } from 'react';
import { SearchIconSVG } from 'src/assets/svg';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    name: string;
    placeholder?: string;
    register?: () => void;
}

export const InputSearch: FC<Props> = ({
    classNameContainer = 'mb-4',
    classNameInput,
    placeholder,
    register,
    ...props
}) => {
    return (
        <div
            className={`${classNameContainer} flex items-center bg-woodyBrown rounded-xl pr-4 font-body`}
        >
            <input
                className={`
                    outline-none bg-woodyBrown text-white px-4 py-2 rounded-12px
                    ${classNameInput} 
                    `}
                type="text"
                placeholder={placeholder}
                ref={register}
                {...props}
            />
            <button type="button" className="outline-none focus:outline-none">
                <SearchIconSVG />
            </button>
        </div>
    );
};
