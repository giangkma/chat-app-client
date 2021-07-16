import { IEmojiPickerProps } from 'emoji-picker-react';
import React, { FC, useCallback, useRef, useState } from 'react';
import socket from 'src/config/SOCKET_CONFIG';
import container from 'src/container';
import { AppModal } from 'src/view/components/modal/AppModal';
import {
    addNewMessage,
    toggleEmoji,
    updateConversation,
} from '../../consersationState/actions';
import { useChat } from '../../consersationState/store';
import EmojiPicker from './EmojiPicker';

const {
    cradle: { chatService },
} = container;

type IProps = {
    cid: string;
    uid: string;
};

const InputPanel: FC<IProps> = ({ cid, uid }) => {
    const chatFieldRef = useRef<any>(null);
    const [state, dispatch] = useChat();
    const { isEmojiShow } = state;
    const [isSending, setSending] = useState(false);

    let timeout: any = null;
    const myUsername = localStorage.username;

    const stoppedTyping = useCallback(() => {
        socket.emit('user-typing-message', {
            cid: cid,
            uid: uid,
            isTyping: false,
        });
    }, [cid, uid]);

    const sendMessage = useCallback(async () => {
        try {
            const content = chatFieldRef.current.value;
            chatFieldRef.current.value = '';
            if (!content || content === '') return;
            setSending(true);

            const res = await chatService.sendMessage({
                cid: cid,
                uid: uid,
                content: content,
                username: myUsername,
            });
            if (res) {
                dispatch(addNewMessage(res.conversation, res.newMessage));
                dispatch(updateConversation(res.conversation));
                if (timeout) clearTimeout(timeout);
                stoppedTyping();
                socket.emit('user-send-message', {
                    conversation: res.conversation,
                    newMessage: res.newMessage,
                });
            }
            setSending(false);
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, cid]);

    const onToogleShowEmoji = (): void => {
        dispatch(toggleEmoji(!isEmojiShow));
    };

    const onHideEmoji = useCallback((): void => {
        dispatch(toggleEmoji(false));
    }, [dispatch]);

    const onSelectPicker = (picker: string): void => {
        chatFieldRef.current.value += picker;
    };

    return (
        <div className="w-full bg-white flex px-4 w-7/8 self-end pb-6 pt-3">
            <div className="flex-grow flex-shrink flex items-center">
                <input
                    type="search"
                    ref={chatFieldRef}
                    className="px-4 py-2 w-full bg-gray-300 text-gray-900 rounded-full outline-none truncate"
                    onChange={(): void => {
                        socket.emit('user-typing-message', {
                            cid: cid,
                            uid: uid,
                            isTyping: true,
                            name: myUsername,
                        });
                        if (timeout) clearTimeout(timeout);
                        timeout = setTimeout(stoppedTyping, 1500);
                    }}
                    onKeyPress={event => {
                        if (event.key === 'Enter' || event.keyCode === 13) {
                            sendMessage();
                        }
                    }}
                    placeholder="Input your message..."
                />
                {isEmojiShow && (
                    <AppModal clickOutside={onHideEmoji}>
                        <EmojiPicker onSelectPicker={onSelectPicker} />
                    </AppModal>
                )}
                <button
                    onClick={onToogleShowEmoji}
                    className="focus:outline-none -ml-8"
                >
                    <svg height="24px" width="24px" viewBox="0 0 26 26">
                        <g fill="none" fillRule="evenodd">
                            <polygon points="0,26 26,26 26,0 0,0 "></polygon>
                            <path
                                d="m19.1311,16.73095c-0.4325,-0.3545 -1.0775,-0.302 -1.441,0.122c-1.171,1.3615 -2.883,2.142 -4.697,2.142c-1.8135,0 -3.526,-0.7805 -4.697,-2.142c-0.363,-0.4225 -1.008,-0.4765 -1.441,-0.122c-0.432,0.355 -0.488,0.986 -0.1245,1.408c1.5605,1.8145 3.8435,2.855 6.2625,2.855c2.4195,0 4.702,-1.0405 6.2625,-2.855c0.3635,-0.422 0.3075,-1.053 -0.1245,-1.408m-2.1355,-7.731c-0.9375,0 -1.5,0.75 -1.5,2c0,1.25 0.5625,2 1.5,2c0.9375,0 1.5,-0.75 1.5,-2c0,-1.25 -0.5625,-2 -1.5,-2m-8,0c-0.9375,0 -1.5,0.75 -1.5,2c0,1.25 0.5625,2 1.5,2c0.9375,0 1.5,-0.75 1.5,-2c0,-1.25 -0.5625,-2 -1.5,-2m4.0045,16c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.6275,0 12,5.3725 12,12c0,6.6275 -5.3725,12 -12,12"
                                fill="#4299e1"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>

            <button
                className="flex-shrink-0 my-1 mx-2 bg-blue-500 rounded-full  focus:outline-none"
                style={{ flexBasis: 100 }}
                onClick={sendMessage}
                disabled={isSending}
            >
                {isSending ? (
                    <div className="spinner">A</div>
                ) : (
                    <div className="flex items-center justify-center text-white ">
                        <span className="font-semibold mr-1 ">Send</span>
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 1000 1000"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10,991.1l980-493.2L10,8.9l101.1,415.7l532.7,73.4l-532.7,70.5L10,991.1z" />
                        </svg>
                    </div>
                )}
            </button>
        </div>
    );
};

export default InputPanel;
