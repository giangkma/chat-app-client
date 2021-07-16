import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import socket from 'src/config/SOCKET_CONFIG';
import container from 'src/container';
import { ConversationInfo } from 'src/domain/conversation';
import { addConversation } from '../../consersationState/actions';
import { useChat } from '../../consersationState/store';
import Panel from '../User/Panel';
import ListConversation from './ListConversation';
import ListSearchTile from './ListSearchTile';
import SearchBar from './SearchBar';

const {
    cradle: { chatService },
} = container;

const ChatList: FC = () => {
    const history = useHistory();
    const [state, dispatch] = useChat();
    const { conversations } = state;

    const [isSearchFocusing, updateSearchFocusing] = useState(false);
    const [isMouseOverResult, updateMouseOverResult] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    const myId = localStorage.userId;

    const fetchPeople = async (query: string): Promise<void> => {
        try {
            const res = await chatService.getPeople(query);
            setSearchResult(res);
        } catch (error) {
            console.log(error);
        }
    };

    const searchOnFocus = (): void => {
        updateSearchFocusing(true);
        fetchPeople('');
    };

    const searchOutFocus = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        event.target.value = '';

        updateSearchFocusing(false);
    };

    const openConversation = async (id: string): Promise<void> => {
        try {
            const res = await chatService.getConversationDetail(myId, id);
            const newConversation =
                conversations.find(
                    (c: ConversationInfo) => res.conversation._id === c._id,
                ) || 0;
            if (newConversation) {
            } else {
                dispatch(addConversation(res.conversation));
                socket.emit('new-conversation', {
                    conversation: res.conversation,
                    createId: localStorage.userId,
                });
            }
            updateSearchFocusing(false);
            updateMouseOverResult(false);
            history.push(`/chat/${res.conversation._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const setMouseOverResult = (isOver: boolean): void => {
        updateMouseOverResult(isOver);
    };

    return (
        <div className="flex flex-col w-1/4 max-h-screen">
            <Panel />
            <SearchBar
                searchOnFocus={searchOnFocus}
                searchOutFocus={searchOutFocus}
                searchPeople={fetchPeople}
            />
            {!isSearchFocusing && !isMouseOverResult ? (
                <ListConversation />
            ) : (
                <ListSearchTile
                    listResults={searchResult}
                    setMouse={setMouseOverResult}
                    openConversation={openConversation}
                />
            )}
        </div>
    );
};

export default ChatList;
