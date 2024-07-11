---
title: 'useNuxtApp'
description: '访问 Nuxt 应用程序的共享运行时上下文。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` 是一个内置的组合式函数，提供了一种访问 Nuxt 的共享运行时上下文的方式，也被称为 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)，它在客户端和服务器端都可用（但在 Nitro 路由内不可用）。它可以帮助您访问 Vue 应用程序实例、运行时钩子、运行时配置变量和内部状态，比如 `ssrContext` 和 `payload`。

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

如果你的作用域中运行时上下文不可用，`useNuxtApp` 在被调用时将抛出一个异常。你可以使用 [`tryUseNuxtApp`](#tryusenuxtapp) 来代替不需要 `nuxtApp` 的组合函数，或者简单地检查上下文是否可用而不会抛出异常。

<!--
note
默认情况下，Nuxt的共享运行时上下文被`buildId`选项所命名空间化。它支持多个运行时上下文的支持。

## Params

- `appName`: 一个可选的应用程序名称。如果你不提供它，Nuxt的`buildId`选项将被使用。否则，它必须与一个已存在的`buildId`匹配。 -->

## 方法

### `provide (name, value)`

`nuxtApp` 是一个运行时上下文，你可以使用 [Nuxt 插件](/docs/guide/directory-structure/plugins) 来扩展它。使用 `provide` 函数来创建 Nuxt 插件，使值和辅助方法在你的 Nuxt 应用中所有组合函数和组件中可用。

`provide` 函数接受 `name` 和 `value` 参数。

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// 打印 "Hello name!"
console.log(nuxtApp.$hello('name'))
```

如上例所示，`$hello` 已经成为 `nuxtApp` 上下文的新和自定义部分，它在你可以访问 `nuxtApp` 的所有地方可用。

### `hook(name, cb)`

`nuxtApp` 中的运行时钩子允许你自定义 Nuxt 应用的运行时方面。你可以在组合函数和 [Nuxt 插件](/docs/guide/directory-structure/plugins) 中使用运行时钩子来挂钩到渲染生命周期。

`hook` 函数用于通过挂钩到渲染生命周期的特定点来添加自定义逻辑。`hook` 函数在创建 Nuxt 插件时被广泛使用。

查看[运行时钩子](/docs/api/advanced/hooks#app-hooks-runtime)来了解 Nuxt 调用的一些可用运行时钩子。

```ts [plugins/test.ts]
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

`callHook` 在被任何已存在的钩子调用时返回一个承诺。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()` 暴露了以下属性，你可以使用它们来扩展和定制你的应用，并共享状态、数据和变量。

### `vueApp`

`vueApp` 是全局的 Vue.js [应用程序实例](https://vuejs.org/api/application.html#application-api)，你可以在 `nuxtApp` 中访问它。

一些有用的方法：
- [`component()`](https://vuejs.org/api/application.html#app-component) - 注册一个全局组件，如果传递了名称字符串和组件定义，或者如果只传递了名称，则检索一个已经注册的组件。
- [`directive()`](https://vuejs.org/api/application.html#app-directive) - 注册一个全局自定义指令，如果传递了名称字符串和指令定义，或者如果只传递了名称，则检索一个已经注册的指令 [(示例)](/docs/guide/directory-structure/plugins#vue-directives)。
- [`use()`](https://vuejs.org/api/application.html#app-use) - 安装一个 **[Vue.js 插件](https://vuejs.org/guide/reusability/plugins.html)** [(示例)](/docs/guide/directory-structure/plugins#vue-plugins)。

:read-more{icon="i-simple-icons-vuedotjs" to="https://vuejs.org/api/application.html#application-api"}

### `ssrContext`

`ssrContext` 在服务器端渲染期间生成，仅在服务器端可用。

Nuxt 通过 `ssrContext` 暴露了以下属性：
- `url` (string) - 当前请求的 url。
- `event` ([unjs/h3](https://github.com/unjs/h3) 请求事件) - 访问当前路由的请求和响应。
- `payload` (object) - NuxtApp 的有效载荷对象。

### `payload`

`payload` 暴露了从服务器端到客户端共享的数据和状态变量。在客户端访问 `payload` 后，以下键将可用：

- `serverRendered` (boolean) - 指示响应是否经过服务器端渲染。
- `data` (object) - 当你使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) 从一个 API 端点获取数据时，生成的有效载荷可以从 `payload.data` 中访问。这个数据被缓存，有助于防止在请求相同数据时多次发送相同的请求。

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

  在上面的示例中，我们使用 `useAsyncData` 从 `count` 获取 `count` 值，如果你访问 `payload.data`，你将看到 `{ count: 1 }` 记录在那里。

  从 `ssrcontext` 访问相同的 `payload.data` 时，你可以在服务器端访问相同的值。

- `state` (object) - 当你在 Nuxt 中使用 [`useState`](/docs/api/composables/use-state) 组合函数来设置共享状态时，这个状态数据可以通过 `payload.state.[name-of-your-state]` 访问。

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  也可以使用更高级的类型，如 `ref`、`reactive`、`shallowRef`、`shallowReactive` 和 `NuxtError`。

  自 [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) 以来，你可以通过使用一个有效载荷插件来定义你自己的减少器/重新生成器，来为不支持的类型定义自己的减少器/重新生成器。

  ::tip{icon="i-ph-video-duotone" to="https://www.youtube.com/watch?v=8w6ffRBs8a4" target="_blank"}
  观看 Alexander Lichter 关于序列化有效载荷的视频，尤其是关于类的情况。
  ::

  在下面的例子中，我们定义了一个减少器（或序列化器）和一个重新生成器（或反序列化器），用于 Luxon 的 DateTime 类，使用一个有效载荷插件。

  ```ts [plugins/date-time-payload.ts]
  /**
   * 这种类型的插件在 Nuxt 的生命周期早期运行，在我们恢复有效载荷之前。
   * 您不会有访问路由或其他 Nuxt 注入属性的权限。
   *
   * 注意，"DateTime" 字符串是类型标识符，必须
   * 与 reducer 和 reviver 中使用的相同。
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

使用 `nuxtApp.isHydrating`（boolean）检查 Nuxt 应用是否在客户端上进行水合作用。

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
你很可能因为收到了一个"Nuxt实例不可用"的消息而在这里。请尽量少使用这个方法，并在遇到问题时报告例子，以便最终在框架级别解决。
::

`runWithContext` 方法用于调用一个函数，并为它提供一个明确的 Nuxt 上下文。通常，Nuxt 上下文是隐式传递的，你不需要担心这个问题。然而，当与复杂的 `async`/`await` 场景在中间件/插件中工作时，你可能会遇到在异步调用之后上下文丢失的问题。

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // 由于 try/catch 块，Vue/Nuxt 编译器在这里丢失了上下文。
  } catch (e) {
    user = null
  }
  if (!user) {
    // 应用正确的 Nuxt 上下文到我们的 `navigateTo` 调用。
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 使用

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`: 任何需要当前 Nuxt 上下文函数的函数。这个上下文将被自动正确地应用。

`runWithContext` 会返回 `functionWithContext` 返回的任何内容。

#### 对上下文的更深层次解释

Vue.js 组合 API（以及 Nuxt 组合函数类似）工作依赖于一个隐式上下文。在生命周期中，Vue 设置当前组件（和 Nuxt 设置 nuxtApp 临时实例）的临时实例到全局变量，并在异步操作之前立即清除它。当在服务器端渲染时，有来自不同用户的多个请求和 nuxtApp 在同一个全局上下文中运行。由于这个原因，Nuxt 和 Vue 在异步操作之前立即清除这个全局实例，以避免在两次不同的用户或组件之间泄露共享引用。

这意味着什么？组合 API 和 Nuxt 组合函数在使用隐式上下文时，只在工作生命周期和在同 tick 之前，任何异步操作之前可用：

```js
// --- Vue 内部 ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt 在 _vueInstance 上设置一个全局变量，它在调用 setup() 时引用当前组件
async function setup() {
  getCurrentInstance() // 工作
  await someAsyncOperation() // Vue 在同 tick 之前清除上下文！
  getCurrentInstance() // null
}
```

解决这个问题经典的方法是，在调用组合函数时将当前实例缓存到一个局部变量中，比如 `const instance = getCurrentInstance()`，并确保在下一个组合函数调用中不依赖于组合 API 的隐式上下文。这是组合函数的设计局限，而不是一个问题。

为了克服这个局限性，Vue 在编译我们的应用程序代码时做了些幕后工作，在恢复有效载荷前恢复了上下文。

```js
const __instance = getCurrentInstance() // 由 Vue 编译器生成
getCurrentInstance() // 工作！
await someAsyncOperation() // Vue 取消了上下文
__restoreInstance(__instance) // 由 Vue 编译器生成
getCurrentInstance() // 仍然工作！
```

对于更好的解释 Vue 实际上做了什么，请查看 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这是 `runWithContext` 可以用来恢复上下文的地方，类似于 `<script setup>` 的工作方式。

Nuxt 内部使用 [unjs/unctx](https://github.com/unjs/unctx) 来支持类似于 Vue 用于插件和中间件的组合式。这使得像 `navigateTo()` 这样的组合式能够在不直接传递 `nuxtApp` 给它们的情况下工作 - 将 Composition API 的 DX 和性能优势带给整个 Nuxt 框架。

Nuxt 组合函数与 Vue 组合 API 的设计相同，因此需要类似的解决方案来神奇地进行这种转换。查看 [unjs/unctx#2](https://github.com/unjs/unctx/issues/2)（提案），[unjs/unctx#4](https://github.com/unjs/unctx/pull/4)（转换实现），以及 [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884)（集成到 Nuxt）。

Vue 目前只支持 `<script setup>` 中的异步上下文恢复对于 async/await 使用。在 Nuxt 3 中，对 `defineNuxtPlugin()` 和 `defineNuxtRouteMiddleware()` 的转换支持被添加，这意味着当你使用它们时，Nuxt 会自动用上下文恢复来转换它们。

#### 遗留问题

`unjs/unctx` 转换在 `try/catch` 块中自动恢复上下文似乎在包含 `await` 的代码块中存在问题，最终需要在这个框架级别解决，以移除对上面建议的绕道的需要。

#### 本机异步上下文

使用一个新的实验性特性，你可以启用本地的异步上下文支持，使用 [Node.js `AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) 和新的 unctx 支持，使任何嵌套的异步组合函数都能在没有转换或手动传递/调用的情况下，访问到上下文。

::tip
本机异步上下文支持目前只在 Bun 和 Node 上可用。
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

这个函数与 `useNuxtApp` 的功能完全相同，但它在上下文不可用时返回 `null`，而不是抛出一个异常。

你可以用它来代替不需要 `nuxtApp` 的组合函数，或者简单地检查上下文是否可用而不抛出异常。

示例使用：

```ts [composable.ts]
export function useStandType() {
  // 客户端始终工作
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### Params

- `appName`: 一个可选的应用程序名称。如果你不提供它，Nuxt的`buildId`选项将被使用。否则，它必须与一个已存在的`buildId`匹配。 -->
