import React, { FC } from 'react';
import { getAvatar } from 'src/utils/stringUtils';

type IProps = {
    name: string;
};

const TypingIndicator: FC<IProps> = ({ name }) => {
    return (
        <div className="flex mx-3 mt-4 max-w-xs">
            <img
                src={getAvatar(name)}
                alt="avatar"
                className="h-8 w-8 self-end mr-2"
            />
            <div className="py-2 px-4 bg-gray-200 rounded-xl">
                <div className="max-w-xs break-words">
                    <div className="ticontainer">
                        <div className="tiblock text-opacity-50 text-gray-800">{`${name} Đang nhập ...`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
