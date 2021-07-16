import Picker from 'emoji-picker-react';
import React, { FC } from 'react';
import { useChat } from '../../consersationState/store';

const EmojiPicker: FC = () => {
    const [state] = useChat();
    const { inputEvent } = state;
    return (
        <Picker
            onEmojiClick={(event, emoji) => {
                console.log(emoji.emoji);
                console.log(inputEvent);
            }}
        />
    );
};

export default EmojiPicker;
