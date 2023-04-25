// import ReactDOMServer from "react-dom/server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";
// import { createClient } from "redis";
// import { createAdapter } from "@socket.io/redis-streams-adapter";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenvSafe from "dotenv-safe";
// import { ContactUsForm } from "./src/containers/ContactUsForm";

dotenvSafe.config();

console.log("what is import.meta.url", import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = parseInt(process.env.VITE_SERVER_PORT || "3000");

// const redisClient = createClient({ host: "localhost", port: 6379 });

async function createServer() {
  const app = express();
  // await redisClient.connect();
  app.use(cors());

  const server = http.createServer(app);

  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("getComponent", async (data) => {
      const components = [
        { Contact: "./src/containers/ContactUsForm.tsx" },
        { Liability: "./src/containers/Liability.tsx" },
        { Car: "./src/containers/CarInsurance.tsx" },
        { Home: "./src/containers/HomeInsurance.tsx" },
      ];
      const ResolvedComponents = await Promise.all(
        components.map(async (item) =>
          vite.ssrLoadModule(Object.values(item)[0])
        )
      );
      const mappings = new Map();
      components.forEach((item, i) => {
        mappings.set(Object.keys(item)[0], ResolvedComponents[i]);
      });

      // const component = await vite.ssrLoadModule(
      //   "./src/containers/ContactUsForm.tsx"
      // );
      const component = mappings.get(data);
      const { render } = await vite.ssrLoadModule(
        "./src/entry-server-wrapper.tsx"
      );
      const str = await render(component.default);
      // // console.log("what is rendered str", str);

      socket.emit("component", str);
      // stream.pipe(str);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // clearInterval(interval);
    });
  });

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  server.listen(port);
}

createServer();
