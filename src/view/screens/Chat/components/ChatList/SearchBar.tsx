import React, { FC } from 'react';

type IProps = {
    searchOnFocus: () => void;
    searchOutFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchPeople: (value: string) => void;
};

const SearchBar: FC<IProps> = ({
    searchOnFocus,
    searchOutFocus,
    searchPeople,
}) => {
    return (
        <div className="w-full px-4 my-3 hidden md:flex items-center relative ">
            <svg
                className="h-4 w-4 fill-current text-gray-700 absolute left ml-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
            <input
                type="search"
                className="w-full px-12 py-2 bg-gray-200 text-gray-700 rounded-full outline-none"
                placeholder="Search by name..."
                onFocus={(): void => searchOnFocus()}
                onBlur={(event): void => searchOutFocus(event)}
                onChange={(event): void => {
                    searchPeople(event.target.value);
                }}
            />
        </div>
    );
};

export default SearchBar;
