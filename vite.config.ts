import { defineConfig, type Plugin, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/demo-admin' : '/',
  plugins: [react(), svgr(), tsconfigPaths(), basicSsl()],
  publicDir: 'public',
  preview: {
    strictPort: true,
    port: 5174,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: loadEnv(mode, process.cwd(), '').NODE_ENV !== 'development' ? '[hash:base64:12]' : undefined,
    },
  },
}));
