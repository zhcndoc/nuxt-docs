---
title: "useState"
description: 使用 useState 组合函数可以创建一个可响应式和 SSR 友好的共享状态。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 用法

```ts
// 创建一个可响应的状态并设置默认值
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/getting-started/state-management"}

::important
因为 `useState` 内部的数据会被序列化为 JSON，所以重要的是它不应该包含任何不能被序列化的内容，比如类、函数或符号。
::

::warning
`useState` 是一个被编译器转化的保留函数名称，所以你不应该将你自己的函数命名为 `useState`。
::

::tip{icon="i-ph-video" to="https://www.youtube.com/watch?v=mv0WcBABcIk" target="_blank"}
观看 Alexander Lichter 关于何时以及为何使用 `useState()` 的视频。
::

## 使用 `shallowRef`

如果你不需要你的状态是深度响应式的，你可以将 `useState` 与 [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) 结合起来。当你的状态包含大型对象和数组时，这可以提高性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`: 一个唯一的键，确保在请求中正确地解析数据。如果你不提供一个键，那么一个键将为你生成，它是文件和 `useState` 实例行号的唯一标识。
- `init`: 一个函数，当未初始化时，为状态提供初始值。这个函数也可以返回一个 `Ref`。
- `T`: (typescript only) 指定状态类型
