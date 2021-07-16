import React, { FC } from 'react';
import { getAvatar } from 'src/utils/stringUtils';

type IProps = {
    id: string;
    username: string;
    openConversation: (id: string) => void;
};

const SearchTile: FC<IProps> = ({ id, username, openConversation }) => {
    return (
        <div
            className="flex max-w-full hover:bg-gray-300 rounded-lg cursor-pointer"
            onClick={(): void => {
                openConversation(id);
            }}
        >
            <img
                src={getAvatar(username)}
                className="h-12 w-12 mx-4 p-1 rounded-full"
                alt="avatar"
            />
            <div className="hidden md:flex flex-col h-full justify-center items-center overflow-hidden">
                <span className="text-base truncate">{username}</span>
            </div>
        </div>
    );
};

export default SearchTile;
