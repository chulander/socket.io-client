// import React from "react";
import ReactDOMServer from "react-dom/server";

export function render(Component: () => JSX.Element) {
  // let router = createStaticRouter(, context);
  // const headers = {
  //   headers: {
  //     "Content-Type": "text/html",
  //     "Cache-Control": "no-transform",
  //   },
  // };
  return ReactDOMServer.renderToString(<Component />);
}
