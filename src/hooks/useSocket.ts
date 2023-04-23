import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SERVER));
  }, []);
  const [isConnected, setIsConnected] = useState(!!socket?.connected);

  useEffect(() => {
    if (!socket) return;
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onMessage(data) {
      console.log("message", data);
      setIsConnected(true);
    }
    function onDisconnect(data) {
      console.log("disconnected", data);
      setIsConnected(false);
    }

    function onComponent(data) {
      console.log("component to render", data);
      console.log("what is data", data);
      if (data === "firstComponent") {
        // setComponent(ContactUsForm);
        // setComponent("contact");
        // Component.current = ContactUsForm;
      } else {
        // Component.current = Home;
        // setComponent("home");
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("component", onComponent);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      socket?.off("message", onMessage);
      socket?.off("component", onComponent);
    };
  }, [socket]);
  return socket;
}

export default useSocket;
