import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    msg?: FieldError;
    disabled?: boolean;
    register?: () => void;
}

export const InputText: FC<Props> = ({
    classNameContainer,
    classNameInput,
    placeholder,
    defaultValue,
    msg,
    register,
    ...props
}) => {
    return (
        <div className={`${classNameContainer} block w-full font-body`}>
            <input
                type="text"
                className={`outline-none w-full h-12 pr-10 xs:pr-0 focus:outline-none rounded-lg border-1.6px border-primaryColor border-b-4 text-white bg-transparent p-2 pl-4 ${classNameInput}`}
                placeholder={placeholder}
                ref={register}
                defaultValue={defaultValue}
                {...props}
            />
            {msg && (
                <p className="text-red-400 text-left text-base italic mt-1 mb-3">
                    {msg.message}
                </p>
            )}
        </div>
    );
};
