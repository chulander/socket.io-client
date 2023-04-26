import { Suspense, useCallback, useEffect, MouseEvent } from "react";
import useDynamicComponent from "./hooks/useDynamicComponent";
import Spinner from "./components/Spinner";
import Selection from "./containers/Selection";
import Nav from "./containers/Nav";

export function App() {
  const [socket, component] = useDynamicComponent();
  // const listener = useCallback((e) => {
  //   console.log("listener", e);
  // }, []);
  // useEffect(() => {
  //   document.addEventListener("chulander", listener);
  //   return () => {
  //     document.removeEventListener("chulander", listener);
  //   };
  // }, [listener]);
  // const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
  //   console.log("what is e", e);
  // }, []);
  useEffect(() => {
    function onSubmit(e: SubmitEvent) {
      console.log("what is e", e);
      e.preventDefault();
    }
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <section className="container m-auto my-8 flex w-full max-w-screen-2xl flex-col items-center">
      <Nav className="w-full" />
      <Selection socket={socket}></Selection>

      <Suspense fallback={<Spinner />}>
        {component && (
          <div
            dangerouslySetInnerHTML={{ __html: component }}
          ></div>
        )}
      </Suspense>
    </section>
  );
}

export default App;
