---
title: 'useRouteAnnouncer'
description: 此可组合项会观察页面标题的变化，并相应地更新播报消息。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
此 composable 在 Nuxt v3.12+ 中可用。
::

## 描述

一个 composable，用于监听页面标题的变化并相应地更新播报器消息。由 [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) 使用，并且可以被控制。  
它挂钩到 Unhead 的 [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered) 来读取页面标题并将其设置为播报器消息。

## 参数

- `politeness`: 设置屏幕阅读器播报的紧急程度：`off`（禁用播报）、`polite`（等待空闲）、或 `assertive`（立即打断）。 (默认 `polite`)。

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 要播报的消息

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器播报紧急级别 `off`、`polite` 或 `assertive`

## 方法

### `set(message, politeness = "polite")`

设置要播报的消息及其紧急级别。

### `polite(message)`

以 `politeness = "polite"` 设置消息。

### `assertive(message)`

以 `politeness = "assertive"` 设置消息。

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```