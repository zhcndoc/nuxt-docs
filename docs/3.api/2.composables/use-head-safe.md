---
title: useHeadSafe
description: 推荐的提供包含用户输入的 head 数据的方法。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

`useHeadSafe` 组合函数是 [`useHead`](/docs/api/composables/use-head) 组合函数的包装器，它限制了输入，只允许安全值。

## 使用方法

你可以传递与 [`useHead`](/docs/api/composables/use-head) 相同的值

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
在the `Unhead`文档中阅读更多内容。
::

## 类型

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

允许的值列表是：

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

查看 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts) 以获取更详细的类型。
