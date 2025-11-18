---
title: useHeadSafe  
description: 使用用户输入提供头部数据的推荐方式。  
links:  
  - label: 源码  
    icon: i-simple-icons-github  
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts  
    size: xs  
---

## 用法

`useHeadSafe` 组合函数是对 [`useHead`](/docs/3.x/api/composables/use-head) 组合函数的封装，限制输入只允许安全的值。这是在处理用户输入时管理头部数据的推荐方式，因为它通过对潜在危险的属性进行消毒，从而防止 XSS 攻击。

::warning  
使用 `useHeadSafe` 时，诸如脚本中的 `innerHTML` 或 meta 标签中的 `http-equiv` 之类的潜在危险属性会被自动剥离，以防止 XSS 攻击。只要处理用户生成的内容，就应该使用此组合函数。  
::

## 类型

```ts [Signature]
export function useHeadSafe (input: MaybeComputedRef<HeadSafe>): void
```

### 允许的属性

以下属性被列入各头部元素类型的白名单：

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

详见 [@unhead/vue](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/safeSchema.ts) 获取更详细的类型定义。

## 参数

`input`：一个包含头部数据的 `MaybeComputedRef<HeadSafe>` 对象。你可以传入和 [`useHead`](/docs/3.x/api/composables/use-head) 相同的值，但只有安全的属性会被渲染。

## 返回值

此组合函数不返回任何值。

## 示例

```vue [app/pages/user-profile.vue]
<script setup lang="ts">
// 可能包含恶意代码的用户生成内容
const userBio = ref('<script>alert("xss")<' + '/script>')

useHeadSafe({
  title: `用户资料`,
  meta: [
    {
      name: 'description',
      content: userBio.value, // 已安全消毒
    },
  ],
})
</script>
```

::read-more{to="https://unhead.unjs.io/docs/typescript/head/api/composables/use-head-safe" target="_blank"}  
阅读更多 `Unhead` 文档内容。  
::