---
title: 'useAnnouncer'
description: 一个用于向屏幕阅读器宣布消息的组合式函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/announcer.ts
    size: xs
---

::important
此组合式函数适用于 Nuxt v3.17+。
::

## 描述

一个用于向屏幕阅读器宣布动态内容变化的组合式函数。与自动宣布路由变化的 [`useRouteAnnouncer`](/docs/api/composables/use-route-announcer) 不同，`useAnnouncer` 让你手动控制宣布的内容和时机。

适用于页面内更新，如表单验证、异步操作、吐司通知和实时内容变化。

## 参数

- `politeness`：设置屏幕阅读器公告的默认紧急程度：`off`（禁用宣布）、`polite`（等待安静时机）、或 `assertive`（立即打断）。默认值为 `polite`。

## 属性

### `message`

- **类型**：`Ref<string>`
- **描述**：当前要宣布的消息

### `politeness`

- **类型**：`Ref<'polite' | 'assertive' | 'off'>`
- **描述**：屏幕阅读器公告的紧急程度

## 方法

### `set(message, politeness = "polite")`

设置要宣布的消息及其紧急程度。

### `polite(message)`

以 `politeness = "polite"` 设置消息。用于非紧急更新，可等待屏幕阅读器完成当前任务后宣布。

### `assertive(message)`

以 `politeness = "assertive"` 设置消息。用于紧急更新，应立即打断屏幕阅读器。

## 示例

```vue [app/pages/contact.vue]
<script setup lang="ts">
const { polite, assertive } = useAnnouncer()

async function submitForm () {
  try {
    await $fetch('/api/contact', { method: 'POST', body: formData })
    polite('消息发送成功')
  } catch (error) {
    assertive('错误：消息发送失败')
  }
}
</script>
```

## 用例

### 表单验证

```vue [app/components/LoginForm.vue]
<script setup lang="ts">
const { assertive } = useAnnouncer()

function validateForm () {
  const errors = []
  if (!email.value) { errors.push('电子邮箱为必填项') }
  if (!password.value) { errors.push('密码为必填项') }

  if (errors.length) {
    assertive(`表单存在 ${errors.length} 个错误：${errors.join('，')}`)
    return false
  }
  return true
}
</script>
```

### 加载状态

```vue [app/pages/dashboard.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const { data, status } = await useFetch('/api/data')

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    polite('数据加载中...')
  } else if (newStatus === 'success') {
    polite('数据加载成功')
  }
})
</script>
```

### 搜索结果

```vue [app/components/Search.vue]
<script setup lang="ts">
const { polite } = useAnnouncer()

const results = ref([])

watch(results, (newResults) => {
  polite(`发现 ${newResults.length} 条结果`)
})
</script>
```

::callout
你需要在应用中添加 [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer) 组件，才能让公告渲染到 DOM 中。
::

::callout
如需自动宣布路由/页面变化，请使用 [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer) 搭配 [`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) 组件。
::
