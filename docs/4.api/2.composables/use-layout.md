---
title: "useLayout"
description: useLayout 返回当前路由解析后的布局。
minimalVersion: "4.5"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/layout.ts
    size: xs
---

## 描述

`useLayout` 会返回一个计算属性 ref，用于获取当前路由已解析出的布局，其解析链与 [`<NuxtLayout>`](/docs/4.x/api/components/nuxt-layout) 相同：先使用页面的 `layout` 元信息，然后使用通过 [路由规则](/docs/4.x/guide/concepts/rendering#hybrid-rendering) 设置的 `appLayout`，最后是 `'default'`。

在已渲染的 `<NuxtLayout>` 内部，它会反映外层布局；在其外部（例如在 `app.vue` 中），它会返回当前路由将会解析出的布局。

与直接读取 `route.meta.layout` 不同，这会考虑通过路由规则设置的布局，并会随着路由变化保持同步。

## 返回值

一个只读的计算型 ref，解析为布局名称（一个 `string`），或者在布局被禁用时为 `false`。

## 示例

```vue [app.vue]
<script setup lang="ts">
const layout = useLayout()
</script>

<template>
  <div>
    <CommandPalette v-if="layout !== 'minimal'" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```
