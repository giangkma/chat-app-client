import React from 'react';

export const useIsMountedRef = () => {
    const isMountedRef = React.useRef<boolean>();
    React.useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return isMountedRef;
};
