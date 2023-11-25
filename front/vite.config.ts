import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      assets: 'src/assets',
      components: 'src/components',
    },
  },
  plugins: [react()],
});
