import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "newstagingapilocal.nuaris.co",
    port: 3000
  }
});
