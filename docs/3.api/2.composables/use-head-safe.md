---
title: useHeadSafe
description: 推荐的提供包含用户输入的 head 数据的方法。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/unhead/src/composables/useHeadSafe.ts
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

::read-more{to="https://unhead.unjs.io/usage/composables/use-head-safe" target="_blank"}
在`unhead`文档中阅读更多内容。
::

## 类型

```ts
useHeadSafe(input: MaybeComputedRef<HeadSafe>): void
```

安全值的允许列表是：

```ts
export default {
  htmlAttrs: ['id', 'class', 'lang', 'dir'],
  bodyAttrs: ['id', 'class'],
  meta: ['id', 'name', 'property', 'charset', 'content'],
  noscript: ['id', 'textContent'],
  script: ['id', 'type', 'textContent'],
  link: ['id', 'color', 'crossorigin', 'fetchpriority', 'href', 'hreflang', 'imagesrcset', 'imagesizes', 'integrity', 'media', 'referrerpolicy', 'rel', 'sizes', 'type'],
}
```

查看 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/schema/src/safeSchema.ts) 以获取更详细的类型。
