---
navigation.title: 'Nuxt 与 hydration'
title: Nuxt 与 hydration
description: 为什么修复 hydration 问题很重要
---

在开发过程中，你可能会遇到 hydration 问题。不要忽视这些警告。

# 为什么修复它们很重要？

Hydration 不匹配不仅是警告——它们是可能破坏你应用的重要问题的标志：

## 性能影响

- **增加交互时间**：Hydration 错误会迫使 Vue 重新渲染整个组件树，从而增加你的 Nuxt 应用可交互的时间
- **糟糕的用户体验**：用户可能会看到内容闪烁或意外的布局移动

## 功能问题

- **交互功能损坏**：事件监听器可能无法正确绑定，导致按钮和表单无法使用
- **状态不一致**：应用状态可能在用户看到的内容与应用认为已渲染的内容之间不同步
- **SEO 问题**：搜索引擎可能索引的内容与你用户实际看到的内容不同

# 如何检测它们

## 开发控制台警告

Vue 会在开发时在浏览器控制台记录 hydration 不匹配的警告：

![浏览器控制台中 Vue hydration 不匹配警告截图](/assets/docs/best-practices/vue-console-hydration.png)

# 常见原因

## 仅浏览器 API 在服务器环境中使用

**问题**：在服务器端渲染期间使用浏览器特有的 API。

```html
<template>
  <div>用户偏好: {{ userTheme }}</div>
</template>

<script setup>
// 这会导致 hydration 不匹配！
// localStorage 在服务器上不存在！
const userTheme = localStorage.getItem('theme') || 'light'
</script>
```

**解决方案**：你可以使用 [`useCookie`](/docs/3.x/api/composables/use-cookie) ：

```html
<template>
  <div>用户偏好: {{ userTheme }}</div>
</template>

<script setup>
// 这个在服务器和客户端都有效
const userTheme = useCookie('theme', { default: () => 'light' })
</script>
```

## 数据不一致

**问题**：服务器和客户端数据不同。

```html
<template>
  <div>{{ Math.random() }}</div>
</template>
```

**解决方案**：使用 SSR 友好的状态：

```html
<template>
  <div>{{ state }}</div>
</template>

<script setup>
const state = useState('random', () => Math.random())
</script>
```

## 基于客户端状态的条件渲染

**问题**：在 SSR 期间使用仅客户端的条件。

```html
<template>
  <div v-if="window?.innerWidth > 768">
    桌面端内容
  </div>
</template>
```

**解决方案**：使用媒体查询或在客户端处理：

```html
<template>
  <div class="responsive-content">
    <div class="hidden md:block">桌面端内容</div>
    <div class="md:hidden">移动端内容</div>
  </div>
</template>
```

## 有副作用的第三方库

**问题**：修改 DOM 或依赖浏览器的库（这在标签管理器中非常常见）。

```html
<script setup>
if (import.meta.client) {
    const { default: SomeBrowserLibrary } = await import('browser-only-lib')
    SomeBrowserLibrary.init()
}
</script>
```

**解决方案**：在 hydration 完成后初始化库：

```html
<script setup>
onMounted(async () => {
  const { default: SomeBrowserLibrary } = await import('browser-only-lib')
  SomeBrowserLibrary.init()
})
</script>
```

## 基于时间动态生成内容

**问题**：内容根据当前时间变化。

```html
<template>
  <div>{{ greeting }}</div>
</template>

<script setup>
const hour = new Date().getHours()
const greeting = hour < 12 ? '早上好' : '下午好'
</script>
```

**解决方案**：使用 [`NuxtTime`](/docs/3.x/api/components/nuxt-time) 组件或客户端处理：

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

1. **使用 SSR 友好的组合式函数**：[`useFetch`](/docs/3.x/api/composables/use-fetch)、[`useAsyncData`](/docs/3.x/api/composables/use-async-data)、[`useState`](/docs/3.x/api/composables/use-state)
2. **包裹仅客户端代码**：使用 [`ClientOnly`](/docs/3.x/api/components/client-only) 组件处理浏览器特有内容
3. **数据源保持一致**：确保服务器和客户端使用相同数据
4. **避免在 setup 中副作用**：将依赖浏览器的代码移动到 `onMounted`

::tip
你可以阅读 [Vue 关于 SSR hydration 不匹配的文档](https://vuejs.org/guide/scaling-up/ssr.html#hydration-mismatch) 来更好地理解 hydration。
::