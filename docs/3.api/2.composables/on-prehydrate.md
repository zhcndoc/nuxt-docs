---
title: "onPrehydrate"
description: "在 Nuxt 对页面进行水合之前，使用 onPrehydrate 在客户端立即运行回调。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
这个组合函数在 Nuxt v3.12+ 中可用。
::

`onPrehydrate` 是一个组合钩子生命周期，它允许你在 Nuxt 页面预填充之前在客户端立即运行回调。

::note
这是一个高级工具，应该谨慎使用。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 通过操纵 DOM 来避免预填充不匹配。
::

## 使用

`onPrehydrate` 可以直接在 Vue 组件的设置函数（例如，在 `<script setup>` 中）或插件中调用。
它只有在服务器上调用时才会生效，并且它不会包含在您的客户端构建中。

## 参数

- `callback`: 一个将被字符串化和内联在 HTML 中的函数。它不应该有任何外部依赖（如自动导入）或引用回调外部定义的变量。回调将在 Nuxt 运行时初始化之前运行，因此它不应该依赖于 Nuxt 或 Vue 上下文。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate 保证在 Nuxt 预填充之前运行
onPrehydrate(() => {
  console.log(window)
})

// 只要它只有一个根节点，你就可以访问元素
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// 对于非常高级的使用情况（例如，没有单一的根节点）你
// 可以自己访问/设置 `data-prehydrate-id`
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```
