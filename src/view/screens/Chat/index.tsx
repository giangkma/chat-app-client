import React, { FC } from 'react';
import ChatBox from './components/ChatBox/ChatBox';
import ChatList from './components/ChatList/ChatList';
import { ChatStore } from './consersationState/store';

const Chat: FC = () => {
    const userId = localStorage.userId;

    return (
        <ChatStore>
            <div className="h-screen flex">
                <ChatList />
                <ChatBox userId={userId} />
            </div>
        </ChatStore>
    );
};

export default Chat;
