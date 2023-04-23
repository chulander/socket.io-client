import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SERVER));
  }, []);
  return socket;
}

export default useSocket;
