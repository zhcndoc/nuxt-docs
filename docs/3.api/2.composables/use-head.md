---
title: useHead
description: useHead 可定制 Nuxt 应用程序的各个页面的头部属性。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

[`useHead`](/docs/api/composables/use-head) 组合函数允许您以编程和反应式的方式管理您的 head 标签，由 [Unhead](https://unhead.unjs.io) 提供支持。如果您的数据来自用户或其他不可信的来源，我们建议您查看 [`useHeadSafe`](/docs/api/composables/use-head-safe)。

:read-more{to="/docs/getting-started/seo-meta"}

## 类型

```ts
useHead(meta: MaybeComputedRef<MetaObject>): void
```

下面是 [`useHead`](/docs/api/composables/use-head) 的非反应性类型。

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

请参阅 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/schema.ts) 了解更详细的类型。

::note
`useHead` 的属性可以是动态的，接受 `ref`、`computed` 和 `reactive` 属性。`meta` 参数也可以接受一个返回对象的函数，以使整个对象反应性。
::

## 参数

### `meta`

**类型**: `MetaObject`

一个接受以下头部元数据的对象：

- `meta`: 数组中的每个元素都映射到一个新创建的 `<meta>` 标签，其中对象属性映射到相应的属性。
  - **类型**: `Array<Record<string, any>>`
- `link`: 数组中的每个元素都映射到一个新创建的 `<link>` 标签，其中对象属性映射到相应的属性。
  - **类型**: `Array<Record<string, any>>`
- `style`: 数组中的每个元素都映射到一个新创建的 `<style>` 标签，其中对象属性映射到相应的属性。
  - **类型**: `Array<Record<string, any>>`
- `script`: 数组中的每个元素都映射到一个新创建的 `<script>` 标签，其中对象属性映射到相应的属性。
  - **类型**: `Array<Record<string, any>>`
- `noscript`: 数组中的每个元素都映射到一个新创建的 `<noscript>` 标签，其中对象属性映射到相应的属性。
  - **类型**: `Array<Record<string, any>>`
- `titleTemplate`: 配置动态模板以在单个页面上定制页面标题。
  - **类型**: `string` | `((title: string) => string)`
- `title`: 在单个页面上设置静态页面标题。
  - **类型**: `string`
- `bodyAttrs`: 设置 `<body>` 标签的属性。每个对象属性都被映射到相应的属性。
  - **类型**: `Record<string, any>`
- `htmlAttrs`: 设置 `<html>` 标签的属性。每个对象属性都被映射到相应的属性。
  - **类型**: `Record<string, any>`
