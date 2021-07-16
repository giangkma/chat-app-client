import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    msg?: FieldError;
    name: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    rows?: number;
    register?: () => void;
}

export const InputTextarea: FC<Props> = ({
    classNameContainer,
    classNameInput,
    label,
    placeholder,
    rows,
    register,
    msg,
    ...props
}) => {
    return (
        <div className={`${classNameContainer}  block w-full font-body `}>
            {label && (
                <label className="sm:text-xl text-lg block mb-3 leading-4">
                    {label}
                </label>
            )}
            <textarea
                className={`
                    outline-none bg-transparent text-xl  border-1.6px border-primaryColor border-b-4  text-white px-4 py-2 rounded-12px w-full
                        ${classNameInput}
                    `}
                rows={rows || 3}
                ref={register}
                placeholder={placeholder}
                {...props}
            />
            {msg && (
                <p className="text-sunsetOrange text-sm italic mt-1 mb-3">
                    {msg.message}
                </p>
            )}
        </div>
    );
};
