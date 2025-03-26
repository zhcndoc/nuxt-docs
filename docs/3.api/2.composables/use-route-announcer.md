---
title: 'useRouteAnnouncer'
description: 这个组合函数观察页面标题的变化，并相应地更新播报信息。
navigation:
  badge: 新
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::重要
这个组合函数在 Nuxt v3.12 及以上版本可用。
::

## 描述

一个组合函数，它观察页面标题的变化，并相应地更新播报信息。由 [`<NuxtRouteAnnouncer>`](/docs/api/components/nuxt-route-announcer) 使用，并且可以控制。
它通过 Unhead 的 [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered) 钩子来读取页面标题并将其设置为播报消息。

## 参数

- `politeness`: 设置屏幕阅读器播报的紧急性：`off`（禁用播报），`polite`（等待安静），或 `assertive`（立即打断）。 （默认值 `polite`）。

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 要播报的消息

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器播报的紧急性级别 `off`、`polite` 或 `assertive`

## 方法

### `set(message, politeness = "polite")`

设置要播报的消息及其紧急性级别。

### `polite(message)`

以 `politeness = "polite"` 设置消息。

### `assertive(message)`

以 `politeness = "assertive"` 设置消息。

## 示例

```vue [pages/index.vue]
<script setup lang="ts">
  const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
    politeness: 'assertive'
  })
</script>
```
