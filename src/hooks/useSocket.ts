import { useContext } from 'react';
import { SocketContext } from '@/App';

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return { socket };
};
