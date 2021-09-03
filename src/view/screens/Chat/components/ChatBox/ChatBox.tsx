import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import socket from 'src/config/SOCKET_CONFIG';
import { getElementById } from 'src/utils/generalUtils';
import {
    addConversation,
    addNewMessage,
    updateConversation,
} from '../../consersationState/actions';
import { useChat } from '../../consersationState/store';
import InputPanel from './InputPanel';
import MessageList from './MessageList';
import TitleBar from './TitleBar';

type IProps = {
    userId: string;
};
type IParams = {
    chatId: string;
};

const ChatBox: FC<IProps> = ({ userId }) => {
    const { chatId } = useParams<IParams>();

    const [state, dispatch] = useChat();
    const { conversations, isReady } = state;

    const cvs = getElementById(chatId, conversations);
    const otherUsername =
        (userId === cvs.firstId ? cvs.secondUserName : cvs.firstUserName) || '';

    useEffect(() => {
        if (isReady) {
            socket.on('receive-message', ({ conversation, newMessage }) => {
                console.log('newMessage');
                const cvs = getElementById(conversation._id, conversations);
                if (cvs) {
                    if (localStorage.username === conversation.lastSender)
                        return;
                    dispatch(updateConversation(conversation));
                    dispatch(addNewMessage(conversation, newMessage));
                } else {
                    dispatch(addConversation(conversation));
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady]);

    socket.on('giang', string => {
        console.log(string);
    });

    return (
        <div className="flex-grow flex-shrink flex max-h-full border-l-2 border-gray-200 flex-col">
            <TitleBar name={otherUsername} />
            <MessageList name={otherUsername} conversation={cvs} />
            <div className="w-full">
                <InputPanel cid={chatId} uid={userId} />
            </div>
        </div>
    );
};

export default ChatBox;
