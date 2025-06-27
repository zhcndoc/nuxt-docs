---
title: "onPrehydrate"
description: "使用 onPrehydrate 在 Nuxt 将页面水合之前立即在客户端运行回调。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
该组合式 API 在 Nuxt v3.12+ 中可用。
::

`onPrehydrate` 是一个组合式生命周期钩子，允许你在 Nuxt 对页面进行水合之前，立即在客户端运行回调函数。
::note
这是一个高级工具，使用时应谨慎。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 通过操作 DOM 来避免水合不匹配。
::

## 使用方法

在 Vue 组件的 setup 函数中调用 `onPrehydrate`（例如，在 `<script setup>` 中），或者在插件中调用。仅在服务端调用时生效，并且不会被包含到客户端构建中。

## 类型

```ts [Signature]
export function onPrehydrate(callback: (el: HTMLElement) => void): void
export function onPrehydrate(callback: string | ((el: HTMLElement) => void), key?: string): undefined | string
```

## 参数

| 参数 | 类型 | 是否必需 | 描述 |
| ---- | --- | --- | --- |
| `callback` | `((el: HTMLElement) => void) \| string` | 是 | 在 Nuxt 水合之前执行的函数（或字符串化的函数）。该函数会被字符串化并内联到 HTML 中。不应有外部依赖，也不应引用回调函数外部的变量。回调在 Nuxt 运行时初始化之前执行，因此不应依赖 Nuxt 或 Vue 上下文。 |
| `key` | `string` | 否 | （高级）用于标识预水合脚本的唯一键，对于如多根节点等高级场景很有用。 |

## 返回值

- 仅传入回调函数时，返回 `undefined`。
- 传入回调函数和键时，返回一个字符串（预水合 id），可用于高级用例中设置或访问 `data-prehydrate-id` 属性。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// 在 Nuxt 进行水合之前执行代码
onPrehydrate(() => {
  console.log(window)
})

// 访问根元素
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> 你好 </div>
})

// 高级用法：自己访问/设置 `data-prehydrate-id`
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    你好
  </div>
</template>
```