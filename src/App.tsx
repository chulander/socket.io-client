import { Suspense } from "react";
import useDynamicComponent from "./hooks/useDynamicComponent";
import Spinner from "./components/Spinner";
import Selection from "./containers/Selection";

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
