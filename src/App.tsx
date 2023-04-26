import { Suspense, useEffect } from "react";
import useDynamicComponent from "./hooks/useDynamicComponent";
import Spinner from "./components/Spinner";
import Selection from "./containers/Selection";
import Nav from "./containers/Nav";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";

export function App() {
  const [socket, component] = useDynamicComponent();

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
          <Form
            schema={JSON.parse(component as string) as RJSFSchema}
            validator={validator}
          />
        )}
      </Suspense>
    </section>
  );
}

export default App;
