import React, { FC } from 'react';
import { SpinnerIconSVG } from 'src/assets/svg';

type Props = {
    color?: string;
    loading: boolean;
};

export const Spinner: FC<Props> = ({ color = 'text-white', loading }) => {
    return (
        <>
            {loading && (
                <div className="fixed w-full h-full top-0 left-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <SpinnerIconSVG
                        className={`animate-spin -ml-1 mr-3 h-8 w-8 ${color}`}
                    />
                </div>
            )}
        </>
    );
};
