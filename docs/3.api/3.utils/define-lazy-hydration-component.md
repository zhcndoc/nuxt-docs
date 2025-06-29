---
title: 'defineLazyHydrationComponent'
description: '定义具有特定策略的延迟水合组件。'
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent` 是一个编译器宏，可以帮助你创建具有特定延迟水合策略的组件。延迟水合会推迟水合操作，直到组件变得可见或浏览器完成更关键的任务。这样可以大大降低初始性能开销，尤其适合非关键组件。

## 用法

### 可见性策略

当组件在视口中变得可见时进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!-- 
      当元素距离进入视口仅剩 100px 时触发水合。
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

`hydrateOnVisible` 属性是可选的。你可以传入一个对象来自定义底层使用的 `IntersectionObserver` 的行为。

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="IntersectionObserver 选项"}
阅读关于 `hydrate-on-visible` 配置选项的更多信息。
::

::note
底层使用了 Vue 内置的 [`hydrateOnVisible` 策略](https://vuejs.org/guide/components/async.html#hydrate-on-visible)。
::

### 空闲策略

当浏览器处于空闲状态时进行水合。适合需要尽快加载但不阻塞关键渲染路径的组件。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!-- 当浏览器空闲或等待 2000 毫秒后触发水合。 -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

`hydrateOnIdle` 属性是可选的。你可以传入一个正数，指明最大超时时间。

空闲策略适用于可在浏览器空闲时进行水合的组件。

::note
底层使用了 Vue 内置的 [`hydrateOnIdle` 策略](https://vuejs.org/guide/components/async.html#hydrate-on-idle)。
::

### 交互策略

在指定交互事件（例如点击、鼠标悬停）后进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'interaction',
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!--
      当元素被指针悬停时触发水合。
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

`hydrateOnInteraction` 属性是可选的。如果不传入事件或事件列表，默认会在 `pointerenter`、`click` 和 `focus` 时进行水合。

::note
底层使用了 Vue 内置的 [`hydrateOnInteraction` 策略](https://vuejs.org/guide/components/async.html#hydrate-on-interaction)。
::

### 媒体查询策略

当窗口匹配某个媒体查询时进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'mediaQuery',
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!--
      当窗口宽度大于等于 768px 时触发水合。
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
底层使用了 Vue 内置的 [`hydrateOnMediaQuery` 策略](https://vuejs.org/guide/components/async.html#hydrate-on-media-query)。
::

### 时间策略

在指定延迟（毫秒）后进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time', 
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!-- 在 1000 毫秒后触发水合。 -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

时间策略适合可以等待特定时间后再水合的组件。

### 条件策略

根据布尔条件进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue')
)

const isReady = ref(false)

function myFunction() {
  // 触发自定义水合策略...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- 当 isReady 变为 true 时触发水合。 -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

条件策略适用于可能并非总需要水合的组件。

### 永不水合

组件永远不会被水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'never',
  () => import('./components/MyComponent.vue')
)
</script>

<template>
  <div>
    <!-- 该组件永远不会被 Vue 水合。 -->
    <LazyHydrationMyComponent />
  </div>
</template>
```

### 监听水合事件

所有延迟水合组件在水合完成后都会触发 `@hydrated` 事件。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue')
)

function onHydrate() {
  console.log("组件已完成水合！")
}
</script>

<template>
  <div>
    <LazyHydrationMyComponent
      :hydrate-on-visible="{ rootMargin: '100px' }"
      @hydrated="onHydrate"
    />
  </div>
</template>
```

## 参数

::warning
为确保编译器能正确识别此宏，避免使用外部变量。以下的写法会导致宏无法被正确识别：

```vue
<script setup lang="ts">
const strategy = 'visible'
const source = () => import('./components/MyComponent.vue')
const LazyHydrationMyComponent = defineLazyHydrationComponent(strategy, source)
</script>
```
::

### `strategy`

- **类型**: `'visible' | 'idle' | 'interaction' | 'mediaQuery' | 'if' | 'time' | 'never'`
- **必填**: `true`

| 策略          | 描述                                                          |
|---------------|---------------------------------------------------------------|
| `visible`     | 当组件在视口中变得可见时进行水合。                            |
| `idle`        | 当浏览器空闲或延迟后进行水合。                                |
| `interaction` | 用户交互（如点击、悬停）后进行水合。                         |
| `mediaQuery`  | 当满足指定的媒体查询条件时进行水合。                          |
| `if`          | 当指定的布尔条件为真时进行水合。                              |
| `time`        | 在指定的时间延迟后进行水合。                                  |
| `never`       | 防止 Vue 对此组件进行水合。                                  |

### `source`

- **类型**: `() => Promise<Component>`
- **必填**: `true`