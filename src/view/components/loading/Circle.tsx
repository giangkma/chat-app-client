import React, { FC } from 'react';
import classnames from 'classnames';

interface Props {
    size?: string;
    loading: boolean;
    classNameContainer?: string;
    title?: string;
    isGlobal?: boolean;
}

export const LoadingCircle: FC<Props> = ({
    size = '15px',
    loading,
    classNameContainer = 'fixed bg-black ',
    title,
    isGlobal = true,
}) => {
    return (
        <>
            {loading && (
                <div
                    style={{ zIndex: 100 }}
                    className={classnames(
                        classNameContainer,
                        'w-full h-full flex items-center flex-col justify-center top-0 left-0 bg-opacity-75',
                    )}
                >
                    <div
                        style={{ width: size, height: size }}
                        className={`animate-blur-${
                            isGlobal ? 'big' : 'small'
                        } bg-peachOrange rounded-full ${title && 'mb-16'}`}
                    ></div>
                    {title && (
                        <div>
                            <p className="absolute top-1/2 transform -translate-x-1/2 text-center text-peachOrange">
                                {title}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
