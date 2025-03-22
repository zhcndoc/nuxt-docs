---
title: useHead
description: useHead 自定义您 Nuxt 应用程序单个页面的头部属性。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useHead`](/docs/api/composables/use-head) 组合函数允许您以编程和响应式的方式管理头部标签，由 [Unhead](https://unhead.unjs.io) 提供支持。如果数据来自用户或其他不可信的来源，我们建议您查看[`useHeadSafe`](/docs/api/composables/use-head-safe)。

:read-more{to="/docs/getting-started/seo-meta"}

## 类型

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

以下是 [`useHead`](/docs/api/composables/use-head) 的非响应式类型。

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

有关更详细类型的信息，请参见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)。

::note
`useHead` 的属性可以是动态的，接受 `ref`、`computed` 和 `reactive` 属性。`meta` 参数也可以接受一个返回对象的函数，以使整个对象具有响应性。
::

## 参数

### `meta`

**类型**: `MetaObject`

一个接受以下头部元数据的对象：

- `meta`: 数组中的每个元素映射到新创建的 `<meta>` 标签，其中对象属性映射到对应的属性。
  - **类型**: `Array<Record<string, any>>`
- `link`: 数组中的每个元素映射到新创建的 `<link>` 标签，其中对象属性映射到对应的属性。
  - **类型**: `Array<Record<string, any>>`
- `style`: 数组中的每个元素映射到新创建的 `<style>` 标签，其中对象属性映射到对应的属性。
  - **类型**: `Array<Record<string, any>>`
- `script`: 数组中的每个元素映射到新创建的 `<script>` 标签，其中对象属性映射到对应的属性。
  - **类型**: `Array<Record<string, any>>`
- `noscript`: 数组中的每个元素映射到新创建的 `<noscript>` 标签，其中对象属性映射到对应的属性。
  - **类型**: `Array<Record<string, any>>`
- `titleTemplate`: 配置动态模板以自定义单个页面的标题。
  - **类型**: `string` | `((title: string) => string)`
- `title`: 设置单个页面的静态标题。
  - **类型**: `string`
- `bodyAttrs`: 设置 `<body>` 标签的属性。每个对象属性映射到对应的属性。
  - **类型**: `Record<string, any>`
- `htmlAttrs`: 设置 `<html>` 标签的属性。每个对象属性映射到对应的属性。
  - **类型**: `Record<string, any>`
