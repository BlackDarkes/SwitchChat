/* eslint-disable @typescript-eslint/no-explicit-any */
import { IServerToClientEvents } from "@/shared/api/socket";
import { DependencyList, useEffect } from "react";
import { useSocket } from "./useSocket";

export const useSocketEvent = <T extends keyof IServerToClientEvents>(
  event: T,
  handler: IServerToClientEvents[T],
  deps: DependencyList = [],
) => {
  const { isConnected, socket } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on(event, handler as any);
    return () => {
      socket.off(event, handler as any);
    }
  }, [socket, isConnected, event, ...deps]);
}