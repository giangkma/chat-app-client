import React, { FC } from 'react';
import { getAvatar } from 'src/utils/stringUtils';

import LogoutButton from './LogoutButton';

const Panel: FC = () => {
    return (
        <div className="h-20 bg-white flex justify-between ">
            <div className="flex h-full items-center">
                <img
                    src={getAvatar(localStorage.username)}
                    className="w-20 h-20 rounded-full p-4"
                    alt="My avatar"
                />
                <h1 className="hidden md:flex font-semibold text-2xl">Chat</h1>
            </div>

            <div className="hidden md:flex h-full items-center justify-between ">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Panel;
