import React, { FC } from 'react';
import avatarDefault from 'src/assets/images/client_default.png';

type IProps = {
    opacity?: number;
};

export const CardUserLoading: FC<IProps> = ({ opacity = 1 }) => {
    return (
        <div style={{ opacity: opacity }} className="text-center mt-4 mx-auto">
            <div className="flex items-center justify-center">
                <img
                    className="w-35 opacity-25 rounded-full h-35 object-cover"
                    src={avatarDefault}
                    alt="avatar consumer"
                />
            </div>
            <p className="mt-4 font-medium">...</p>
        </div>
    );
};
