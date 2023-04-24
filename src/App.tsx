import {
  MouseEvent,
  useRef,
  useCallback,
  useEffect,
  useState,
  Suspense,
} from "react";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./containers/Nav";
import { Home } from "./pages/Home";

import useSocket from "./hooks/useSocket";
import { ContactUs } from "./pages/Contact";
import ContactUsForm from "./containers/ContactUsForm";
import useDynamicComponent from "./hooks/useDynamicComponent";
import Spinner from "./components/Spinner";
import Liability from "./containers/Liability";
import Selection from "./containers/Selection";
const Components = {
  home: Home,
  contact: ContactUsForm,
  liability: Liability,
};

export function App() {
  const [socket, component] = useDynamicComponent();
  // const [isConnected, setIsConnected] = useState(!!socket?.connected);

  // useEffect(() => {}, [Component.current]);

  // const onClick = useCallback(
  //   (e: MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     if (!socket) return;
  //     socket.emit("getComponent");
  //   },
  //   [socket]
  // );
  // [];
  const listener = useCallback((e) => {
    console.log("listener", e);
  }, []);
  useEffect(() => {
    document.addEventListener("chulander", listener);
    return () => {
      document.removeEventListener("chulander", listener);
    };
  }, [listener]);

  return (
    <section className="m-auto my-8 flex max-w-screen-2xl items-center">
      <Selection socket={socket}></Selection>

      <Suspense fallback={<Spinner />}>
        {component && (
          <div dangerouslySetInnerHTML={{ __html: component }}></div>
        )}
      </Suspense>
    </section>
  );
}

export default App;
