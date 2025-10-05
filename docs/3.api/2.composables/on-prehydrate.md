---
title: "onPrehydrate"
description: "在 Nuxt 在客户端进行 hydration 之前使用 onPrehydrate 在客户端立即运行回调。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
此可组合函数在 Nuxt v3.12+ 中可用。
::

`onPrehydrate` 是一个可组合的生命周期钩子，允许你在客户端在 Nuxt 对页面进行 hydration 之前立即运行一个回调。
::note
这是一个高级工具，应谨慎使用。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 会操作 DOM 以避免 hydration 不匹配。
::

## 使用

在 Vue 组件的 setup 函数中调用 `onPrehydrate`（例如在 `<script setup>` 中）或在插件中调用。只有在服务器端调用时才会生效，并且不会包含在你的客户端构建中。

## 类型

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## 参数

| Parameter | Type | Required | Description |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | 是 | 在 Nuxt 执行 hydration 之前要运行的函数（或字符串化的函数）。它将被字符串化并内联到 HTML 中。不应有外部依赖或引用回调外的变量。在 Nuxt 运行时初始化之前运行，因此不应依赖 Nuxt 或 Vue 的上下文。 |
| `key` | `string` | 否 | （高级）用于标识 prehydrate 脚本的唯一键，适用于像多个根节点这样的高级场景。 |

## 返回值

- 当仅传入回调函数时返回 `undefined`。
- 当传入回调和 key 时返回一个字符串（prehydrate id），可用于在高级用例中设置或访问 `data-prehydrate-id` 属性。

## 示例

```vue twoslash [app/app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// 在 Nuxt 执行 hydration 之前运行代码
onPrehydrate(() => {
  console.log(window)
})

// 访问根元素
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> 你好 </div>
})

// 高级：自行访问/设置 `data-prehydrate-id`
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    你好
  </div>
</template>
```