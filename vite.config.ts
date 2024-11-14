import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPresetEnv from 'postcss-preset-env';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

export default defineConfig({
    base: '/rork-books/',
    plugins: [react()],
    css: {
        modules: {
          localsConvention: 'camelCaseOnly' 
        },
        postcss: {
          plugins: [
            postcssFlexbugsFixes(), 
            postcssPresetEnv({
              stage: 3, 
              features: {
                'nesting-rules': true 
              },
              autoprefixer: {
                grid: true 
              },
            })
          ]
        }
      },
});