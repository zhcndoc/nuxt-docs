---
title: "defineNuxtPlugin"
description: defineNuxtPlugin() 是一个用于创建 Nuxt 插件的辅助函数。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/nuxt.ts
    size: xs
---

`defineNuxtPlugin` 是一个用于创建 Nuxt 插件的辅助函数，提供了增强的功能和类型安全。该工具将不同的插件格式规范化为一种一致的结构，可以无缝地在 Nuxt 的插件系统中工作。

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // 对 nuxtApp 做一些操作
})
```

:read-more{to="/docs/guide/directory-structure/plugins#creating-plugins"}

## 类型

```ts
defineNuxtPlugin<T extends Record<string, unknown>>(plugin: Plugin<T> | ObjectPlugin<T>): Plugin<T> & ObjectPlugin<T>

type Plugin<T> = (nuxt: [NuxtApp](/docs/guide/going-further/internals#the-nuxtapp-interface)) => Promise<void> | Promise<{ provide?: T }> | void | { provide?: T }

interface ObjectPlugin<T> {
  name?: string
  enforce?: 'pre' | 'default' | 'post'
  dependsOn?: string[]
  order?: number
  parallel?: boolean
  setup?: Plugin<T>
  hooks?: Partial<[RuntimeNuxtHooks](/docs/api/advanced/hooks#app-hooks-runtime)>
  env?: {
    islands?: boolean
  }
}
```

## 参数

**plugin**：插件可以有两种定义方式：
1. **函数插件**：一个接收 [`NuxtApp`](/docs/guide/going-further/internals#the-nuxtapp-interface) 实例的函数，可以返回一个可能包含 [`provide`](/docs/guide/directory-structure/plugins#providing-helpers) 属性的 Promise 对象（如果你想在 [`NuxtApp`](/docs/guide/going-further/internals#the-nuxtapp-interface) 实例上提供辅助方法）。
2. **对象插件**：一个包含多种属性的对象，用于配置插件的行为，例如 `name`、`enforce`、`dependsOn`、`order`、`parallel`、`setup`、`hooks` 和 `env`。

| 属性           | 类型                                                                 | 必需 | 描述                                                                                                     |
| ------------------ | -------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `name` | `string` | `否` | 插件的可选名称，有助于调试和依赖管理。 |
| `enforce` | `'pre'` \| `'default'` \| `'post'` | `否` | 控制插件相对于其他插件的执行时机。 |
| `dependsOn` | `string[]` | `否` | 该插件依赖的插件名称数组，确保正确的执行顺序。 |
| `order` | `number` | `否` | 允许对插件执行顺序进行更细粒度的控制，建议仅高级用户使用。**它会覆盖 `enforce` 的值，并用于排序插件。** |
| `parallel` | `boolean` | `否` | 是否与其他并行插件一起并行执行。 |
| `setup` | `Plugin<T>`{lang="ts"}  | `否` | 主插件函数，相当于函数插件。 |
| `hooks` | `Partial<RuntimeNuxtHooks>`{lang="ts"}  | `否` | 直接注册的 Nuxt 应用运行时钩子。 |
| `env` | `{ islands?: boolean }`{lang="ts"}  | `否` | 如果你不希望插件在仅服务器渲染或岛屿组件渲染时运行，请将此值设置为 `false`。 |

:video-accordion{title="观看 Alexander Lichter 关于 Nuxt 插件对象语法的视频" videoId="2aXZyXB1QGQ"}

## 示例

### 基本用法

下面的示例演示了一个简单的插件，它添加了全局功能：

```ts twoslash [plugins/hello.ts]
export default defineNuxtPlugin((nuxtApp) => {
  // 添加一个全局方法
  return {
    provide: {
      hello: (name: string) => `Hello ${name}!`
    }
  }
})
```

### 对象语法插件

下面的示例展示了带有高级配置的对象语法：

```ts twoslash [plugins/advanced.ts]
export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre',
  async setup (nuxtApp) {
    // 插件设置逻辑
    const data = await $fetch('/api/config')
    
    return {
      provide: {
        config: data
      }
    }
  },
  hooks: {
    'app:created'() {
      console.log('应用创建完成！')
    }
  },
})
```