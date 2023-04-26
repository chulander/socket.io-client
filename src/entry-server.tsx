// import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, StaticRouterProps } from "react-router-dom/server";
import ScrollToTop from "./hooks/ScrollToTop.ts";
import { App } from "./App";
import "./index.css";

export function render(url: StaticRouterProps["location"]) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <ScrollToTop />
      <App />
    </StaticRouter>
  );
}
