import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    open: true,
    proxy: {
      "/api/v1": {
        target: "http://localhost:4000/",
        changeOrigin: true,
      },
    },
  }

});
