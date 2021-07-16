import { addSeconds, format } from 'date-fns';

export const formatTimeDuration = (seconds: number): string => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
};

export const getAvatar = (username: string) => {
    return `https://ui-avatars.com/api/?uppercase=true&name=${username}&rounded=true&size=128&length=4&font-size=0.33`;
};
