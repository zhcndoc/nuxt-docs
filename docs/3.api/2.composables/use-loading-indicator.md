---
title: 'useLoadingIndicator'
description: 这个组合函数让你能够访问应用页面的加载状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 描述

一个返回页面加载状态的组合函数。被 [`<NuxtLoadingIndicator>`](/docs/api/components/nuxt-loading-indicator) 使用且可以被控制。
它监听 [`page:loading:start`](/docs/api/advanced/hooks#app-hooks-runtime) 和 [`page:loading:end`](/docs/api/advanced/hooks#app-hooks-runtime) 事件来改变其状态。

## 参数

- `duration`：加载条的持续时间，单位毫秒（默认值 `2000`）。
- `throttle`：加载条出现和隐藏的节流时间，单位毫秒（默认值 `200`）。
- `estimatedProgress`：默认情况下，Nuxt 会在接近 100% 时减缓进度。你可以提供自定义函数来定制进度估算，该函数接收加载条的持续时间（上述）和已用时间，应该返回一个介于 0 到 100 之间的数值。

## 属性

### `isLoading`

- **类型**: `Ref<boolean>`
- **描述**: 加载状态

### `error`

- **类型**: `Ref<boolean>`
- **描述**: 错误状态

### `progress`

- **类型**: `Ref<number>`
- **描述**: 进度状态。范围从 `0` 到 `100`。

## 方法

### `start()`

将 `isLoading` 设为 true，并开始增加 `progress` 值。`start` 接受一个 `{ force: true }` 选项，用以跳过间隔并立即显示加载状态。

### `set()`

将 `progress` 值设为特定数值。`set` 接受一个 `{ force: true }` 选项，用以跳过间隔并立即显示加载状态。

### `finish()`

将 `progress` 值设置为 `100`，停止所有定时器和间隔，然后在 500 毫秒后重置加载状态。`finish` 接受 `{ force: true }` 选项跳过状态重置前的间隔，以及 `{ error: true }` 选项用来改变加载条颜色并将错误属性设为 true。

### `clear()`

被 `finish()` 使用。清除组合函数使用的所有定时器和间隔。

## 示例

```vue
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // 默认进度计算方式
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>
```

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // 等同于 set(0, { force: true })
  // 将进度设为 0，并立即显示加载状态
  start({ force: true })
</script>
```