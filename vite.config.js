import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: '/Front-End-Developer-Trial-Task-Immersive-Cinematic-UI/',
    server: {
        port: 3000,
        historyApiFallback: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    }
})