import io from 'socket.io-client';
import API_CONFIG from './API_CONFIG';

const socket = io(`${API_CONFIG.HOST}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abcd',
    },
});

socket.on('disconnect', () => {
    if (localStorage.userId) {
        socket.emit('user-setOffline', localStorage.userId);
    }
});

export default socket;
