---
title: useHeadSafe
description: 推荐的在接受用户输入时提供 head 数据的方式。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## 用法

`useHeadSafe` 组合函数是 [`useHead`](/docs/4.x/api/composables/use-head) 组合函数的一个包装，限制输入只允许安全的值。当处理用户输入时，推荐使用此方式管理 head 数据，因为它通过对潜在危险的属性进行消毒，防止了 XSS 攻击。

::warning
使用 `useHeadSafe` 时，脚本中的 `innerHTML` 或 meta 标签中的 `http-equiv` 等潜在危险属性会被自动剔除，以防止 XSS 攻击。当处理用户生成的内容时，应始终使用此组合函数。
::

## 类型

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### 允许的属性

以下属性是在各类 head 元素中被列入白名单的：

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

更详细的类型信息请参见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts)。

## 参数

`input`：一个 `MaybeComputedRef<HeadSafe>` 对象，包含 head 数据。可以传入与 [`useHead`](/docs/4.x/api/composables/use-head) 相同的值，但仅渲染安全的属性。

## 返回值

此组合函数不返回任何值。

## 示例

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// 用户生成的内容，可能包含恶意代码
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `用户资料`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // 安全生成，已消毒
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}
在 `Unhead` 文档中阅读更多内容。
::