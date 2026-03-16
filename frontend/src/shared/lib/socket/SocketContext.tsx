/* eslint-disable react-hooks/set-state-in-effect */
import { getSocket, initSocket } from "@/shared/api/socket";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ISocketContextType {
  isConnected: boolean;
  reconect: () => void;
}

interface SocketContextProps {
  children: ReactNode;
  apiUrl: string;
}

const SocketContext = createContext<ISocketContextType |  undefined>(undefined);

export const SocketContextProvider = ({
  children,
  apiUrl,
}: SocketContextProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const socket = initSocket(apiUrl);
    if (!socket) return;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [apiUrl]);

  const reconect = () => {
    try {
      const socket = getSocket();

      if (!socket.connected) socket.connect();
    } catch {
      /* */
    }
  };

  const value = {
    isConnected,
    reconect,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocketContext must be used within a SocketContextProvider");
  return context;
}