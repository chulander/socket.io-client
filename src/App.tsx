import { Suspense, useEffect, useState } from "react";
import useDynamicComponent from "./hooks/useDynamicComponent";
import Spinner from "./components/Spinner";
import Selection from "./containers/Selection";
import Nav from "./containers/Nav";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema } from "@rjsf/utils";

export function App() {
  const [socket, _component] = useDynamicComponent();
  const [component, setComponent] = useState(_component);

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
  useEffect(() => {
    if (_component) {
      setComponent(_component);
    }
  }, [_component]);

  return (
    <section className="container m-auto my-8 flex w-full max-w-screen-2xl flex-col items-center">
      <Nav className="w-full" />
      <Selection socket={socket} />
      <div className="px-8">
        <Suspense fallback={<Spinner />}>
          {component && (
            <div className="flex space-x-4">
              <Form
                schema={JSON.parse(component as string) as RJSFSchema}
                validator={validator}
              />
              <textarea
                defaultValue={component as string}
                value={component as string}
              ></textarea>
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
}

export default App;
