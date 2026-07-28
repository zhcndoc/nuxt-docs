import { hasProtocol, joinURL } from 'ufo'
import { parse } from 'devalue'
import { getCurrentInstance, onServerPrefetch, reactive } from 'vue'
import { useNuxtApp, useRuntimeConfig } from '../nuxt'
import type { NuxtPayload } from '../nuxt'
import { useHead } from './head'

import { useRoute } from './router'
import { getAppManifest, getRouteRules } from './manifest'

// @ts-expect-error virtual import
import { appId, appManifest, multiApp, payloadExtraction, renderJsonPayloads } from '#build/nuxt.config.mjs'

interface LoadPayloadOptions {
  fresh?: boolean
  hash?: string
}

/** @since 3.0.0 */
export async function loadPayload (url: string, opts: LoadPayloadOptions = {}): Promise<Record<string, any> | null> {
  if (import.meta.server || !payloadExtraction) { return null }
  if (await shouldLoadPayload(url)) {
    const payloadURL = await _getPayloadURL(url, opts)
    // cached (`isr`/`swr`/`cache`) payloads are mutable within a deploy, so `?buildId`
    // cannot invalidate them - defer to normal HTTP cache semantics instead
    const cache: RequestCache = isCachedPayloadRoute(url) ? 'default' : 'force-cache'
    return await _importPayload(payloadURL, cache) || null
  }
  return null
}
let linkRelType: string | undefined
function detectLinkRelType () {
  if (import.meta.server) { return 'preload' }
  if (linkRelType) { return linkRelType }
  const relList = document.createElement('link').relList
  linkRelType = relList && relList.supports && relList.supports('prefetch') ? 'prefetch' : 'preload'
  return linkRelType
}
/** @since 3.0.0 */
export function preloadPayload (url: string, opts: LoadPayloadOptions = {}): Promise<void> {
  const nuxtApp = useNuxtApp()
  const promise = shouldLoadPayload(url).then(async (shouldPreload) => {
    if (!shouldPreload) {
      return
    }
    const payloadURL = await _getPayloadURL(url, opts)
    const link = renderJsonPayloads
      ? { rel: detectLinkRelType(), as: 'fetch', crossorigin: 'anonymous', href: payloadURL } as const
      : { rel: 'modulepreload', crossorigin: '', href: payloadURL } as const

    if (import.meta.server) {
      nuxtApp.runWithContext(() => useHead({ link: [link] }))
    } else {
      const linkEl = document.createElement('link')
      for (const key of Object.keys(link) as Array<keyof typeof link>) {
        linkEl[key === 'crossorigin' ? 'crossOrigin' : key] = link[key]!
      }
      document.head.appendChild(linkEl)
      return new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          linkEl.removeEventListener('load', onLoad)
          linkEl.removeEventListener('error', onError)
        }
        const onLoad = () => { cleanup(); resolve() }
        const onError = () => { cleanup(); reject() }
        linkEl.addEventListener('load', onLoad)
        linkEl.addEventListener('error', onError)
      })
    }
  })
  if (import.meta.server) {
    onServerPrefetch(() => promise)
  }
  return promise
}

// --- Internal ---

const filename = renderJsonPayloads ? '_payload.json' : '_payload.js'
const payloadBuildIdParam = '_b'
async function _getPayloadURL (url: string, opts: LoadPayloadOptions = {}) {
  const u = new URL(url, 'http://localhost')
  if (u.host !== 'localhost' || hasProtocol(u.pathname, { acceptRelative: true })) {
    throw new Error('Payload URL must not include hostname: ' + url)
  }
  const config = useRuntimeConfig()
  const hash = opts.hash || (opts.fresh || import.meta.dev ? Date.now() : config.app.buildId)
  const cdnURL = config.app.cdnURL
  const baseOrCdnURL = cdnURL && await isPrerendered(url) ? cdnURL : config.app.baseURL
  const payloadURL = joinURL(baseOrCdnURL, u.pathname, filename)

  if (!isCachedPayloadRoute(url)) {
    u.search = ''
  }
  if (hash) {
    u.searchParams.set(payloadBuildIdParam, String(hash))
  }

  return payloadURL + u.search
}

async function _importPayload (payloadURL: string, cache: RequestCache) {
  if (import.meta.server || !payloadExtraction) { return null }
  try {
    if (renderJsonPayloads) {
      const res = await fetch(payloadURL, import.meta.dev ? {} : { cache })
      if (!res.ok) {
        if (import.meta.dev) {
          console.warn(`[nuxt] Cannot load payload ${payloadURL}: ${res.status} ${res.statusText}`)
        }
        return null
      }
      return await parsePayload(await res.text())
    } else {
      return await import(/* webpackIgnore: true */ /* @vite-ignore */ payloadURL).then(r => r.default || r)
    }
  } catch (err) {
    console.warn('[nuxt] Cannot load payload ', payloadURL, err)
  }
  return null
}

function _shouldLoadPrerenderedPayload (rules: Record<string, any>) {
  if (rules.redirect) {
    return false
  }
  if (rules.prerender) {
    return true
  }
}

function _getRoutePath (url: string) {
  return new URL(url, 'http://localhost').pathname
}

/** @internal */
export function isCachedPayloadRoute (url: string): boolean {
  return !!getRouteRules({ path: _getRoutePath(url) }).payload
}

async function _isPrerenderedInManifest (url: string) {
  // Note: Alternative for server is checking x-nitro-prerender header
  if (!appManifest) {
    return false
  }
  url = _getRoutePath(url)
  url = url === '/' ? url : url.replace(/\/$/, '')
  try {
    const manifest = await getAppManifest()
    return manifest.prerendered.includes(url)
  } catch {
    // handle errors fetching manifest
    return false
  }
}

/**
 * @internal
 */
export async function shouldLoadPayload (url = useRoute().path) {
  const rules = getRouteRules({ path: _getRoutePath(url) })
  if (rules.ssr === false) {
    return false
  }
  const res = _shouldLoadPrerenderedPayload(rules)
  if (res !== undefined) {
    return res
  }

  if (rules.payload) {
    return true
  }

  const prerendered = await _isPrerenderedInManifest(url)
  return prerendered
}

/** @since 3.0.0 */
export async function isPrerendered (url = useRoute().path) {
  const res = _shouldLoadPrerenderedPayload(getRouteRules({ path: _getRoutePath(url) }))
  if (res !== undefined) {
    return res
  }

  const prerendered = await _isPrerenderedInManifest(url)
  return prerendered
}

let payloadCache: NuxtPayload | null = null

/** @since 3.4.0 */
export async function getNuxtClientPayload () {
  if (import.meta.server) {
    return null
  }
  if (payloadCache) {
    return payloadCache
  }

  const el = multiApp ? document.querySelector(`[data-nuxt-data="${appId}"]`) as HTMLElement : document.getElementById('__NUXT_DATA__')
  if (!el) {
    return {} as Partial<NuxtPayload>
  }

  const inlineData = await parsePayload(el.textContent || '')

  // `prerenderedAt` is only set for build-time prerendered HTML - without it, the page
  // was rendered at runtime (`isr`/`swr`/`cache`) and the external payload must match
  // the HTML we were just served, so revalidate instead of trusting the browser cache
  const externalData = el.dataset.src ? await _importPayload(el.dataset.src, inlineData.prerenderedAt ? 'force-cache' : 'no-cache') : undefined

  payloadCache = {
    ...inlineData,
    ...externalData,
    ...(multiApp ? window.__NUXT__?.[appId] : window.__NUXT__),
  }

  if (payloadCache!.config?.public) {
    payloadCache!.config.public = reactive(payloadCache!.config.public)
  }

  return payloadCache
}

export async function parsePayload (payload: string) {
  return await parse(payload, useNuxtApp()._payloadRevivers)
}

/**
 * This is an experimental function for configuring passing rich data from server -> client.
 * @since 3.4.0
 */
export function definePayloadReducer (
  name: string,
  reduce: (data: any) => any,
) {
  if (import.meta.server) {
    useNuxtApp().ssrContext!['~payloadReducers'][name] = reduce
  }
}

/**
 * This is an experimental function for configuring passing rich data from server -> client.
 *
 * This function _must_ be called in a Nuxt plugin that is `unshift`ed to the beginning of the Nuxt plugins array.
 * @since 3.4.0
 */
export function definePayloadReviver (
  name: string,
  revive: (data: any) => any | undefined,
) {
  if (import.meta.dev && getCurrentInstance()) {
    console.warn('[nuxt] [definePayloadReviver] This function must be called in a Nuxt plugin that is `unshift`ed to the beginning of the Nuxt plugins array.')
  }
  if (import.meta.client) {
    useNuxtApp()._payloadRevivers[name] = revive
  }
}
