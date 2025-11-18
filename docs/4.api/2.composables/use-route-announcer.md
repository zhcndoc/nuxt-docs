---
title: 'useRouteAnnouncer'
description: 该组合式函数监听页面标题变化，并相应更新播报消息。
navigation:
  badge: 新
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
该组合式函数在 Nuxt v3.12+ 中可用。
::

## 描述

一个组合式函数，用于监听页面标题变化并相应更新播报消息。被 [`<NuxtRouteAnnouncer>`](/docs/api/components/nuxt-route-announcer) 使用并且可以被控制。
它钩入 Unhead 的 [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered) 来读取页面标题，并将其设置为播报消息。

## 参数

- `politeness`：设置屏幕阅读器播报的紧急程度：`off`（禁用播报）、`polite`（等候静默）、或 `assertive`（立即打断）。默认值为 `polite`。

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 播报的消息内容

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器播报的紧急级别，可选 `off`、`polite` 或 `assertive`

## 方法

### `set(message, politeness = "polite")`

设置要播报的消息及其紧急级别。

### `polite(message)`

以 `politeness = "polite"` 设置消息。

### `assertive(message)`

以 `politeness = "assertive"` 设置消息。

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```