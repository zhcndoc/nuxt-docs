---
title: "onPrehydrate"
description: "使用 onPrehydrate 在 Nuxt 在客户端对页面进行 hydration 之前立即运行回调。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
该组合式函数在 Nuxt v3.12 及以上版本提供。
::

`onPrehydrate` 是一个组合式生命周期钩子，允许你在 Nuxt 在客户端对页面进行 hydration 之前立即运行一个回调函数。
::note
这是一个高级功能，使用时应谨慎。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 会操作 DOM 以避免 hydration 不匹配。
::

## 用法

在 Vue 组件的 setup 函数中调用 `onPrehydrate`（例如，在 `<script setup>` 中）或在插件中调用。该函数只有在服务器端调用时才有效，不会包含在你的客户端构建中。

## 类型

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): void
export function onPrehydrate (callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## 参数

| 参数     | 类型                                 | 必填 | 说明                                                                                                                       |
| ---- | ---------------------------------- | -- | ------------------------------------------------------------------------------------------------------------------------ |
| `callback` | `((el: HTMLElement) => void) \| string` | 是  | 一个函数（或字符串化的函数），在 Nuxt 进行 hydration 之前运行。该函数会被字符串化并内联到 HTML 中。函数内不应有外部依赖或引用 callback 以外的变量。运行时在 Nuxt 运行时初始化之前，不应依赖 Nuxt 或 Vue 上下文。 |
| `key`     | `string`                           | 否  | （高级）用于标识 prehydrate 脚本的唯一键，在存在多个根节点等高级场景下非常有用。                                                             |

## 返回值

- 仅传入回调函数时，返回 `undefined`。
- 传入回调函数和键时，返回一个字符串（prehydrate id），可用于设置或访问 `data-prehydrate-id` 属性，以支持高级用例。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// Run code before Nuxt hydrates
onPrehydrate(() => {
  console.log(window)
})

// Access the root element
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// Advanced: access/set `data-prehydrate-id` yourself
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```