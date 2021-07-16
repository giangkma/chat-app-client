import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import './pageSheel.stylesheet.css';

type IProps = {
    timeOut?: number;
};

export const PageShell: FC<IProps> = ({ children, timeOut = 300 }) => {
    return (
        <CSSTransition
            timeout={timeOut}
            classNames="fade"
            mountOnEnter={false}
            unmountOnExit={true}
            in
        >
            <div className="h-full fade">{children}</div>
        </CSSTransition>
    );
};
