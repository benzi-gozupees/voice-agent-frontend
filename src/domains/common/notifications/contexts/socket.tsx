// import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// import io, { Socket } from 'socket.io-client';

// import { useAppSelector } from '@hooks/store';

// interface SocketProviderProps {
//     children: ReactNode;
// }

// const SocketContext = createContext<Socket | null>(null);

// export const useSocket = (): Socket | null => useContext(SocketContext);

// export default function SocketProvider({ children }: SocketProviderProps) {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const { token, user } = useAppSelector(state => state.auth);

//     useEffect(() => {
//         if (!user || !token) {
//             if (socket) {
//                 socket.disconnect();
//                 setSocket(null);
//             }
//             return;
//         }

//         const newSocket = io(import.meta.env.VITE_SERVER_URL as string, {
//             withCredentials: true,
//             extraHeaders: {
//                 authorization: `Bearer ${token}`,
//             },
//             reconnection: true,
//             reconnectionDelay: 500,
//             reconnectionAttempts: Infinity,
//         });

//         setSocket(newSocket);

//         newSocket.on('connect', () => {
//             console.log('Socket connected');
//         });

//         newSocket.on('disconnect', () => {
//             console.log('Socket disconnected');
//         });

//         // eslint-disable-next-line consistent-return
//         return () => {
//             newSocket.disconnect();
//             setSocket(null);
//         };

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [user, token]);

//     return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// }
