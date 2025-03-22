---
title: "useState"
description: useState 组合函数创建一个响应式且支持 SSR 的共享状态。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 用法

```ts
// 创建一个响应式状态并设置默认值
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/getting-started/state-management"}

::important
由于 `useState` 内的数据将被序列化为 JSON，因此确保其中不包含任何无法序列化的内容（如类、函数或符号）是非常重要的。
::

::warning
`useState` 是一个保留的函数名，由编译器转换，因此不应将您自己的函数命名为 `useState`。
::

::tip{icon="i-lucide-video" to="https://www.youtube.com/watch?v=mv0WcBABcIk" target="_blank"}
观看 Alexander Lichter 的视频，了解何时以及为何使用 `useState()`。
::

## 使用 `shallowRef`

如果您不需要状态深度响应，可以将 `useState` 与 [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) 结合使用。当您的状态包含大型对象和数组时，这可以提高性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 一个唯一的键，确保数据获取在请求之间正确去重。如果您不提供键，则会为您生成一个唯一于文件和 [`useState`](/docs/api/composables/use-state) 实例行号的键。
- `init`: 当未初始化时，提供状态的初始值的函数。此函数也可以返回一个 `Ref`。
- `T`: （仅限 TypeScript）指定状态的类型。