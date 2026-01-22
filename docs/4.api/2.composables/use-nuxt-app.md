---
title: 'useNuxtApp'
description: '访问 Nuxt 应用的共享运行时上下文。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` 是一个内置的 composable，用于访问 Nuxt 的共享运行时上下文，也称为 [Nuxt 上下文](/docs/4.x/guide/going-further/nuxt-app#the-nuxt-context)，该上下文在客户端和服务端均可用（但在 Nitro 路由中不可用）。它帮助你访问 Vue 应用实例、运行时钩子、运行时配置变量和内部状态，例如 `ssrContext` 和 `payload`。

```vue [app/app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

如果在你的作用域中运行时上下文不可用，调用 `useNuxtApp` 将抛出异常。对于不需要 `nuxtApp` 的 composable，或者仅想在不抛出异常的情况下检查上下文是否可用时，可以使用 [`tryUseNuxtApp`](/docs/4.x/api/composables/use-nuxt-app#tryusenuxtapp)。

<!--
note
By default, the shared runtime context of Nuxt is namespaced under the [`buildId`](/docs/4.x/api/nuxt-config#buildid) option. It allows the support of multiple runtime contexts.

## Params

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->

## 方法

### `provide (name, value)`

`nuxtApp` 是一个运行时上下文，你可以通过 [Nuxt 插件](/docs/4.x/directory-structure/app/plugins) 来扩展它。使用 `provide` 函数可以创建 Nuxt 插件，使值和辅助方法在所有 composable 和组件中通过 Nuxt 应用可用。

`provide` 函数接受 `name` 和 `value` 两个参数。

```ts
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', name => `Hello ${name}!`)

// Prints "Hello name!"
console.log(nuxtApp.$hello('name'))
```

如上例所示，`$hello` 已成为 `nuxtApp` 上下文中新增加的自定义部分，并且在所有可访问 `nuxtApp` 的地方都可用。

### `hook(name, cb)`

`nuxtApp` 中可用的钩子允许你自定义 Nuxt 应用的运行时各个方面。你可以在 Vue.js composable 和 [Nuxt 插件](/docs/4.x/directory-structure/app/plugins) 中使用运行时钩子来挂载到渲染生命周期。

`hook` 函数用于在渲染生命周期的特定点添加自定义逻辑。`hook` 函数多用于创建 Nuxt 插件。

可查看 Nuxt 调用的可用运行时钩子：[Runtime Hooks](/docs/4.x/api/advanced/hooks#app-hooks-runtime)。

```ts [app/plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* your code goes here */
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    // if (import.meta.client) {
    //   console.log(..._args)
    // }
  })
})
```

### `callHook(name, ...args)`

当与任何已存在的钩子一起调用时，`callHook` 会返回一个 Promise。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()` 暴露了以下属性，你可以使用它们来扩展和自定义应用、共享状态、数据和变量。

### `vueApp`

`vueApp` 是全局 Vue.js 的 [应用实例](https://vue.zhcndoc.com/api/application#application-api)，你可以通过 `nuxtApp` 访问它。

一些有用的方法：
- [`component()`](https://vue.zhcndoc.com/api/application#app-component) - 如果同时传入名称字符串和组件定义，则注册一个全局组件；如果只传入名称，则检索已注册的组件。
- [`directive()`](https://vue.zhcndoc.com/api/application#app-directive) - 如果同时传入名称字符串和指令定义，则注册一个全局自定义指令；如果只传入名称，则检索已注册的指令[(示例)](/docs/4.x/directory-structure/app/plugins#vue-directives)。
- [`use()`](https://vue.zhcndoc.com/api/application#app-use) - 安装一个 **[Vue.js 插件](https://vue.zhcndoc.com/guide/reusability/plugins)** [(示例)](/docs/4.x/directory-structure/app/plugins#vue-plugins)。

:read-more{icon="i-simple-icons-vuedotjs" to="https://vue.zhcndoc.com/api/application.html#application-api"}

### `ssrContext`

`ssrContext` 在服务端渲染期间生成，并且仅在服务器端可用。

Nuxt 通过 `ssrContext` 暴露以下属性：
- `url` (string) - 当前请求的 URL。
- `event` ([h3js/h3](https://github.com/h3js/h3) 请求事件) - 访问当前路由的请求与响应。
- `payload` (object) - NuxtApp 的 payload 对象。

### `payload`

`payload` 将数据和状态变量从服务端传递到客户端。下面的键在从服务端传递到客户端后会在客户端可用：

- `serverRendered` (boolean) - 表示响应是否为服务器端渲染。
- `data` (object) - 当你使用 [`useFetch`](/docs/4.x/api/composables/use-fetch) 或 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 从 API 端点获取数据时，生成的 payload 可从 `payload.data` 访问。这些数据会被缓存，有助于在相同请求多次发生时避免重复获取相同数据。

  ::code-group
  ```vue [app/app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', (_nuxtApp, { signal }) => $fetch('/api/count', { signal }))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler((event) => {
    return { count: 1 }
  })
  ```
  ::

  在上述示例中，使用 [`useAsyncData`](/docs/4.x/api/composables/use-async-data) 获取 `count` 的值后，如果你访问 `payload.data`，你会看到记录为 `{ count: 1 }`。

  当从 [`ssrcontext`](/docs/4.x/api/composables/use-nuxt-app#ssrcontext) 访问相同的 `payload.data` 时，你也可以在服务器端访问到相同的值。

- `state` (object) - 当你在 Nuxt 中使用 [`useState`](/docs/4.x/api/composables/use-state) composable 设置共享状态时，这些状态数据可通过 `payload.state.[name-of-your-state]` 访问。

  ```ts [app/plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  也可以使用更高级的类型，例如 `ref`、`reactive`、`shallowRef`、`shallowReactive` 和 `NuxtError`。

#### 自定义 Reducer/Reviver

自 [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) 起，可以为 Nuxt 不支持的类型自定义 reducer/reviver。

:video-accordion{title="观看 Alexander Lichter 关于序列化 payload（尤其是类序列化）的视频" videoId="8w6ffRBs8a4"}

在下面的示例中，我们通过一个 payload 插件为 [Luxon](https://moment.github.io/luxon/#/) 的 DateTime 类定义了 reducer（或序列化器）和 reviver（或反序列化器）。

```ts [app/plugins/date-time-payload.ts]
/**
 * This kind of plugin runs very early in the Nuxt lifecycle, before we revive the payload.
 * You will not have access to the router or other Nuxt-injected properties.
 *
 * Note that the "DateTime" string is the type identifier and must
 * be the same on both the reducer and the reviver.
 */
export default definePayloadPlugin((nuxtApp) => {
  definePayloadReducer('DateTime', (value) => {
    return value instanceof DateTime && value.toJSON()
  })
  definePayloadReviver('DateTime', (value) => {
    return DateTime.fromISO(value)
  })
})
```

### `isHydrating`

使用 `nuxtApp.isHydrating`（布尔值）来检查 Nuxt 应用是否在客户端进行 hydration。

```ts [app/components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  },
})
```

### `runWithContext`

::note
你很可能是因为收到 “Nuxt instance unavailable” 的消息才来到这里。请尽量少用此方法，并将导致问题的示例反馈给我们，以便最终在框架层面解决。
::

`runWithContext` 方法用于调用一个函数并为其提供一个显式的 Nuxt 上下文。通常情况下，Nuxt 上下文是隐式传递的，你无需担心此问题。然而，在中间件/插件中处理复杂的 `async`/`await` 场景时，可能会遇到在异步调用之后当前实例被取消设置的情况。

```ts [app/middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // the Vue/Nuxt compiler loses context here because of the try/catch block.
  } catch (e) {
    user = null
  }
  if (!user) {
    // apply the correct Nuxt context to our `navigateTo` call.
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 用法

```ts
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 任何需要当前 Nuxt 应用上下文的函数。此上下文将被正确自动应用。

`runWithContext` 将返回 `functionWithContext` 的返回值。

#### 更深入的上下文解释

Vue.js 的 Composition API（以及 Nuxt 的 composable）依赖于隐式上下文。生命周期期间，Vue 会将当前组件的临时实例（以及 Nuxt 的 nuxtApp 临时实例）设置到一个全局变量中，并在同一 tick 中取消设置它。在服务器端渲染时，会有来自不同用户的多个请求和在相同全局上下文中运行的 nuxtApp。为避免在两个用户或组件之间泄露共享引用，Nuxt 和 Vue 会立即取消设置这个全局实例。

这意味着什么？Composition API 和 Nuxt Composables 仅在生命周期内并在任何异步操作之前的同一 tick 中可用：

```ts
// --- Vue internal ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt sets a global variable referencing to current component in _vueInstance when calling setup()
async function setup () {
  getCurrentInstance() // Works
  await someAsyncOperation() // Vue unsets the context in same tick before async operation!
  getCurrentInstance() // null
}
```

经典的解决方案是在第一次调用时将当前实例缓存到本地变量，例如 `const instance = getCurrentInstance()`，并在下一个 composable 调用中使用它，但问题是任何嵌套的 composable 调用现在都需要显式地接受该实例作为参数，而不能依赖 composition-api 的隐式上下文。这是 composable 的设计限制，而非逻辑错误。

为克服此限制，Vue 在编译我们的应用代码时会在幕后做一些工作，并在每次调用后恢复上下文，以支持 `<script setup>`：

```ts
const __instance = getCurrentInstance() // Generated by Vue compiler
getCurrentInstance() // Works!
await someAsyncOperation() // Vue unsets the context
__restoreInstance(__instance) // Generated by Vue compiler
getCurrentInstance() // Still works!
```

关于 Vue 实际所做工作的更详细描述，请参阅 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这就是 `runWithContext` 可用于恢复上下文的地方，类似于 `<script setup>` 的工作方式。

Nuxt 在内部使用 [unjs/unctx](https://github.com/unjs/unctx) 来为插件和中间件支持与 Vue 类似的 composable。这使得像 `navigateTo()` 这样的 composable 无需直接传递 `nuxtApp` 也能工作 —— 为整个 Nuxt 框架带来了 Composition API 的开发体验和性能优势。

Nuxt composable 的设计与 Vue Composition API 相同，因此需要类似的解决方案来自动完成此转换。参见 [unjs/unctx#2](https://github.com/unjs/unctx/issues/2)（提案）、[unjs/unctx#4](https://github.com/unjs/unctx/pull/4)（transform 实现）以及 [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884)（集成到 Nuxt）。

目前 Vue 仅对 `<script setup>` 在异步/等待用法上支持异步上下文恢复。在 Nuxt 中，对 `defineNuxtPlugin()` 和 `defineNuxtRouteMiddleware()` 的 transform 支持已被添加，这意味着当你使用它们时，Nuxt 会自动对它们进行带上下文恢复的转换。

#### 遗留问题

`unjs/unctx` 的转换在包含 `await` 的 `try/catch` 语句中似乎存在一些 bug，最终需要解决这些问题以移除上述变通方法的必要性。

#### 原生异步上下文

使用一个新的实验性功能，可以通过 [Node.js 的 `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) 和新的 unctx 支持启用原生异步上下文支持，从而让异步上下文以“原生”方式对任何嵌套的异步 composable 可用，而无需转换或手动传递/使用带上下文的调用。

::tip
原生异步上下文支持目前在 Bun 和 Node 上可用。
::

:read-more{to="/docs/4.x/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

此函数的行为与 `useNuxtApp` 完全相同，但如果上下文不可用则返回 `null`，而不是抛出异常。

你可以在不需要 `nuxtApp` 的 composable 中使用它，或在不抛出异常的情况下仅检查上下文是否可用。

示例用法：

```ts [composable.ts]
export function useStandType () {
  // Always works on the client
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: an optional application name. If you do not provide it, the Nuxt `buildId` option is used. Otherwise, it must match with an existing `buildId`. -->