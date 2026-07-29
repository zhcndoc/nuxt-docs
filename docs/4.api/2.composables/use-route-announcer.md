---
title: 'useRouteAnnouncer'
description: 此 composable 会观察页面标题的变化，并相应地更新播报消息。
minimalVersion: "3.12"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/route-announcer.ts
    size: xs
---

::important
此 composable 在 Nuxt v3.12+ 中可用。
::

## Description

A composable function used to watch for changes to the page title and update the announcer message accordingly. Used by [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) and can also be controlled manually.  
It hooks into Unhead’s [`dom:rendered`](https://unhead.unjs.io/docs/typescript/head/api/hooks/dom-rendered) to read the page title and set it as the announcer message.

:read-more{title="Nuxt 无障碍访问" to="/docs/4.x/guide/best-practices/accessibility#route-announcements"}

## 参数

- `politeness`: 设置屏幕阅读器播报的紧急程度：`off`（禁用播报）、`polite`（等待空闲）、或 `assertive`（立即打断）。 (默认 `polite`)。

## 属性

### `message`

- **类型**: `Ref<string>`
- **描述**: 要播报的消息

### `politeness`

- **类型**: `Ref<string>`
- **描述**: 屏幕阅读器播报紧急级别 `off`、`polite` 或 `assertive`

## Methods

### `set(message, politeness = "polite")`

Set the message to be announced and its urgency level.

### `polite(message)`

Set the message with `politeness = "polite"`.

### `assertive(message)`

Set the message with `politeness = "assertive"`.

## 示例

```vue [app/pages/index.vue]
<script setup lang="ts">
const { message, politeness, set, polite, assertive } = useRouteAnnouncer({
  politeness: 'assertive',
})
</script>
```

::callout
对于宣布页面内动态内容变化（表单验证、提示消息、加载状态），请改用 [`useAnnouncer`](/docs/4.x/api/composables/use-announcer)。
::
