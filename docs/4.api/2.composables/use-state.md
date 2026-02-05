---
title: "useState"
description: useState 组合函数创建一个响应式且支持 SSR 的共享状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/state.ts
    size: xs
---

## 用法

```ts
// 创建一个响应式状态并设置默认值
const count = useState('counter', () => Math.round(Math.random() * 100))
```

:read-more{to="/docs/3.x/getting-started/state-management"}

::important
由于 `useState` 内的数据会被序列化为 JSON，非常重要的一点是它不能包含无法序列化的内容，比如类、函数或符号。
::

::warning
`useState` 是被编译器转换的保留函数名，因此不应将自己的函数命名为 `useState`。
::

:video-accordion{title="观看 Alexander Lichter 关于为何及何时使用 useState 的视频" videoId="mv0WcBABcIk"}

## 使用 `shallowRef`

如果你的状态不需要深度响应式，可以将 `useState` 和 [`shallowRef`](https://vue.zhcndoc.com/api/reactivity-advanced.html#shallowref) 结合使用。当你的状态包含大型对象和数组时，这样可以提升性能。

```ts
const state = useState('my-shallow-state', () => shallowRef({ deep: 'not reactive' }))
// isShallow(state) === true
```

## 类型

```ts [Signature]
export function useState<T> (init?: () => T | Ref<T>): Ref<T>
export function useState<T> (key: string, init?: () => T | Ref<T>): Ref<T>
```

- `key`：唯一键，用于确保跨请求的数据获取正确去重。如果未提供键，系统将为你生成一个基于文件和 `useState` 实例所在行号的唯一键。
- `init`：当状态未初始化时提供初始值的函数。该函数也可以返回一个 `Ref`。
- `T`：（仅 TypeScript）指定状态的类型。

## 故障排除

### `Cannot stringify arbitrary non-POJOs`

当你尝试使用 `useState` 存储不可序列化的内容（如类实例）时，会出现此错误。

如果你想使用 `useState` 存储 Nuxt 不支持的类实例，可以使用 [`definePayloadPlugin`](/docs/3.x/api/composables/use-nuxt-app#custom-reducerreviver) 来为你的类添加自定义的序列化和反序列化方法。

:read-more{to="/docs/3.x/api/composables/use-nuxt-app#payload"}