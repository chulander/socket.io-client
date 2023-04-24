import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  StaticHandlerContext,
  StaticRouter,
  StaticRouterProps,
  StaticRouterProvider,
  createStaticRouter,
} from "react-router-dom/server";
import ScrollToTop from "./hooks/ScrollToTop.ts";
import { App } from "./App";

export function render(
  url: StaticRouterProps["location"],
  context: StaticHandlerContext
) {
  // let router = createStaticRouter(, context);
  console.log("what is context", context);
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <ScrollToTop />
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}
