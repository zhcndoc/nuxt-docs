---
title: 'useNuxtApp'
description: '访问 Nuxt 应用程序的共享运行时上下文。'
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` 是一个内置的组合式函数，用于访问 Nuxt 的共享运行时上下文，也称为 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)，该上下文在客户端和服务器端均可用（但不包括 Nitro 路由）。它帮助你访问 Vue 应用程序实例、运行时钩子、运行时配置变量和内部状态，比如 `ssrContext` 和 `payload`。

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

如果在你的作用域中运行时上下文不可用，调用 `useNuxtApp` 将抛出异常。你可以使用 [`tryUseNuxtApp`](#tryusenuxtapp) 代替，它适用于不需要 `nuxtApp` 的组合式函数，或者简单地检查上下文是否可用，而不引发异常。

<!--
note
默认情况下，Nuxt 的共享运行时上下文在 [`buildId`](/docs/api/nuxt-config#buildid) 选项下命名空间。它支持多个运行时上下文。

## 参数

- `appName`: 可选的应用程序名称。如果未提供，使用 Nuxt `buildId` 选项。否则，它必须与现有的 `buildId` 匹配。 -->

## 方法

### `provide (name, value)`

`nuxtApp` 是一个可以通过 [Nuxt 插件](/docs/guide/directory-structure/plugins) 扩展的运行时上下文。使用 `provide` 函数创建 Nuxt 插件，以使值和辅助方法在你的 Nuxt 应用程序中的所有组合式函数和组件中可用。

`provide` 函数接受 `name` 和 `value` 参数。

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// 打印 "Hello name!"
console.log(nuxtApp.$hello('name'))
```

正如你在上面的例子中所看到的，`$hello` 成为 `nuxtApp` 上下文的新自定义部分，并在所有可以访问 `nuxtApp` 的地方可用。

### `hook(name, cb)`

`nuxtApp` 中的钩子允许你自定义 Nuxt 应用程序的运行时方面。你可以在 Vue.js 组合式函数和 [Nuxt 插件](/docs/guide/directory-structure/plugins) 中使用运行时钩子来钩入渲染生命周期。

`hook` 函数对于在特定时间钩入渲染生命周期并添加自定义逻辑很有用。`hook` 函数通常在创建 Nuxt 插件时使用。

有关 Nuxt 调用的可用运行时钩子，请参见 [运行时钩子](/docs/api/advanced/hooks#app-hooks-runtime)。

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* 你的代码在这里 */
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

当使用任何现有钩子调用时，`callHook` 返回一个 Promise。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()` 暴露了以下属性，供你用于扩展和自定义应用程序，并共享状态、数据和变量。

### `vueApp`

`vueApp` 是全局 Vue.js [应用程序实例](https://vuejs.org/api/application.html#application-api)，你可以通过 `nuxtApp` 访问。

一些有用的方法：
- [`component()`](https://vuejs.org/api/application.html#app-component) - 如果同时传递名称字符串和组件定义，则注册全局组件；如果仅传递名称，则检索已注册的组件。
- [`directive()`](https://vuejs.org/api/application.html#app-directive) - 如果同时传递名称字符串和指令定义，则注册全局自定义指令；如果仅传递名称，则检索已注册的指令[(示例)](/docs/guide/directory-structure/plugins#vue-directives)。
- [`use()`](https://vuejs.org/api/application.html#app-use) - 安装一个 **[Vue.js 插件](https://vuejs.org/guide/reusability/plugins.html)** [(示例)](/docs/guide/directory-structure/plugins#vue-plugins)。

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` 在服务器端渲染期间生成，并且只在服务器端可用。

Nuxt 通过 `ssrContext` 暴露以下属性：
- `url` (string) - 当前请求的 URL。
- `event` ([unjs/h3](https://github.com/unjs/h3) 请求事件) - 访问当前路由的请求和响应。
- `payload` (object) - NuxtApp payload 对象。

### `payload`

`payload` 将服务器端的数据和状态变量暴露给客户端。以下键将在从服务器传递到客户端后可用：

- `serverRendered` (boolean) - 指示响应是否为服务器端渲染。
- `data` (object) - 当你使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) 从 API 端点获取数据时，结果有效负载可以通过 `payload.data` 访问。此数据会被缓存，帮助你避免在相同请求被多次发出时重复获取相同数据。

  ::code-group
  ```vue [app.vue]
  <script setup lang="ts">
  const { data } = await useAsyncData('count', () => $fetch('/api/count'))
  </script>
  ```
  ```ts [server/api/count.ts]
  export default defineEventHandler(event => {
    return { count: 1 }
  })
  ```
  ::

  使用 [`useAsyncData`](/docs/api/composables/use-async-data) 在上面的示例中获取 `count` 的值后，访问 `payload.data` 将看到记录的 `{ count: 1 }`。

  从 [`ssrcontext`](#ssrcontext) 访问相同的 `payload.data` 时，也能在服务器端访问到相同的值。

- `state` (object) - 当你在 Nuxt 中使用 [`useState`](/docs/api/composables/use-state) 组合式函数设置共享状态时，可以通过 `payload.state.[name-of-your-state]` 访问此状态数据。

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  同样可以使用更高级的类型，例如 `ref`、`reactive`、`shallowRef`、`shallowReactive` 和 `NuxtError`。

  从 [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) 开始，可以为 Nuxt 不支持的类型定义自己的 reducer/reviver。

  ::tip{icon="i-lucide-video" to="https://www.youtube.com/watch?v=8w6ffRBs8a4" target="_blank"}
  观看 Alexander Lichter 的视频，了解全球对序列化有效负载的关注，尤其是与类相关的部分。
  ::

  在下面的示例中，我们使用有效负载插件定义了一个 reducer（或序列化器）和一个 reviver（或反序列化器）用于 [Luxon](https://moment.github.io/luxon/#/) 的 DateTime 类。

  ```ts [plugins/date-time-payload.ts]
  /**
   * 这种类型的插件在 Nuxt 生命周期早期运行，在我们恢复有效负载之前。
   * 你将无法访问路由器或其他 Nuxt 注入的属性。
   *
   * 请注意 "DateTime" 字符串是类型标识符，在 reducer 和 reviver 中必须相同。
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

使用 `nuxtApp.isHydrating` (boolean) 检查 Nuxt 应用程序是否在客户端上进行水合。

```ts [components/nuxt-error-boundary.ts]
export default defineComponent({
  setup (_props, { slots, emit }) {
    const nuxtApp = useNuxtApp()
    onErrorCaptured((err) => {
      if (import.meta.client && !nuxtApp.isHydrating) {
        // ...
      }
    })
  }
})
```

### `runWithContext`

::note
您可能在这里是因为收到 "Nuxt 实例不可用" 的消息。请谨慎使用此方法，并报告导致问题的示例，以便最终在框架级别解决。
::

`runWithContext` 方法旨在调用函数并提供明确的 Nuxt 上下文。通常，Nuxt 上下文是隐式传递的，您无需担心这一点。然而，在中间件/插件中处理复杂的 `async`/`await` 情况时，您可能会遇到当前实例在异步调用后被取消设置的情况。

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // Vue/Nuxt 编译器在此处因 try/catch 块而丢失上下文。
  } catch (e) {
    user = null
  }
  if (!user) {
    // 将正确的 Nuxt 上下文应用于我们的 `navigateTo` 调用。
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 用法

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 任何需要当前 Nuxt 应用程序上下文的函数。 此上下文将被正确地自动应用。

`runWithContext` 将返回 `functionWithContext` 返回的任何内容。

#### 上下文的深入解释

Vue.js 组合式 API（与 Nuxt 组合式函数类似）依赖于隐式上下文。在生命周期中，Vue 将当前组件的临时实例（以及 Nuxt 的临时 `nuxtApp` 实例）设置为全局变量，并在同一 tick 中取消设置。 在服务器端渲染时，来自不同用户的多个请求和在相同全局上下文中运行的 nuxtApp。因此，Nuxt 和 Vue 会立即取消设置此全局实例，以避免在两个用户或组件之间泄漏共享引用。

这是什么意思？组合式 API 和 Nuxt 组合式函数仅在生命周期内和在任何异步操作之前的同一 tick 中可用：

```js
// --- Vue 内部 ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt 在调用 setup() 时将一个全局变量引用到当前组件。
async function setup() {
  getCurrentInstance() // 工作正常
  await someAsyncOperation() // Vue 在异步操作之前的同一 tick 中取消设置上下文！
  getCurrentInstance() // null
}
```

经典的解决方案是在第一次调用时将当前实例缓存到局部变量，如 `const instance = getCurrentInstance()`，并在下一个组合式函数调用中使用它，但问题是任何嵌套组合式函数调用现在需要显式接受该实例作为参数，而不依赖于组合式 API 的隐式上下文。这是组合式函数的设计限制，而不是问题。

为了克服这个限制，当编译我们的应用程序代码时，Vue 在幕后做了一些工作，并在每次调用 `<script setup>` 后恢复上下文：

```js
const __instance = getCurrentInstance() // 由 Vue 编译器生成
getCurrentInstance() // 工作正常！
await someAsyncOperation() // Vue 取消设置上下文
__restoreInstance(__instance) // 由 Vue 编译器生成
getCurrentInstance() // 仍然工作正常！
```

有关 Vue 实际执行的内容的更好描述，请参见 [unjs/unctx#2 (评论)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这就是可以使用 `runWithContext` 来恢复上下文的地方，其方式类似于 `<script setup>` 的工作原理。

Nuxt 在内部使用 [unjs/unctx](https://github.com/unjs/unctx) 来支持插件和中间件的组合式函数，类似于 Vue。这使得像 `navigateTo()` 这样的组合式函数可以在不直接传递 `nuxtApp` 的情况下正常工作 - 将组合式 API 的开发体验和性能优势带到整个 Nuxt 框架。

Nuxt 组合式函数的设计与 Vue 组合式 API 相同，因此需要类似的解决方案来魔法般地进行此转换。查看 [unjs/unctx#2](https://github.com/unjs/unctx/issues/2)（提案）、[unjs/unctx#4](https://github.com/unjs/unctx/pull/4)（转换实现）和 [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884)（与 Nuxt 集成）。

Vue 目前仅支持针对 `<script setup>` 的异步上下文恢复，以用于 async/await 的使用。在 Nuxt 3 中，添加了 `defineNuxtPlugin()` 和 `defineNuxtRouteMiddleware()` 的转换支持，这意味着当你使用它们时，Nuxt 会自动执行上下文恢复的转换。

#### 剩余问题

`unjs/unctx` 转换以自动恢复上下文似乎在包含 `await` 的 `try/catch` 语句中存在错误，最终需要解决这一问题，以消除上述建议的解决方法的需求。

#### 原生异步上下文

使用一项新的实验性功能，可以启用使用 [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) 的原生异步上下文支持，并结合新的 unctx 支持，使得异步上下文可以 **原生** 方式提供给 **任何嵌套的异步组合式函数**，无需转换或手动传递/调用上下文。

::tip
当前原生异步上下文支持在 Bun 和 Node 中工作。
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

该函数的工作方式与 `useNuxtApp` 完全相同，但如果上下文不可用，则返回 `null`，而不是抛出异常。

你可以将其用于不需要 `nuxtApp` 的组合式函数，或简单地检查上下文是否可用，而不引发异常。

示例用法：

```ts [composable.ts]
export function useStandType() {
  // 在客户端始终有效
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### 参数

- `appName`: 可选的应用程序名称。如果未提供，则使用 Nuxt `buildId` 选项。否则，它必须与现有的 `buildId` 匹配。 -->