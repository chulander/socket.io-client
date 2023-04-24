import { MouseEvent, useRef, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./containers/Nav";
import { Home } from "./pages/Home";

import useSocket from "./hooks/useSocket";
import { ContactUs } from "./pages/Contact";
import ContactUsForm from "./containers/ContactUsForm";
import useDynamicComponent from "./hooks/useDynamicComponent";
const Components = {
  home: Home,
  contact: ContactUsForm,
};

export function App() {
  const [socket, component] = useDynamicComponent();
  // const [isConnected, setIsConnected] = useState(!!socket?.connected);

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
  return !component ? (
    <Home onClick={onClick} />
  ) : (
    // <Home onClick={onClick} />
    <div dangerouslySetInnerHTML={{ __html: component }}></div>
  );
  // const Component = Components[component];
  // return !Component ? null : <Component onClick={onClick} />;
}

export default App;
