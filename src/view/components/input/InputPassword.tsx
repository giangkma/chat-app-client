import React, { useCallback, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { EyeActiveIconSVG, EyeInActiveIconSVG } from 'src/assets/svg';

interface Props {
    classNameContainer?: string;
    classNameInput?: string;
    msg?: FieldError;
    placeholder?: string;
    register?: () => void;
    defaultValue?: string;
    name?: string;
}

export const InputPassword: React.FC<Props> = ({
    classNameContainer,
    classNameInput,
    msg,
    placeholder,
    register,
    defaultValue,
    name = 'initialPassword',
    ...props
}) => {
    const [isViewPass, setIsViewPass] = useState<boolean>(false);

    const onToggleViewPass = useCallback(() => {
        setIsViewPass(prev => !prev);
    }, []);

    return (
        <div
            className={`${classNameContainer}  block w-full relative font-body mb-6 `}
        >
            <input
                className={`outline-none w-full h-12 focus:outline-none rounded-lg border-1.6px border-primaryColor border-b-4 text-white bg-transparent p-2 pl-4 ${classNameInput}`}
                type={isViewPass ? 'text' : 'password'}
                placeholder={placeholder}
                ref={register}
                defaultValue={defaultValue}
                name={name}
                {...props}
            />
            {isViewPass ? (
                <button type="button" onClick={onToggleViewPass}>
                    <EyeActiveIconSVG className="absolute top-0 mt-3 right-0 w-6 h-6 mr-4" />
                </button>
            ) : (
                <button type="button" onClick={onToggleViewPass}>
                    <EyeInActiveIconSVG className="absolute top-0 mt-3 right-0 w-6 h-6 mr-4" />
                </button>
            )}
            {msg && (
                <p className="text-red-400 text-left text-base italic mt-1 mb-3">
                    {msg.message}
                </p>
            )}
        </div>
    );
};
