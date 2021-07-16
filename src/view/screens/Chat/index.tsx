import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from './components/ChatBox/ChatBox';
import ChatList from './components/ChatList/ChatList';
import { ChatStore } from './consersationState/store';

type IParams = {
    chatId: string;
};

const Chat: FC = () => {
    const userId = localStorage.userId;
    const { chatId } = useParams<IParams>();

    return (
        <ChatStore>
            <div className="h-screen flex">
                <ChatList />
                <ChatBox chatId={chatId} userId={userId} />
            </div>
        </ChatStore>
    );
};

export default Chat;
