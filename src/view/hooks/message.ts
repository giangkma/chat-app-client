import { useCallback, useState } from 'react';

export type MessageProps = {
    message?: string;
    isSuccess?: boolean;
};

export type MessageState = {
    message?: string;
    isSuccess: boolean;
    setMessage: (val: MessageProps) => void;
    clearMessage: () => void;
};

export function useMessageData(): MessageState {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>();

    return {
        message,
        isSuccess,
        setMessage: useCallback(msg => {
            setIsSuccess(msg.isSuccess || false);
            setMessage(msg.message);
        }, []),
        clearMessage: useCallback(() => {
            setIsSuccess(false);
            setMessage(undefined);
        }, []),
    };
}
