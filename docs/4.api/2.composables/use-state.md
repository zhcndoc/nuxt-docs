---
title: "useState"
description: useState 组合式创建了一个响应式且对 SSR 友好的共享状态。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 用法

```ts
// 创建一个响应式状态并设置默认值
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/4.x/getting-started/state-management"}

::important
因为 `useState` 内的数据会被序列化为 JSON，因此重要的是它不应包含任何无法被序列化的内容，例如类、函数或符号（classes、functions 或 symbols）。
::

::warning
`useState` 是一个由编译器转换的保留函数名，因此你不应该将自己的函数命名为 `useState`。
::

:video-accordion{title="观看 Alexander Lichter 关于为何以及何时使用 useState 的视频" videoId="mv0WcBABcIk"}

## 使用 `shallowRef`

如果你不需要状态深度响应，可以将 `useState` 与 [`shallowRef`](https://vue.zhcndoc.com/api/reactivity-advanced#shallowref) 结合使用。当你的状态包含大型对象和数组时，这可以提高性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`：一个唯一键，确保跨请求的数据获取能被正确去重。如果你不提供键，则会为该次 `useState` 实例生成一个基于文件和行号的唯一键。
- `init`：在状态未初始化时提供初始值的函数。该函数也可以返回一个 `Ref`。
- `T`：（仅限 TypeScript）指定状态的类型
