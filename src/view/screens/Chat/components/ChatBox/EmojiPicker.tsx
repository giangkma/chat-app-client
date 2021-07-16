import Picker from 'emoji-picker-react';
import React, { FC } from 'react';

type IProps = {
    onSelectPicker: (picker: string) => void;
};

const EmojiPicker: FC<IProps> = ({ onSelectPicker }) => {
    return (
        <Picker
            onEmojiClick={(event, emoji): void => {
                onSelectPicker(emoji.emoji);
            }}
        />
    );
};

export default EmojiPicker;
