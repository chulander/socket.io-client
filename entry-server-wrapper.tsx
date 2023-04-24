import React from "react";
import ReactDOMServer from "react-dom/server";
import { ContactUsForm } from "./src/containers/ContactUsForm";

export function render(Component: () => JSX.Element) {
  // let router = createStaticRouter(, context);
  return ReactDOMServer.renderToString(<Component />);
}
