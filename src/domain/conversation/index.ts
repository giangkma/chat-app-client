export interface Message {
    _id: string;
    content: string;
    ofUser: string;
    time: string;
}

export interface ConversationInfo {
    _id: string;
    lastMessage: string;
    lastSender: string;
    firstId: string;
    secondId: string;
    firstUserName: string;
    secondUserName: string;
    message: Message[];
    lastUpdate: string;
}

export interface SendMessagePayload {
    cid: string;
    content: string;
    uid: string;
    username: string;
}
