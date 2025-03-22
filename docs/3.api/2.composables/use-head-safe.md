---
title: useHeadSafe
description: 提供用户输入的头部数据的推荐方式。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

`useHeadSafe` 组合式函数是对 [`useHead`](/docs/api/composables/use-head) 组合式函数的封装，限制输入仅允许安全值。

## 用法

您可以传递与 [`useHead`](/docs/api/composables/use-head) 相同的所有值。

```ts
useHeadSafe({
  script: [
    { id: 'xss-script', innerHTML: 'alert("xss")' }
  ],
  meta: [
    { 'http-equiv': 'refresh', content: '0;javascript:alert(1)' }
  ]
})
// 将安全地生成
// <script id="xss-script"></script>
// <meta content="0;javascript:alert(1)">
```

::read-more{to="https://unhead.unjs.io/docs/api/use-head-safe" target="_blank"}
阅读更多关于 `Unhead` 的文档。
::

## 类型

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

允许值的列表是：

```ts
const WhitelistAttributes = {
  htmlAttrs: ['class', 'style', 'lang', 'dir'],
  bodyAttrs: ['class', 'style'],
  meta: ['name', 'property', 'charset', 'content', 'media'],
  noscript: ['textContent'],
  style: ['media', 'textContent', 'nonce', 'title', 'blocking'],
  script: ['type', 'textContent', 'nonce', 'blocking'],
  link: ['color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

有关更详细的类型，请参见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts)。