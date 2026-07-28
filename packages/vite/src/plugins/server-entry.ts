import { resolve } from 'pathe'
import { setBuildOutput } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { Plugin } from 'vite'

export function ServerEntryPlugin (nuxt: Nuxt): Plugin | undefined {
  if (nuxt.options.dev) {
    return
  }

  const serverEntryFile = resolve(nuxt.options.buildDir, 'dist/server/server.mjs')
  // Re-export by absolute path (not file URL) so the nitro rollup build
  // inlines the entry and resolves its `#internal/*` imports at build time.
  const serverEntryCode = `export { default } from ${JSON.stringify(serverEntryFile)}`
  setBuildOutput('serverEntry', () => serverEntryCode)

  return {
    name: 'nuxt:server-entry',
    applyToEnvironment: env => env.name === 'ssr',
  }
}
