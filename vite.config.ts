/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.sandbox.payinpos.com",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            proxyReq.setHeader(
              "X-CSRFTOKEN",
              "3Nt0AOXsQhoReRYAP8903hNNcoLJPdOV8TuzWPhOklNsp3nBtXoXSYWQfYiBgEQM"
            );
          });
        },
      },
    },
  },
});
