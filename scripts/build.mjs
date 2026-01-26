import * as esbuild from 'esbuild'

const js = `#!/usr/bin/env node

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`

await esbuild.build({
  external: ['events'],
  entryPoints: ['src/index.ts'],
  platform: 'node',
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  banner: { js }
})
