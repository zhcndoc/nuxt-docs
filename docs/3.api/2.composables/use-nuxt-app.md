---
title: 'useNuxtApp'
description: '访问 Nuxt 应用的共享运行时上下文。'
links:
  - label: 代码源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`useNuxtApp` 是一个内置的组合式函数，用于访问 Nuxt 的共享运行时上下文，也称为 [Nuxt 上下文](/docs/guide/going-further/nuxt-app#the-nuxt-context)，该上下文在客户端和服务器端都可用（但不包括 Nitro 路由中）。它帮助你访问 Vue 应用实例、运行时钩子、运行时配置变量以及内部状态，比如 `ssrContext` 和 `payload`。

```vue [app.vue]
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
```

如果当前作用域中无法获取运行时上下文，调用 `useNuxtApp` 会抛出异常。你可以改用 [`tryUseNuxtApp`](#tryusenuxtapp)，适用于不需要 `nuxtApp` 的组合式函数，或仅检查上下文是否可用而不抛出异常。

<!--
note
默认情况下，Nuxt 的共享运行时上下文会以 [`buildId`](/docs/api/nuxt-config#buildid) 选项作为命名空间。这支持多运行时上下文。

## 参数

- `appName`：可选的应用名。如果未提供，则使用 Nuxt 的 `buildId` 选项。否则必须与已有的 `buildId` 匹配。 -->

## 方法

### `provide (name, value)`

`nuxtApp` 是一个运行时上下文，你可以通过 [Nuxt 插件](/docs/guide/directory-structure/plugins) 扩展它。使用 `provide` 函数可以创建 Nuxt 插件，使得某些值和辅助方法在你的 Nuxt 应用的所有组合式函数和组件中可用。

`provide` 函数接收两个参数：`name` 和 `value`。

```js
const nuxtApp = useNuxtApp()
nuxtApp.provide('hello', (name) => `Hello ${name}!`)

// 打印 "Hello name!"
console.log(nuxtApp.$hello('name'))
```

如上例所示，`$hello` 成为了 `nuxtApp` 上新的自定义部分，并且在所有能访问到 `nuxtApp` 的地方可用。

### `hook(name, cb)`

`nuxtApp` 中可用的钩子支持你自定义 Nuxt 应用的运行时行为。你可以在 Vue.js 组合式函数和 [Nuxt 插件](/docs/guide/directory-structure/plugins) 中使用运行时钩子，挂载在渲染生命周期的特定阶段。

`hook` 函数用于通过挂钩渲染生命周期中的某一点来添加自定义逻辑。它主要用于创建 Nuxt 插件时。

请参阅 [运行时钩子](/docs/api/advanced/hooks#app-hooks-runtime) 了解 Nuxt 调用的可用运行时钩子。

```ts [plugins/test.ts]
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:start', () => {
    /* 在这里编写你的代码 */
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

调用已存在的钩子，`callHook` 会返回一个 Promise。

```ts
await nuxtApp.callHook('my-plugin:init')
```

## 属性

`useNuxtApp()` 会暴露下述属性，供你拓展、定制应用以及共享状态、数据和变量。

### `vueApp`

`vueApp` 是全局的 Vue.js [应用实例](https://vue.zhcndoc.com/api/application.html#application-api)，你可以通过 `nuxtApp` 访问它。

一些有用的方法：
- [`component()`](https://vue.zhcndoc.com/api/application.html#app-component) — 如果传入组件名和定义，则注册全局组件；如果只传入组件名，则获取已注册的组件。
- [`directive()`](https://vue.zhcndoc.com/api/application.html#app-directive) — 如果传入指令名和定义，则注册全局自定义指令；如果只传入指令名，则获取已注册的指令[(示例)](/docs/guide/directory-structure/plugins#vue-directives)。
- [`use()`](https://vue.zhcndoc.com/api/application.html#app-use) — 安装 **[Vue.js 插件](https://vue.zhcndoc.com/guide/reusability/plugins.html)** [(示例)](/docs/guide/directory-structure/plugins#vue-plugins)。

:read-more{icon="i-simple-icons-vuedotjs" to="https://vue.zhcndoc.com/api/application.html#application-api"}

### `ssrContext`

`ssrContext` 在服务端渲染过程中生成，仅在服务端可用。

Nuxt 通过 `ssrContext` 暴露如下属性：
- `url`（字符串）— 当前请求的 URL。
- `event`（[unjs/h3](https://github.com/unjs/h3) 请求事件）— 访问当前路由的请求与响应。
- `payload`（对象）— NuxtApp 的负载对象。

### `payload`

`payload` 将服务端的数据和状态变量暴露给客户端。下列键将在客户端可用，前提是它们已从服务端传递过来：

- `serverRendered`（布尔值）— 指示响应是否为服务端渲染。
- `data`（对象）— 当你使用 [`useFetch`](/docs/api/composables/use-fetch) 或 [`useAsyncData`](/docs/api/composables/use-async-data) 从 API 端点获取数据时，结果负载可通过 `payload.data` 访问。该数据被缓存，有助于避免重复请求相同数据。

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

  上例中，使用 [`useAsyncData`](/docs/api/composables/use-async-data) 获取的 `count` 值，会在 `payload.data` 中以 `{ count: 1 }` 形式保存。

  通过 [`ssrContext`](#ssrcontext) 访问同样的 `payload.data`，可在服务端读取相同的值。

- `state`（对象）— 当你在 Nuxt 中使用 [`useState`](/docs/api/composables/use-state) 组合式函数设置共享状态时，该状态数据通过 `payload.state.[你的状态名]` 访问。

  ```ts [plugins/my-plugin.ts]
  export const useColor = () => useState<string>('color', () => 'pink')

  export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
      const color = useColor()
    }
  })
  ```

  也可以使用更高级的类型，比如 `ref`、`reactive`、`shallowRef`、`shallowReactive` 和 `NuxtError`。

  从 [Nuxt v3.4](https://nuxt.com/blog/v3-4#payload-enhancements) 开始，可以为 Nuxt 不支持的类型自定义 reducer/reviver。

  :video-accordion{title="观看 Alexander Lichter 关于序列化负载的讲解视频，特别是关于类的处理" videoId="8w6ffRBs8a4"}

  下例中，定义了一个用于 [Luxon](https://moment.github.io/luxon/#/) DateTime 类的 reducer（序列化器）和 reviver（反序列化器），通过负载插件实现。

  ```ts [plugins/date-time-payload.ts]
  /**
   * 这种插件会非常早地在 Nuxt 生命周期运行，在负载复原之前。
   * 你将无法访问路由器或其他 Nuxt 注入的属性。
   *
   * 注意 "DateTime" 是类型标识符，在 reducer 和 reviver 中必须相同。
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

使用 `nuxtApp.isHydrating`（布尔值）判断 Nuxt 应用是否在客户端进行激活（hydrate）。

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
你可能是因为看到 “Nuxt 实例不可用” 的提示来到这里。请谨慎使用此方法，并反馈会导致问题的示例，以便在框架层面最终解决。
::

`runWithContext` 方法用于以显式的 Nuxt 上下文调用函数。通常，Nuxt 上下文是隐式传递的，无需你操心。然而，在中间件/插件中使用复杂的 `async`/`await` 场景时，可能会遇到异步调用后当前实例被取消的问题。

```ts [middleware/auth.ts]
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  let user
  try {
    user = await fetchUser()
    // 因 try/catch，Vue/Nuxt 编译器在此处丢失上下文。
  } catch (e) {
    user = null
  }
  if (!user) {
    // 为 `navigateTo` 应用正确的 Nuxt 上下文。
    return nuxtApp.runWithContext(() => navigateTo('/auth'))
  }
})
```

#### 用法

```js
const result = nuxtApp.runWithContext(() => functionWithContext())
```

- `functionWithContext`：任何需要当前 Nuxt 应用上下文的函数。该上下文将自动正确应用。

`runWithContext` 会返回 `functionWithContext` 的返回值。

#### 深入解析上下文

Vue.js 的 Composition API（以及 Nuxt 的组合式函数）依赖于隐式上下文。在生命周期中，Vue 会将当前组件的临时实例（以及 Nuxt 的 `nuxtApp` 临时实例）设置为全局变量，并在同一个事件循环中取消设置它。当服务端渲染时，存在多个不同用户的请求，所有 `nuxtApp` 共享同一全局上下文。为此，Nuxt 和 Vue 立即取消这个全局实例，以避免不同用户或组件间共享引用。

这意味着 Composition API 和 Nuxt 组合式函数仅在生命周期内且在异步操作之前的同一个事件循环中可用：

```js
// --- Vue 内部 ---
const _vueInstance = null
const getCurrentInstance = () => _vueInstance
// ---

// Vue / Nuxt 在调用 setup() 时设置全局变量引用当前组件
async function setup() {
  getCurrentInstance() // 有效
  await someAsyncOperation() // Vue 在异步之前同一个 tick 清空上下文
  getCurrentInstance() // null
}
```

传统的解决方案是首次调用时缓存实例变量 `const instance = getCurrentInstance()`，在之后的组合式函数调用时传入该实例，但缺点是嵌套调用需要显式传参，无法依赖 Composition API 的隐式上下文。这是组合式函数的设计限制，而不是一个问题。

为克服此限制，Vue 在编译应用代码时进行了幕后处理，在每次异步调用后恢复上下文（针对 `<script setup>`）：

```js
const __instance = getCurrentInstance() // Vue 编译器生成
getCurrentInstance() // 有效
await someAsyncOperation() // Vue 清空上下文
__restoreInstance(__instance) // Vue 编译器生成，恢复上下文
getCurrentInstance() // 仍然有效
```

更多详情请参见 [unjs/unctx#2 (comment)](https://github.com/unjs/unctx/issues/2#issuecomment-942193723)。

#### 解决方案

这正是 `runWithContext` 可用来恢复上下文的场景，类似于 `<script setup>` 的上下文恢复。

Nuxt 内部使用了 [unjs/unctx](https://github.com/unjs/unctx) 来支持与 Vue 类似的组合式函数插件和中间件。这让像 `navigateTo()` 这样的组合式函数可以无需显式传入 `nuxtApp`，提升了开发体验和性能。

Nuxt 组合式函数的设计与 Vue Composition API 一致，所以需要类似的上下文恢复方案。详见：[unjs/unctx#2](https://github.com/unjs/unctx/issues/2)（提案），[unjs/unctx#4](https://github.com/unjs/unctx/pull/4)（转换实现），以及 [nuxt/framework#3884](https://github.com/nuxt/framework/pull/3884)（集成到 Nuxt）。

Vue 目前仅支持 `<script setup>` 中使用 async/await 时的异步上下文恢复。Nuxt 为 `defineNuxtPlugin()` 和 `defineNuxtRouteMiddleware()` 添加了转换支持，因此使用这两者时 Nuxt 会自动转换以恢复上下文。

#### 遗留问题

`unjs/unctx` 的转换在包含 `await` 的 `try/catch` 语句中表现不稳定，需要解决此问题以移除上述变通方案的必要性。

#### 原生异步上下文

使用新的实验性特性，可以启用基于 [Node.js 的 `AsyncLocalStorage`](https://node.zhcndoc.com/api/async_context.html#class-asynclocalstorage) 和 unctx 新支持的原生异步上下文，使得异步上下文**原生**对**任意嵌套异步组合式函数**有效，无需转换或手动传递/调用上下文。

::tip
原生异步上下文支持目前在 Bun 和 Node 环境可用。
::

:read-more{to="/docs/guide/going-further/experimental-features#asynccontext"}

## tryUseNuxtApp

此函数与 `useNuxtApp` 功能相同，但在上下文不可用时返回 `null`，而不是抛出异常。

适用于不依赖 `nuxtApp` 的组合式函数，或仅用来检查上下文是否可用而不抛异常。

示例用法：

```ts [composable.ts]
export function useStandType() {
  // 在客户端总是有效
  if (tryUseNuxtApp()) {
    return useRuntimeConfig().public.STAND_TYPE
  } else {
    return process.env.STAND_TYPE
  }
}
```

<!-- ### 参数

- `appName`：可选应用名称。如果未提供，默认使用 Nuxt 的 `buildId` 选项。否则必须与已有 `buildId` 匹配。 -->
