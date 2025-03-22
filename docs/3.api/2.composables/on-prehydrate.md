---
title: "onPrehydrate"
description: "使用 onPrehydrate 在 Nuxt 将页面水合之前立即在客户端运行回调。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/ssr.ts
    size: xs
---

::important
该组合式 API 在 Nuxt v3.12+ 中可用。
::

`onPrehydrate` 是一个组合式生命周期钩子，允许您在 Nuxt 水合页面之前立即在客户端运行回调。

::note
这是一个高级工具，使用时应谨慎。例如，[`nuxt-time`](https://github.com/danielroe/nuxt-time/pull/251) 和 [`@nuxtjs/color-mode`](https://github.com/nuxt-modules/color-mode/blob/main/src/script.js) 操作 DOM 以避免水合不匹配。
::

## 使用方法

`onPrehydrate` 可以直接在 Vue 组件的 setup 函数中调用（例如，在 `<script setup>` 中），或在插件中调用。
它仅在服务器上调用时产生效果，并且不会包含在您的客户端构建中。

## 参数

- `callback`: 一个将被字符串化并内嵌到 HTML 中的函数。它不应具有任何外部依赖（例如自动导入）或引用在回调外部定义的变量。回调将在 Nuxt 运行时初始化之前运行，因此不应依赖于 Nuxt 或 Vue 上下文。

## 示例

```vue twoslash [app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
// onPrehydrate 确保在 Nuxt 水合之前运行
onPrehydrate(() => {
  console.log(window)
})

// 只要它只有一个根节点，您就可以访问该元素
onPrehydrate((el) => {
  console.log(el.outerHTML)
  // <div data-v-inspector="app.vue:15:3" data-prehydrate-id=":b3qlvSiBeH:"> 你好 </div>
})

// 对于 _非常_ 高级的使用案例（例如没有单一根节点），您
// 可以自己访问/设置 `data-prehydrate-id`
const prehydrateId = onPrehydrate((el) => {})
</script>

<template>
  <div>
    你好
  </div>
</template>
```