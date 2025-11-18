---
title: "defineNuxtPlugin"
description: defineNuxtPlugin() 是一个用于创建 Nuxt 插件的辅助函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` 是一个用于创建 Nuxt 插件的辅助函数，提供增强的功能和类型安全。该工具将不同的插件格式规范化为一个一致的结构，可以无缝地在 Nuxt 的插件系统中工作。

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // 使用 nuxtApp 做一些操作
})
```

:read-more{to="/docs/guide/directory-structure/plugins#creating-plugins"}

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

**plugin**：插件可通过两种方式定义：
1. **函数插件**：一个接收 [`NuxtApp`](/docs/guide/going-further/internals#the-nuxtapp-interface) 实例的函数，可以返回一个 `Promise`，里面包含可能带有 [`provide`](/docs/guide/directory-structure/plugins#providing-helpers) 属性的对象，如果你想要为 [`NuxtApp`](/docs/guide/going-further/internals#the-nuxtapp-interface) 实例提供一个助手函数。
2. **对象插件**：一个包含多种属性的对象，用于配置插件的行为，例如 `name`、`enforce`、`dependsOn`、`order`、`parallel`、`setup`、`hooks` 和 `env`。

| 属性名           | 类型                                                                 | 是否必需 | 描述                                                                                                     |
| ---------------- | -------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `name`           | `string`                                                             | 否       | 插件的可选名称，有助于调试和依赖管理。                                                                |
| `enforce`        | `'pre'` \| `'default'` \| `'post'`                                  | 否       | 控制插件相对于其他插件的运行时机。                                                                     |
| `dependsOn`      | `string[]`                                                           | 否       | 当前插件依赖的其他插件名称数组。确保执行顺序正确。                                                     |
| `order`          | `number`                                                            | 否       | 允许对插件顺序进行更细粒度的控制，仅供高级用户使用。**它会覆盖 `enforce` 的值，并用于插件排序。**     |
| `parallel`       | `boolean`                                                           | 否       | 是否与其他并行插件同时执行。                                                                             |
| `setup`          | `Plugin<T>`{lang="ts"}                                              | 否       | 主要的插件函数，相当于函数插件。                                                                         |
| `hooks`          | `Partial<RuntimeNuxtHooks>`{lang="ts"}                              | 否       | 直接注册的 Nuxt 应用运行时钩子。                                                                         |
| `env`            | `{ islands?: boolean }`{lang="ts"}                                  | 否       | 如果不希望插件在仅服务端渲染或 island 组件渲染时执行，可将此值设为 `false`。                           |

:video-accordion{title="观看 Alexander Lichter 关于 Nuxt 插件对象语法的视频" videoId="2aXZyXB1QGQ"}

## 示例

### 基本用法

以下示例展示了一个简单的插件，添加了全局功能：

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // 添加全局方法
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`,
    },
  }
})
```

### 对象语法插件

以下示例展示了带有高级配置的对象语法写法：

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // 插件的设置逻辑
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