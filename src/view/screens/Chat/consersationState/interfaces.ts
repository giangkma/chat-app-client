import { ConversationInfo, Message } from 'src/domain/conversation';

export interface ChatStoreType {
    conversations: ConversationInfo[];
    isReady: boolean;
    sessionValid: boolean;
    refresh: boolean;
    newMessage: any;
    isEmojiShow: boolean;
    inputEvent: any;
}

/* ----- Type keys and Interfaces for actions ----- */

export enum ChatTypeKeys {
    updateConversations = 'UPDATE_CONVERSATION',
    updateConversation = 'UPDATE_CONVERSATIONS',
    addConversation = 'ADD_CONVERSATION',
    updateRefresh = 'REFRESH',
    addNewMessage = 'NEW_MASSAGE',
    toggleEmoji = 'TOGGLE-EMOJI',
    updateInputEvent = 'UPDATE_INPUT',
}

export interface UpdateConversations {
    type: ChatTypeKeys.updateConversations;
    conversations: ConversationInfo[];
}

export interface UpdateConversation {
    type: ChatTypeKeys.updateConversation;
    conversation: ConversationInfo;
}

export interface AddConversation {
    type: ChatTypeKeys.addConversation;
    conversation: ConversationInfo;
}

export interface UpdateRefresh {
    type: ChatTypeKeys.updateRefresh;
}

export interface AddNewMessage {
    type: ChatTypeKeys.addNewMessage;
    conversation: ConversationInfo;
    message: Message;
}

export interface ToggleEmoji {
    type: ChatTypeKeys.toggleEmoji;
    status: boolean;
}

export interface UpdateInputEvent {
    type: ChatTypeKeys.updateInputEvent;
    inputEvent: string;
}
