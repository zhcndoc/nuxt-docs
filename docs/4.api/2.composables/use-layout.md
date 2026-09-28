---
title: "useLayout"
description: useLayout 返回当前路由解析得到的布局。
minimalVersion: "4.5"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/layout.ts
    size: xs
---

## 描述

`useLayout` 返回一个计算型 ref，其中包含当前路由解析得到的布局，使用的解析链与 [`<NuxtLayout>`](/docs/api/components/nuxt-layout) 相同：首先是页面的 `layout` 元数据，然后是通过[路由规则](/docs/guide/concepts/rendering#hybrid-rendering)设置的 `appLayout`，最后是 `'default'`。

在已渲染的 `<NuxtLayout>` 内部，它反映的是外层布局；在其外部（例如在 `app.vue` 中），它返回的是当前路由将会解析得到的布局。

与直接读取 `route.meta.layout` 不同，这会考虑通过路由规则设置的布局，并且会随着路由变化保持同步。

## 返回值

一个只读的计算型 ref，解析为布局名称（一个 `string`），或在布局被禁用时为 `false`。

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
