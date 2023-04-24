import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export type UseSocketType = [socket: Socket | null, isConnected: boolean];
export function useSocket(): UseSocketType {
  const [socket, setSocket] = useState<Socket | null>(() => null);
  const [isConnected, setIsConnected] = useState(!!socket?.connected);

  useEffect(() => {
    if (window) {
      setSocket(io());
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect(data) {
      console.log("disconnected", data);
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return [socket, isConnected];
}

export default useSocket;
