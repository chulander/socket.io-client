import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: parseInt(process.env.VITE_SERVER_PORT) || 4000,
      origin: `http://127.0.0.1:${process.env.VITE_SERVER_PORT}`,
    },
    plugins: [svgr(), react()],
  });
};
