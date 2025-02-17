---
title: 'useLoadingIndicator'
description: 这个组合函数提供了对应用页面加载状态的访问。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 描述

一个组合函数，返回页面的加载状态。被 [`<NuxtLoadingIndicator>`](/docs/api/components/nuxt-loading-indicator) 使用并且可控制。
它钩入 [`page:loading:start`](/docs/api/advanced/hooks#app-hooks-runtime) 和 [`page:loading:end`](/docs/api/advanced/hooks#app-hooks-runtime) 来改变其状态。

## 参数

- `duration`: 加载栏的持续时间，以毫秒为单位（默认 `2000`）。
- `throttle`: 节流出现和隐藏的频率，以毫秒为单位（默认 `200`）。
- `estimatedProgress`: 默认情况下，Nuxt 在接近 100% 时会逐渐减少。你可以提供一个自定义函数来定制进度估计，该函数接收加载栏的持续时间（上面）和已过的时间。它应该返回一个介于 0 和 100 之间的值。

## 属性

### `isLoading`

- **类型**: `Ref<boolean>`
- **描述**: 加载状态

### `error`

- **类型**: `Ref<boolean>`
- **描述**: 错误状态

### `progress`

- **类型**: `Ref<number>`
- **描述**: 进度状态。从 `0` 到 `100`。

## 方法

### `start()`

将 `isLoading` 设置为 true，并开始增加 `progress` 值。`start` 接受一个 `{ force: true }` 选项，以跳过间隔并立即显示加载状态。

### `set()`

将 `progress` 值设置为特定值。`set` 接受 `{ force: true }` 选项，以跳过间隔并立即显示加载状态。

### `finish()`

将 `progress` 值设置为 `100`，停止所有计时器和间隔，然后在 `500` 毫秒后重置加载状态。`finish` 接受一个 `{ force: true }` 选项来跳过状态重置之前的时间间隔，以及 `{ error: true }` 来改变加载栏的颜色并将错误属性设置为 true。

### `clear()`

被 `finish()` 使用。清除组合函数中使用的所有计时器和间隔。

## 示例

```vue
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // 这是默认情况下如何计算进度的方式
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>
```

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // same as set(0, { force: true })
  // set the progress to 0, and show loading immediately
  start({ force: true })
</script>
```
