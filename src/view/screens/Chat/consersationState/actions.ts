import { ConversationInfo, Message } from 'src/domain/conversation';
import {
    UpdateConversations,
    UpdateConversation,
    AddConversation,
    UpdateRefresh,
    AddNewMessage,
    ToggleEmoji,
    UpdateInputEvent,
    ChatTypeKeys,
} from './interfaces';

export type ChatActionTypes =
    | UpdateConversations
    | UpdateConversation
    | AddConversation
    | UpdateRefresh
    | AddNewMessage
    | ToggleEmoji
    | UpdateInputEvent;

export const updateConversations = (
    conversations: ConversationInfo[],
): UpdateConversations => ({
    type: ChatTypeKeys.updateConversations,
    conversations,
});

export const updateConversation = (
    conversation: ConversationInfo,
): UpdateConversation => ({
    type: ChatTypeKeys.updateConversation,
    conversation,
});

export const addConversation = (
    conversation: ConversationInfo,
): AddConversation => ({
    type: ChatTypeKeys.addConversation,
    conversation,
});

export const updateRefresh = (): UpdateRefresh => ({
    type: ChatTypeKeys.updateRefresh,
});

export const addNewMessage = (
    conversation: ConversationInfo,
    message: Message,
): AddNewMessage => ({
    type: ChatTypeKeys.addNewMessage,
    conversation,
    message,
});

export const toggleEmoji = (status: boolean): ToggleEmoji => ({
    type: ChatTypeKeys.toggleEmoji,
    status,
});

export const updateInputEvent = (inputEvent: string): UpdateInputEvent => ({
    type: ChatTypeKeys.updateInputEvent,
    inputEvent,
});
