import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://b-esper-apim.azure-api.net/dev/sessions/initiate';

if (!API_ENDPOINT) {
  throw new Error(`API_ENDPOINT is not defined in .env.${env}`);
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: `dist/besperjs.${env}.js`,
      format: 'umd',
      name: 'BesperJS',
      sourcemap: true,
    },
    {
      file: `dist/besperjs.${env}.mjs`,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    // Replace process.env.API_ENDPOINT with actual value
    {
      name: 'replace-env',
      transform(code) {
        return code.replace(/process\.env\.API_ENDPOINT/g, JSON.stringify(API_ENDPOINT));
      },
    },
    env === 'production' && terser(),
  ],
};
