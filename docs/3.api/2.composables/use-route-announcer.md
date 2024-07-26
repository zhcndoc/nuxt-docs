---
title: 'useRouteAnnouncer'
description: 这个组合函数会监听页面标题的变化，并相应地更新公告消息。
navigation:
  badge: 新
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
这个 composables 在 Nuxt v3.12+ 中可用。
::

## 描述

一个组合工具，它会监听页面标题的变化，并相应地更新公告消息。它被 [`<NuxtRouteAnnouncer>`](/docs/api/components/nuxt-route-announcer) 使用，并且可以控制。
它挂载到 Unhead 的 [`dom:rendered`](https://unhead.unjs.io/api/core/hooks#dom-hooks) 以读取页面的标题并将其设置为公告消息。

## 参数

- `politeness`: 设置屏幕阅读器公告的紧急程度：`off`（禁用公告），`polite`（等待静音），或 `assertive`（立即打断）。(默认 `polite`)

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 要宣布的消息

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器公告紧急程度级别 `off`，`polite`，或 `assertive`

## 方法

### `set(message, politeness = "polite")`

设置要宣布的消息及其紧急程度。

### `polite(message)`

用 `politeness = "polite"` 设置消息。

### `assertive(message)`

用 `politeness = "assertive"` 设置消息。

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>
```
