---
title: "defineNuxtPlugin"
description: defineNuxtPlugin() 是用于创建 Nuxt 插件的辅助函数。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` 是用于创建 Nuxt 插件的辅助函数，具有增强的功能和类型安全性。该工具将不同的插件格式规范化为与 Nuxt 插件系统无缝协作的一致结构。

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
})
```

:read-more{to="/docs/4.x/directory-structure/app/plugins#creating-plugins"}

## 类型

```ts [Signature]
export function defineNuxtPlugin<T extends Record<string, unknown>> (plugin: Plugin<T> | ObjectPlugin<T>): Plugin<T> & ObjectPlugin<T>

type Plugin<T> = (nuxt: NuxtApp) => Promise<void> | Promise<{ provide?: T }> | void | { provide?: T }

interface ObjectPlugin<T> {
  name?: string
  enforce?: 'pre' | 'default' | 'post'
  dependsOn?: string[]
  order?: number
  parallel?: boolean
  setup?: Plugin<T>
  hooks?: Partial<RuntimeNuxtHooks>
  env?: {
    islands?: boolean
  }
}
```

## 参数

**插件**：插件可以通过两种方式定义：
1. **函数插件**：一个接收 [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 实例的函数，并且可以返回一个包含 [`provide`](/docs/4.x/directory-structure/app/plugins#providing-helpers) 属性的对象的 Promise，如果你希望在 [`NuxtApp`](/docs/4.x/guide/going-further/internals#the-nuxtapp-interface) 实例上提供一个辅助工具。
2. **对象插件**：一个可以包含多个属性以配置插件行为的对象，例如 `name`、`enforce`、`dependsOn`、`order`、`parallel`、`setup`、`hooks` 和 `env`。

| Property           | Type                                                                 | Required | Description                                                                                                     |
| ------------------ | -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `name` | `string` | `false` | 插件的可选名称，便于调试和依赖管理。 |
| `enforce` | `'pre'` \| `'default'` \| `'post'` | `false` | 控制插件相对于其他插件的运行时机。 |
| `dependsOn` | `string[]` | `false` | 该插件依赖的插件名称数组。确保正确的执行顺序。 |
| `order` | `number` | `false` | 允许对插件顺序进行更细粒度的控制，应仅由高级用户使用。**它会覆盖 `enforce` 的值并用于对插件进行排序。** |
| `parallel` | `boolean` | `false` | 是否与其他并行插件一起并行执行该插件。 |
| `setup` | `Plugin<T>`{lang="ts"}  | `false` | 主要的插件函数，相当于函数插件。 |
| `hooks` | `Partial<RuntimeNuxtHooks>`{lang="ts"}  | `false` | 要直接注册的 Nuxt 应用运行时钩子。 |
| `env` | `{ islands?: boolean }`{lang="ts"}  | `false` | 如果您不希望在渲染仅服务器或 Island 组件时运行该插件，请将此值设置为 `false`。 |

:video-accordion{title="观看 Alexander Lichter 关于 Nuxt 插件对象语法的视频" videoId="2aXZyXB1QGQ"}

## 示例

### 基本用法

下面的示例演示了一个向全局添加功能的简单插件：

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // Add a global method
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`,
    },
  }
})
```

### 对象语法插件

下面的示例展示了具有高级配置的对象语法：

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // Plugin setup logic
    const data = await $fetch('/api/config')

    return {
      provide: {
        config: data,
      },
    }
  },
  hooks: {
    'app:created' () {
      console.log('App created!')
    },
  },
})
```
