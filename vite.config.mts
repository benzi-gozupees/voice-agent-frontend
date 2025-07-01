import path from 'path';

// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@store': path.resolve(__dirname, './src/store'),
            '@components': path.resolve(__dirname, './src/components'),
            '@customTypes': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@domains': path.resolve(__dirname, './src/domains'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@src': path.resolve(__dirname, './src'),
        },
    },
});
