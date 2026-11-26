---
title: "onPrehydrate"
description: "使用 onPrehydrate 在 Nuxt 对页面进行 hydration 之前，立即在客户端运行一个回调。"
minimalVersion: "3.12"
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

在 Vue 组件的 setup 函数中（例如在 `<script setup>` 中）或在插件中调用 `onPrehydrate`。该调用本身只有在服务端执行时才会生效，并且会从你的客户端构建中被移除。不过，你传入的回调会被序列化并内联到 HTML 中，因此它会在 Nuxt 开始 hydration 之前立即在 **浏览器** 中运行。这意味着它可以访问诸如 `window` 和 DOM 之类的浏览器全局对象。

## 类型

```ts [Signature]
export function onPrehydrate (callback: (el: HTMLElement) => void): string | undefined
```

## 参数

| 参数 | 类型 | 是否必需 | 描述 |
| ---- | --- | --- | --- |
| `callback` | `(el: HTMLElement) => void` | 是的 | 在 Nuxt 水合之前运行的函数。它将被字符串化并内联到 HTML 中。回调之外不应有外部依赖项或引用变量。在 Nuxt 运行时初始化之前运行，因此它不应依赖于 Nuxt 或 Vue 上下文。 |

## 返回值

- 当回调不接受 `el` 参数时，返回 `undefined`。
- 当回调接受 `el` 参数时，返回一个字符串（预水合物 id），该参数可用于设置或访问高级用例的 `data-prehydrate-id` 属性。

## Example

```vue twoslash [app/app.vue]
<script setup lang="ts">
declare const window: Window
// ---cut---
onPrehydrate(() => {
  // 在浏览器中运行，就在 Nuxt 开始水合之前
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

在内部实现中，回调会在构建时被转换为字符串并压缩，然后以内联 `<script>` 标签的形式插入到服务端渲染的 HTML 中，位置就在 `</body>` 结束标签之前。对于上面的示例，渲染后的 HTML 会包含类似如下内容：

```html
<div data-prehydrate-id=":b3qlvSiBeH:"> 你好 </div>
<script>(()=>{console.log(window)})()</script>
<script>document.querySelectorAll('[data-prehydrate-id*=":b3qlvSiBeH:"]').forEach(el=>{console.log(el.outerHTML)})</script>
```

当回调接收一个 `el` 参数时，组件的根元素会被标记上一个 `data-prehydrate-id` 属性，以便内联脚本可以找到它。
