import React, { FC } from 'react';
import { getAvatar } from 'src/utils/stringUtils';

type IProps = {
    name: string;
};

const TitleBar: FC<IProps> = ({ name }) => {
    return (
        <div className="h-20 bg-white flex justify-between border-b-2 border-gray-200 self-start w-full">
            <div className="flex h-full items-center w-full">
                <img
                    src={getAvatar(name)}
                    className="w-20 h-20 rounded-full p-4 "
                    alt="avatar"
                />
                <h1 className="font-semibold text-base">{name}</h1>
            </div>
        </div>
    );
};

export default TitleBar;
