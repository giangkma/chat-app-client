import { Location } from 'history';
import React, { FC, useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { ModalConfirmExit } from '../components/modal/ModalConfirmExit';

interface Props {
    when?: boolean | undefined;
    navigate: (path: string) => void;
    shouldBlockNavigation: (location: Location) => boolean;
}

export const RouteLeavingGuard: FC<Props> = ({
    when,
    navigate,
    shouldBlockNavigation,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [lastLocation, setLastLocation] = useState<Location | null>(null);

    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const closeModal = (): void => {
        setModalVisible(false);
    };

    const handleBlockedNavigation = (nextLocation: Location): boolean => {
        if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
            setModalVisible(true);
            setLastLocation(nextLocation);
            return false;
        }
        return true;
    };

    const handleConfirmNavigationClick = (): void => {
        setModalVisible(false);
        setConfirmedNavigation(true);
    };

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            // Navigate to the previous blocked location with your navigate function
            navigate(lastLocation.pathname);
        }
    }, [confirmedNavigation, lastLocation, navigate]);

    return (
        <>
            <Prompt when={when} message={handleBlockedNavigation} />
            {modalVisible && (
                <ModalConfirmExit
                    onAgree={handleConfirmNavigationClick}
                    onCancel={closeModal}
                    title="Ønsker du å avslutte?"
                />
            )}
        </>
    );
};
