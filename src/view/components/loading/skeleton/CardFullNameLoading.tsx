import React, { FC } from 'react';
import { CloseIconSVG } from 'src/assets/svg';

type IProps = {
    isRemove?: boolean;
    opacity?: number;
};

export const CardFullNameLoading: FC<IProps> = ({
    isRemove = false,
    opacity = 1,
}) => {
    return (
        <div
            style={{ opacity: opacity }}
            className="flex w-48 pr-5 items-center justify-between bg-starkWhite rounded-full p-1"
        >
            <div className="w-10 h-10 rounded-full bg-lightPeach bg-opacity-50 text-sm flex items-center justify-center">
                <p className="text-opacity-50 ">...</p>
            </div>
            {isRemove && (
                <button
                    type="button"
                    className="outline-none opacity-50 focus:outline-none"
                >
                    <CloseIconSVG />
                </button>
            )}
        </div>
    );
};
