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

`onPrehydrate` 是一个组合式生命周期钩子，允许你在 Nuxt 在客户端对页面进行 hydration 之前立即运行一个回调。

::note
这是一个高级功能，使用时应谨慎。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 会操作 DOM 以避免 hydration 不匹配。
::

## 用法

`onPrehydrate` 可以直接在 Vue 组件的 setup 函数中调用（例如在 `<script setup>` 中），或者在插件中调用。
它仅在服务器端调用时生效，并且不会被包含到客户端的构建中。

## 参数

- `callback`：一个函数，该函数会被转换为字符串内联到 HTML 中。它不应有任何外部依赖（比如自动导入的模块）或引用回调外部定义的变量。该回调会在 Nuxt 运行时初始化之前执行，因此不能依赖 Nuxt 或 Vue 的上下文。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate 保证在 Nuxt hydration 之前运行
onPrehydrate(() => {
  console.log(window)
})

// 只要只有一个根节点，就可以访问该元素
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> Hi there </div>
})

// 对于 _非常_ 高级的用例（例如没有单个根节点）
// 你可以自己访问/设置 `data-prehydrate-id`
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    Hi there
  </div>
</template>
```