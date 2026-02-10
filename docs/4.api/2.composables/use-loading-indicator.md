---
title: 'useLoadingIndicator'
description: 该 composable 可让您访问应用页面的加载状态。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 描述

一个返回页面加载状态的 composable。被 [`<NuxtLoadingIndicator>`](/docs/4.x/api/components/nuxt-loading-indicator) 使用，并且可被控制。
它会钩入 [`page:loading:start`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) 和 [`page:loading:end`](/docs/4.x/api/advanced/hooks#app-hooks-runtime) 来改变其状态。

## 参数

- `duration`: 加载条的持续时间，单位为毫秒（默认 `2000`）。
- `throttle`: 控制显示和隐藏的节流时间，单位为毫秒（默认 `200`）。
- `estimatedProgress`: 默认情况下，Nuxt 在接近 100% 时会放缓。你可以提供一个自定义函数来定制进度估算，该函数接收加载条的持续时间（上述）和已耗时。它应返回 0 到 100 之间的数值。

## 属性

### `isLoading`

- **type**: `Ref<boolean>`
- **description**: 加载状态

### `error`

- **type**: `Ref<boolean>`
- **description**: 错误状态

### `progress`

- **type**: `Ref<number>`
- **description**: 进度状态。从 `0` 到 `100`。

## 方法

### `start()`

将 `isLoading` 设为 true 并开始增加 `progress` 值。`start` 接受一个 `{ force: true }` 选项以跳过间隔并立即显示加载状态。

### `set()`

将 `progress` 值设置为特定值。`set` 接受一个 `{ force: true }` 选项以跳过间隔并立即显示加载状态。

### `finish()`

将 `progress` 值设为 `100`，停止所有定时器和间隔，然后在 500 毫秒后重置加载状态。`finish` 接受 `{ force: true }` 选项以在状态重置前跳过间隔，接受 `{ error: true }` 以改变加载条颜色并将 `error` 属性设置为 true。

### `clear()`

由 `finish()` 使用。清除该 composable 使用的所有定时器和间隔。

## 示例

```vue
<script setup lang="ts">
const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
  duration: 2000,
  throttle: 200,
  // 下面是默认的进度计算方式
  estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
})
</script>
```

```vue
<script setup lang="ts">
const { start, set } = useLoadingIndicator()
// 等同于 set(0, { force: true })
// 将进度设为 0，并立即显示加载
start({ force: true })
</script>
```
