import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import { ChatReducer, initialState } from './reducer';
import { ChatStoreType } from './interfaces';
import { ChatActionTypes, updateConversations } from './actions';
import { useHistory } from 'react-router-dom';
import container from 'src/container';

type Dispatch = (action: ChatActionTypes) => void;

const ChatStateContext = createContext<ChatStoreType | undefined>(undefined);

const ChatDispatchContext = createContext<Dispatch | undefined>(undefined);

const {
    cradle: { chatService },
} = container;

const ChatStore = ({ children }: { children: ReactNode }): JSX.Element => {
    const [state, dispatch] = useReducer(ChatReducer, initialState);
    const history = useHistory();

    useEffect(() => {
        (async function fetchData(): Promise<void> {
            const { userId } = localStorage;
            if (!userId) return;
            const res = await chatService.getConversationList(userId);
            if (!res.list.length) {
                localStorage.removeItem('chattoken');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                history.replace('/');
            } else {
                dispatch(updateConversations(res.list));
            }
        })();
    }, [history]);

    return (
        <ChatStateContext.Provider value={state}>
            <ChatDispatchContext.Provider value={dispatch}>
                {children}
            </ChatDispatchContext.Provider>
        </ChatStateContext.Provider>
    );
};

function useChatState(): ChatStoreType {
    const context = useContext(ChatStateContext);

    if (context === undefined) {
        throw new Error('useChatFormState must be used within a ChatFormStore');
    }
    return context;
}

function useChatDispatch(): Dispatch {
    const context = useContext(ChatDispatchContext);

    if (context === undefined) {
        throw new Error(
            'useChatFormDispatch must be used within a ChatFormStore',
        );
    }
    return context;
}

function useChat(): [ChatStoreType, Dispatch] {
    return [useChatState(), useChatDispatch()];
}

export { ChatStore, useChatState, useChatDispatch, useChat };
