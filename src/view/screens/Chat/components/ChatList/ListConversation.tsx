import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import socket from 'src/config/SOCKET_CONFIG';
import { ConversationInfo } from 'src/domain/conversation';
import { addConversation } from '../../consersationState/actions';
import { useChat } from '../../consersationState/store';
import Conversation from './Conversation';

type IParams = {
    chatId: string;
};

const ListConversation: FC = () => {
    const [state, dispatch] = useChat();
    const { conversations } = state;

    const { chatId } = useParams<IParams>();

    const history = useHistory();
    const myUsername = localStorage.username;
    const myId = localStorage.userId;

    useEffect(() => {
        socket.on('add-new-conversation', ({ conversation, receiveId }) => {
            if (myId === receiveId) {
                dispatch(addConversation(conversation));
            }
        });
    }, [dispatch, myId]);

    useEffect(() => {
        if (conversations.length) {
            conversations.forEach((item: ConversationInfo) => {
                socket.emit('user-join-room', { roomId: item._id });
            });
            if (!chatId && conversations.length > 0) {
                history.replace(`/chat/${conversations[0]._id}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversations]);

    return (
        <div className="bg-white flex flex-col items-center overflow-y-auto flex-grow ">
            <div className="w-full px-2 overflow-y-auto">
                {conversations.map((item: ConversationInfo) => (
                    <Conversation
                        key={item._id}
                        conversation={item}
                        otherName={
                            myUsername === item.firstUserName
                                ? item.secondUserName
                                : item.firstUserName
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default ListConversation;
