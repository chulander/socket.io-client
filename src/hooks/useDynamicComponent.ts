import { useState, useCallback, useEffect } from "react";
import { Socket } from "socket.io-client";

import { useSocket } from "./useSocket";
export type DynamicComponentType = [
  socket: Socket | null,
  component: string | TrustedHTML
];
export function useDynamicComponent(): DynamicComponentType {
  const [socket, isConnected] = useSocket();

  const [component, setComponent] = useState<string | TrustedHTML>("");
  const onMessage = useCallback((data: unknown) => {
    console.log("message", data);
  }, []);

  const onComponent = useCallback((data: unknown) => {
    if (typeof data === "string") {
      console.log("setting Component", data);
      setComponent(data as TrustedHTML);
    }
  }, []);
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("message", onMessage);
    socket.on("component", onComponent);

    return () => {
      socket?.off("message", onMessage);
      socket?.off("component", onComponent);
    };
  }, [socket, isConnected, onMessage, onComponent]);
  return [socket, component];
}

export default useDynamicComponent;
