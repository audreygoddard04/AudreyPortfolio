import path from 'node:path';
import { fileURLToPath } from 'node:url';
export default { reactStrictMode: true,
  async redirects() { return [{ source: "/projects/athletics", destination: "/fitness", permanent: false }]; }, turbopack: { root: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..") } };
