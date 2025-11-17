---
navigation.title: 'Nuxt 与水合'
title: Nuxt 与水合
description: 为什么修复水合问题很重要
---

在开发过程中，你可能会遇到水合（hydration）问题。不要忽视这些警告。

# 为什么修复它们很重要？

水合不匹配不仅仅是警告 —— 它们表明存在严重问题，可能会破坏你的应用：

## 性能影响

- **增加可交互时间**：水合错误会迫使 Vue 重新渲染整个组件树，这会增加你的 Nuxt 应用变得可交互所需的时间
- **糟糕的用户体验**：用户可能会看到内容闪烁或意外的布局位移

## 功能问题

- **交互失效**：事件监听器可能无法正确绑定，导致按钮和表单无法使用
- **状态不一致**：应用状态可能在用户看到的内容和应用认为已渲染的内容之间不同步
- **SEO 问题**：搜索引擎可能会索引与用户实际看到的不同的内容

# 如何检测它们

## 开发时控制台警告

Vue 会在开发时在浏览器控制台记录水合不匹配的警告：

![浏览器控制台中 Vue 水合不匹配警告的截图](/assets/docs/best-practices/vue-console-hydration.png)

# 常见原因

## 在服务器上下文中使用仅限浏览器的 API

**问题**：在服务端渲染期间使用仅浏览器可用的 API。

```html
<template>
  <div>用户偏好：{{ userTheme }}</div>
</template>

<script setup>
// 这会导致水合不匹配！
// localStorage 在服务器上不存在！
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**解决方案**：你可以使用 [`useCookie`](/docs/4.x/api/composables/use-cookie)：

```html
<template>
  <div>用户偏好：{{ userTheme }}</div>
</template>

<script setup>
// 这在服务端和客户端都能工作
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

## 数据不一致

**问题**：服务器与客户端之间的数据不同。

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**解决方案**：使用对 SSR 友好的状态：

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

## 基于客户端状态的条件渲染

**问题**：在服务端渲染期间使用仅客户端的条件。

```html
<template>
  <div v-if="window?.innerWidth > 768">
    桌面内容
  </div>
</template>
```

**解决方案**：使用媒体查询或在客户端处理：

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">桌面内容</div>
    <div class="md:hidden">移动端内容</div>
  </div>
</template>
```

## 具有副作用的第三方库

**问题**：修改 DOM 或依赖浏览器的库（这在标签管理工具中很常见）。

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**解决方案**：在完成水合后再初始化库：

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

## 基于时间的动态内容

**问题**：基于当前时间变化的内容。

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : 'Good afternoon'
</script>
```

**解决方案**：使用 [`NuxtTime`](/docs/4.x/api/components/nuxt-time) 组件或在客户端处理：

```html
<template>
  <div>
    <NuxtTime :date="new Date()" format="HH:mm" />
  </div>
</template>
```

```html
<template>
  <div>
    <ClientOnly>
      {{ greeting }}
      <template #fallback>
        你好！
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const greeting = ref('你好！')

onMounted(() => {
  const hour = new Date().getHours()
  greeting.value = hour < 12 ? '早上好' : '下午好'
})
</script>
```

## 总结

1. **使用对 SSR 友好的组合式 API**：[`useFetch`](/docs/4.x/api/composables/use-fetch)、[`useAsyncData`](/docs/4.x/api/composables/use-async-data)、[`useState`](/docs/4.x/api/composables/use-state)
2. **封装仅客户端代码**：对浏览器特有的内容使用 [`ClientOnly`](/docs/4.x/api/components/client-only) 组件
3. **一致的数据源**：确保服务器和客户端使用相同的数据
4. **避免在 setup 中产生副作用**：将依赖浏览器的代码移动到 `onMounted`

::tip
你可以阅读 [Vue 关于 SSR 水合不匹配的文档](https://vue.zhcndoc.com/guide/scaling-up/ssr#hydration-mismatch) 来更好地理解水合问题。
::
