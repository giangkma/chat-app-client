import React, { FC, useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import socket from 'src/config/SOCKET_CONFIG';
import container from 'src/container';
import { ConversationInfo, Message } from 'src/domain/conversation';
import { useChat } from '../../consersationState/store';
import SingleMessage from './SingleMessage';
import TypingIndicator from './TypingIndicator';

const {
    cradle: { chatService },
} = container;

type IProps = {
    name: string;
    conversation: ConversationInfo;
};

const MessageList: FC<IProps> = ({ name, conversation }) => {
    const [state] = useChat();
    const { isReady, newMessage } = state;
    const userId = localStorage.userId;
    const [messages, setMessages] = useState<Message[]>([]);
    const [otherTyping, setOtherTyping] = useState(false);
    const [otherName, setOtherName] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                setLoading(true);
                if (conversation._id) {
                    const res = await chatService.getMessage(conversation._id);
                    const { messageList } = res;
                    setMessages(messageList);
                    socket.on('user-typing', ({ cid, uid, isTyping, name }) => {
                        if (cid === conversation._id && uid !== userId) {
                            setOtherName(name);
                            if (isTyping !== otherTyping) {
                                setOtherTyping(isTyping);
                            } else {
                                setOtherTyping(false);
                            }
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, conversation._id, userId]);

    useEffect(() => {
        if (conversation._id && newMessage) {
            if (conversation._id === newMessage.cid) {
                setMessages([...messages, newMessage.message]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation._id, newMessage]);

    useEffect(() => {
        animateScroll.scrollToBottom({
            containerId: 'messages',
            smooth: false,
            duration: 0,
        });
    }, [messages, otherTyping, isLoading]);

    return (
        <div
            className="bg-white flex-grow flex flex-col overflow-y-auto pb-3"
            id="messages"
        >
            {isLoading ? (
                <div className="spinner-md flex-grow">A</div>
            ) : (
                messages.map((el: Message) => (
                    <SingleMessage
                        key={el._id}
                        name={name}
                        message={el}
                        myId={userId}
                    />
                ))
            )}

            {otherTyping ? <TypingIndicator name={otherName} /> : null}
        </div>
    );
};

export default MessageList;
