import React, { FC } from 'react';
import { User } from 'src/domain/user';
import SearchTile from './SearchTile';

type IProps = {
    listResults: User[];
    openConversation: (id: string) => void;
    setMouse: (value: boolean) => void;
};

const ListSearchTile: FC<IProps> = ({
    listResults,
    openConversation,
    setMouse,
}) => {
    return (
        <div
            className="px-2 mr-1 overflow-y-auto"
            onMouseOver={(): void => setMouse(true)}
            onMouseOut={(): void => setMouse(false)}
        >
            {listResults.map((result: User) => (
                <SearchTile
                    key={result._id}
                    username={result.username}
                    id={result._id}
                    openConversation={openConversation}
                />
            ))}
        </div>
    );
};

export default ListSearchTile;
