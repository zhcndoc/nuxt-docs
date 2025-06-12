---
title: useHead
description: useHead 定制你的 Nuxt 应用中各个页面的 head 属性。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useHead`](/docs/api/composables/use-head) 组合函数允许你以编程且响应式的方式管理头部标签，底层由 [Unhead](https://unhead.unjs.io) 提供支持。如果数据来源于用户或其他不受信任的来源，我们推荐你使用 [`useHeadSafe`](/docs/api/composables/use-head-safe)。

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

详见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts) 中更详细的类型定义。

::note
`useHead` 的属性可以是动态的，支持接受 `ref`、`computed` 和 `reactive` 的属性。`meta` 参数也可以接受返回对象的函数，从而使整个对象变成响应式。
::

## 参数

### `meta`

**类型**: `MetaObject`

一个接收如下头部元数据的对象：

- `meta`：数组中的每个元素映射到新创建的 `<meta>` 标签，对象属性映射到对应的属性。
  - **类型**：`Array<Record<string, any>>`
- `link`：数组中的每个元素映射到新创建的 `<link>` 标签，对象属性映射到对应的属性。
  - **类型**：`Array<Record<string, any>>`
- `style`：数组中的每个元素映射到新创建的 `<style>` 标签，对象属性映射到对应的属性。
  - **类型**：`Array<Record<string, any>>`
- `script`：数组中的每个元素映射到新创建的 `<script>` 标签，对象属性映射到对应的属性。
  - **类型**：`Array<Record<string, any>>`
- `noscript`：数组中的每个元素映射到新创建的 `<noscript>` 标签，对象属性映射到对应的属性。
  - **类型**：`Array<Record<string, any>>`
- `titleTemplate`：配置动态模板，用于自定义单个页面的标题。
  - **类型**：`string` | `((title: string) => string)`
- `title`：设置单个页面的静态标题。
  - **类型**：`string`
- `bodyAttrs`：设置 `<body>` 标签的属性，每个对象属性映射到相应的属性。
  - **类型**：`Record<string, any>`
- `htmlAttrs`：设置 `<html>` 标签的属性，每个对象属性映射到相应的属性。
  - **类型**：`Record<string, any>`