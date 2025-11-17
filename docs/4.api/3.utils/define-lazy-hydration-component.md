---
title: 'defineLazyHydrationComponent'
description: '使用特定策略定义延迟水合（lazy hydration）的组件。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/components/plugins/lazy-hydration-macro-transform.ts
    size: xs
---

`defineLazyHydrationComponent` 是一个编译器宏，帮助你创建具有特定延迟水合策略的组件。延迟水合会将组件的水合推迟到组件变为可见或浏览器完成更关键任务之后。这可以显著减少初始性能开销，尤其对于非关键组件。

## 用法

### 可见性策略

当组件在视口中变为可见时进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is 100px away from entering the viewport.
    -->
    <LazyHydrationMyComponent :hydrate-on-visible="{ rootMargin: '100px' }" />
  </div>
</template>
```

`hydrateOnVisible` prop 是可选的。你可以传入一个对象来自定义底层使用的 `IntersectionObserver` 行为。

::read-more{to="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" title="IntersectionObserver 选项"}
阅读有关 `hydrate-on-visible` 的选项。
::

::note
在底层，这使用了 Vue 的内置 [`hydrateOnVisible` 策略](https://vue.zhcndoc.com/guide/components/async#hydrate-on-visible)。
::

### 闲置策略

当浏览器处于空闲时进行水合。如果你希望组件尽快加载但又不阻塞关键渲染路径，这种策略很适合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'idle',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Hydration will be triggered when the browser is idle or after 2000ms. -->
    <LazyHydrationMyComponent :hydrate-on-idle="2000" />
  </div>
</template>
```

`hydrateOnIdle` prop 是可选的。你可以传入一个正数以指定最大超时时间。

闲置策略适用于可以在浏览器空闲时再进行水合的组件。

::note
在底层，这使用了 Vue 的内置 [`hydrateOnIdle` 策略](https://vue.zhcndoc.com/guide/components/async#hydrate-on-idle)。
::

### 交互策略

在指定的交互（例如点击、鼠标悬停）之后进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'interaction',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the element(s) is hovered over by the pointer.
    -->
    <LazyHydrationMyComponent hydrate-on-interaction="mouseover" />
  </div>
</template>
```

`hydrateOnInteraction` prop 是可选的。如果你不传入事件或事件列表，默认会在 `pointerenter`、`click` 和 `focus` 时进行水合。

::note
在底层，这使用了 Vue 的内置 [`hydrateOnInteraction` 策略](https://vue.zhcndoc.com/guide/components/async#hydrate-on-interaction)。
::

### 媒体查询策略

当窗口匹配某个媒体查询时进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'mediaQuery',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!--
      Hydration will be triggered when
      the window width is greater than or equal to 768px.
    -->
    <LazyHydrationMyComponent hydrate-on-media-query="(min-width: 768px)" />
  </div>
</template>
```

::note
在底层，这使用了 Vue 的内置 [`hydrateOnMediaQuery` 策略](https://vue.zhcndoc.com/guide/components/async#hydrate-on-media-query)。
::

### 时间策略

在指定的延迟（以毫秒为单位）之后进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'time',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- Hydration is triggered after 1000ms. -->
    <LazyHydrationMyComponent :hydrate-after="1000" />
  </div>
</template>
```

时间策略适用于可以等待特定时间再进行水合的组件。

### 条件（If）策略

基于布尔条件进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'if',
  () => import('./components/MyComponent.vue'),
)

const isReady = ref(false)

function myFunction () {
  // Trigger custom hydration strategy...
  isReady.value = true
}
</script>

<template>
  <div>
    <!-- Hydration is triggered when isReady becomes true. -->
    <LazyHydrationMyComponent :hydrate-when="isReady" />
  </div>
</template>
```

如果组件不一定总是需要水合，条件策略是最佳选择。

### 永不水合

永远不会对该组件进行水合。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'never',
  () => import('./components/MyComponent.vue'),
)
</script>

<template>
  <div>
    <!-- This component will never be hydrated by Vue. -->
    <LazyHydrationMyComponent />
  </div>
</template>
```

### 监听水合事件

所有延迟水合的组件在完成水合时都会触发一个 `@hydrated` 事件。

```vue
<script setup lang="ts">
const LazyHydrationMyComponent = defineLazyHydrationComponent(
  'visible',
  () => import('./components/MyComponent.vue'),
)

function onHydrate () {
  console.log('Component has been hydrated!')
}
</script>

<template>
  <div>
    <LazyHydrationMyComponent
      :hydrate-on-visible="{ rootMargin: '100px' }"
      @hydrated="onHydrated"
    />
  </div>
</template>
```

## 参数

::warning
为确保编译器能正确识别此宏，请避免使用外部变量。如下示例的做法会导致宏无法被正确识别：

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
- **必需**: `true`

| 策略          | 描述                                                             |
|---------------|------------------------------------------------------------------|
| `visible`     | 当组件在视口中变为可见时进行水合。                                 |
| `idle`        | 当浏览器空闲或经过延迟后进行水合。                                 |
| `interaction` | 在用户交互（例如点击、悬停）时进行水合。                           |
| `mediaQuery`  | 当满足指定的媒体查询条件时进行水合。                               |
| `if`          | 当指定的布尔条件为真时进行水合。                                   |
| `time`        | 在指定的时间延迟之后进行水合。                                     |
| `never`       | 阻止 Vue 对该组件进行水合。                                       |

### `source`

- **类型**: `() => Promise<Component>`
- **必需**: `true`
