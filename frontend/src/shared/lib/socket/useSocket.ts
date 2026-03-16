import { getSocket } from "@/shared/api/socket";
import { useSocketContext } from "./SocketContext";

export const useSocket = () => {
  const { isConnected } = useSocketContext();

  return {
    socket: isConnected ? getSocket() : null,
    isConnected,
  };
};
