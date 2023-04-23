import { MouseEvent, useRef, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./containers/Nav";
import { Home } from "./pages/Home";

import useSocket from "./hooks/useSocket";
import { ContactUs } from "./pages/Contact";
import ContactUsForm from "./containers/ContactUsForm";
const Components = {
  home: Home,
  contact: ContactUsForm,
};

export default function Example() {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(!!socket?.connected);
  const [component, setComponent] = useState<keyof typeof Components>("home");

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
        setComponent("contact");
        // Component.current = ContactUsForm;
      } else {
        // Component.current = Home;
        setComponent("home");
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
  // useEffect(() => {}, [Component.current]);

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!socket) return;
      socket.emit("getComponent");
    },
    [socket]
  );
  [];
  const Component = Components[component];
  return !Component ? null : <Component onClick={onClick} />;
}
