import { joinURL } from 'ufo'
import type { Plugin } from 'vite'
import { isCSS } from '../utils'

interface DevStyleSSRPluginOptions {
  srcDir: string
  buildAssetsURL: string
}

export function DevStyleSSRPlugin (options: DevStyleSSRPluginOptions): Plugin {
  return {
    name: 'nuxt:dev-style-ssr',
    apply: 'serve',
    enforce: 'post',
    applyToEnvironment: environment => environment.name === 'client',
    transform (code, id) {
      if (!isCSS(id) || !code.includes('import.meta.hot')) {
        return
      }

      let moduleId = id
      if (moduleId.startsWith(options.srcDir)) {
        moduleId = moduleId.slice(options.srcDir.length)
      }

      // When dev `<style>` is injected, remove the `<link>` styles from manifest
      const selectors = [joinURL(options.buildAssetsURL, moduleId), joinURL(options.buildAssetsURL, '@fs', moduleId)]
      return code + selectors.map(selector => `\ndocument.querySelectorAll(\`link[href="${selector}"]\`).forEach(i=>i.remove())`).join('')
    },
  }
}
