---
title: useHead
description: useHead 可自定义 Nuxt 应用各页面的 head 属性。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

The [`useHead`](/docs/4.x/api/composables/use-head) composable 函数允许你以编程且响应式的方式管理你的 head 标签，由 [Unhead](https://unhead.unjs.io) 提供支持。如果数据来自用户或其他不受信任的来源，建议查看 [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe)。

:read-more{to="/docs/4.x/getting-started/seo-meta"}

## 类型

```ts [Signature]
export function useHead (meta: MaybeComputedRef<MetaObject>): void
```

下面是 [`useHead`](/docs/4.x/api/composables/use-head) 的非响应式类型。

```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}
```

更多详细类型请参见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)。

::note
`useHead` 的属性可以是动态的，接受 `ref`、`computed` 和 `reactive`。`meta` 参数也可以接受返回对象的函数，从而使整个对象具有响应性。
::

## 参数

### `meta`

**类型**: `MetaObject`

一个接受以下 head 元数据的对象：

- `meta`: 数组中的每一项会映射为新创建的 `<meta>` 标签，对象属性映射为对应的属性。
  - **Type**: `Array<Record<string, any>>`
- `link`: 数组中的每一项会映射为新创建的 `<link>` 标签，对象属性映射为对应的属性。
  - **Type**: `Array<Record<string, any>>`
- `style`: 数组中的每一项会映射为新创建的 `<style>` 标签，对象属性映射为对应的属性。
  - **Type**: `Array<Record<string, any>>`
- `script`: 数组中的每一项会映射为新创建的 `<script>` 标签，对象属性映射为对应的属性。
  - **Type**: `Array<Record<string, any>>`
- `noscript`: 数组中的每一项会映射为新创建的 `<noscript>` 标签，对象属性映射为对应的属性。
  - **Type**: `Array<Record<string, any>>`
- `titleTemplate`: 配置动态模板以定制单个页面的标题。
  - **Type**: `string` | `((title: string) => string)`
- `title`: 设置单个页面的静态标题。
  - **Type**: `string`
- `bodyAttrs`: 设置 `<body>` 标签的属性。对象的每个属性映射为对应的属性。
  - **Type**: `Record<string, any>`
- `htmlAttrs`: 设置 `<html>` 标签的属性。对象的每个属性映射为对应的属性。
  - **Type**: `Record<string, any>`