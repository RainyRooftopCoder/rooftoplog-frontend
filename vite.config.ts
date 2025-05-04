import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 8237,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8236',
                changeOrigin: true,
                rewrite: (path) => path,
            },
        },
    },
});
