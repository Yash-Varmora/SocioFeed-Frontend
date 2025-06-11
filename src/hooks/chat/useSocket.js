import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
});

function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      toast.error('Disconnected from server');
    });

    socket.on('error', ({ message }) => {
      toast.error(message);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('error');
    };
  }, []);

  return { socket, isConnected };
}
export default useSocket;
