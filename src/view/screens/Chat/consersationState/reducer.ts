import { ChatActionTypes } from './actions';
import { ChatStoreType, ChatTypeKeys } from './interfaces';

export const initialState: ChatStoreType = {
    conversations: [],
    isReady: false,
    sessionValid: true,
    refresh: false,
    newMessage: { cid: '', message: {} },
    isEmojiShow: false,
    inputEvent: {},
};

export const ChatReducer = (
    state: ChatStoreType,
    action: ChatActionTypes,
): ChatStoreType => {
    switch (action.type) {
        case ChatTypeKeys.addNewMessage: {
            return {
                ...state,
                newMessage: {
                    cid: action.conversation._id,
                    message: action.message,
                },
            };
        }

        case ChatTypeKeys.updateConversations: {
            return {
                ...state,
                conversations: [...action.conversations],
                isReady: true,
            };
        }

        case ChatTypeKeys.toggleEmoji: {
            return { ...state, isEmojiShow: action.status };
        }

        case ChatTypeKeys.updateRefresh: {
            return { ...state, refresh: !state.refresh };
        }

        case ChatTypeKeys.updateConversation: {
            const newArray = state.conversations.filter(
                (obj: { _id: string }) => action.conversation._id !== obj._id,
            );
            return {
                ...state,
                conversations: [action.conversation, ...newArray],
                refresh: !state.refresh,
            };
        }

        case ChatTypeKeys.addConversation: {
            return {
                ...state,
                conversations: [action.conversation, ...state.conversations],
            };
        }

        case ChatTypeKeys.updateInputEvent: {
            return { ...state, inputEvent: action.inputEvent };
        }

        default:
            return state;
    }
};
