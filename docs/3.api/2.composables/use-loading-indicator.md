---
title: 'useLoadingIndicator'
description: 此组合式提供了对应用页面加载状态的访问。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/loading-indicator.ts
    size: xs
---

## 描述

一个返回页面加载状态的组合式。由 [`<NuxtLoadingIndicator>`](/docs/api/components/nuxt-loading-indicator) 使用，并且是可控的。
它连接到 [`page:loading:start`](/docs/api/advanced/hooks#app-hooks-runtime) 和 [`page:loading:end`](/docs/api/advanced/hooks#app-hooks-runtime) 来更改其状态。

## 参数

- `duration`: 加载条的持续时间，单位为毫秒（默认为 `2000`）。
- `throttle`: 显示和隐藏的节流时间，单位为毫秒（默认为 `200`）。
- `estimatedProgress`: 默认情况下，Nuxt 在接近 100% 时会减慢进度。您可以提供一个自定义函数来定制进度估算，该函数接收加载条的持续时间（上面提到的）和经过的时间。它应该返回一个介于 0 到 100 之间的值。

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

将 `isLoading` 设置为 true，并开始增加 `progress` 值。`start` 接受一个 `{ force: true }` 选项以跳过间隔并立即显示加载状态。

### `set()`

将 `progress` 值设置为特定值。`set` 接受一个 `{ force: true }` 选项以跳过间隔并立即显示加载状态。

### `finish()`

将 `progress` 值设置为 `100`，停止所有计时器和间隔，并在 `500` 毫秒后重置加载状态。`finish` 接受一个 `{ force: true }` 选项以跳过状态重置前的间隔，以及一个 `{ error: true }` 选项以更改加载条颜色并将错误属性设置为 true。

### `clear()`

由 `finish()` 使用。清除组合式使用的所有计时器和间隔。

## 例子

```vue
<script setup lang="ts">
  const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // 这是进度默认计算的方式
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
  })
</script>
```

```vue
<script setup lang="ts">
  const { start, set } = useLoadingIndicator()
  // 同于 set(0, { force: true })
  // 将进度设置为 0，并立即显示加载状态
  start({ force: true })
</script>
```