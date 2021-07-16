import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { getAvatar } from 'src/utils/stringUtils';
import { useAuth } from 'src/view/hooks';
import { Screen } from 'src/view/routes/Router';

const Header: FC = () => {
    const { onLogout } = useAuth();
    const history = useHistory();

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
                <button
                    className="bg-gray-200 rounded-full p-2 mr-2 focus:outline-none"
                    onClick={(): void => {
                        onLogout();
                        history.push(Screen.Login);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className=""
                    >
                        <path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;