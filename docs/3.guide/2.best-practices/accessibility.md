---
navigation.title: '可访问性'
title: Nuxt 可访问性
description: Nuxt 应用的可访问性最佳实践。
---

让应用具备可访问性的绝大多数工作并不特定于 Nuxt：颜色对比度、表单语义和 ARIA 在这里与任何 Vue 或纯 HTML 应用中的工作方式相同，本指南末尾的[实用资源](#useful-resources)也对这些内容进行了很好的介绍。

Nuxt 改变的是导航。当应用完成 hydration 后，它会在客户端进行路由切换，因此文档不会重新加载，浏览器也不再为你播报新页面或重置焦点。Nuxt 提供了一些功能来弥补其中一部分差距，另外一些约定则可以覆盖其余部分。本指南将介绍处理这些问题的最佳实践。

::tip
[`@nuxt/a11y`](https://github.com/nuxt/a11y) 会在开发过程中，结合下面介绍的实践，帮助你发现组件中的可访问性问题。它目前处于 alpha 阶段，因此其 API 可能会发生变化。
::

## 路由公告

屏幕阅读器会自行播报完整的页面加载，但它们无法知道发生了客户端导航。[`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) 通过渲染一个隐藏的实时区域，并在每次导航后将新的页面标题写入其中，解决了这一问题：

```vue [app.vue]
<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
```

公告器会读取由 Unhead 渲染的标题，因此它的效果取决于标题本身。如果两个路由共享相同的 `<title>`，用户在它们之间切换时将听不到任何内容。

当你需要公告其他内容，或更改公告的紧急程度时，请使用 [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer)：

```vue [app/pages/search.vue]
<script setup lang="ts">
const { set } = useRouteAnnouncer()
const { data: results } = await useFetch('/api/search')

watch(results, (results) => {
  set(`${results?.length ?? 0} results found`)
})
</script>
```

:read-more{title="NuxtRouteAnnouncer" to="/docs/4.x/api/components/nuxt-route-announcer"}

对于非导航的页面内更新，例如表单验证或 Toast，请改用 [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer) 和 [`useAnnouncer`](/docs/4.x/api/composables/use-announcer)。

## 页面标题

由于路由播报器会读取文档标题，为每个路由设置独特的标题是你能做的最重要的事情。在 `app.vue` 中设置全局模板，并让每个页面填充自己的部分：

```vue [app.vue]
<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} - Nuxt` : 'Nuxt',
})
</script>
```

```vue [app/pages/about.vue]
<script setup lang="ts">
useHead({
  title: 'About us',
})
</script>
```

如果你的标题来自路由元数据，而不是页面本身，则可以在布局中通过 [`useRoute`](/docs/4.x/api/composables/use-route) 读取 [`definePageMeta`](/docs/4.x/directory-structure/app/pages#page-metadata) 的值。

:read-more{title="SEO 与 Meta" to="/docs/4.x/getting-started/seo-meta#dynamic-title"}

## 链接

在应用内导航时，请使用 [`<NuxtLink>`](/docs/4.x/api/components/nuxt-link)。它会渲染一个真实的 `<a href="...">`，这意味着它可以获得焦点、出现在 Tab 键导航顺序中，并且支持鼠标中键点击和“在新标签页中打开”。如果在带有调用 `navigateTo` 的 `@click` 处理器的 `<div>` 上实现这些功能，你就必须自行重新实现所有这些行为。

```vue
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>
```

在菜单或面包屑导航中，与当前路由匹配的链接已经会显示 `aria-current="page"`，因此辅助技术可以告知用户当前所在的项目。如果其他标记更能描述这种关系，例如多页面表单中的某个步骤，请设置 [`ariaCurrentValue`](/docs/4.x/api/components/nuxt-link#routerlink)：

```vue
<template>
  <NuxtLink
    to="/checkout/payment"
    aria-current-value="step"
  >Payment</NuxtLink>
</template>
```

指向 `public/` 目录中文件的链接，或指向同一源上的另一个应用的链接，并不是 Vue Router 所知晓的路由。请将它们标记为 [`external`](/docs/4.x/api/components/nuxt-link#handling-static-file-and-cross-app-links)，这样浏览器会执行真正的导航，而不会因无法匹配路由而失败。

:read-more{title="NuxtLink" to="/docs/4.x/api/components/nuxt-link"}

## 焦点管理

在客户端导航之后，焦点会保持在原来的位置，通常就是用户刚刚激活的链接。Vue Router 不会移动焦点，Nuxt 也不会，因此键盘用户可能需要再次遍历整个页头，才能到达刚刚发生变化的内容。

将跳过链接作为应用中的第一个 Tab 停止点是传统的解决方案，在初始页面加载时也同样有帮助：

```vue [app.vue]
<template>
  <a
    class="skip-link"
    href="#main"
  >跳转到主要内容</a>
  <AppHeader />
  <main
    id="main"
    tabindex="-1"
  >
    <NuxtPage />
  </main>
</template>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  position: static;
}
</style>
```

`<main>` 本身无法获得焦点，因此需要设置 `tabindex="-1"`，以便接受来自跳过链接或脚本的焦点。请使用 `-1`，而不要使用正值；正值会改变元素在 Tab 顺序中的位置，让其他所有人都感到意外。

如果适合你的应用，你还可以更进一步，通过插件在每次导航后将焦点移动到主要区域：

```ts [app/plugins/focus-main.client.ts]
export default defineNuxtPlugin(() => {
  useRouter().afterEach((to, from) => {
    if (to.path === from.path) {
      return
    }
    nextTick(() => document.getElementById('main')?.focus())
  })
})
```

::tip
仅使用键盘在应用中进行导航。在几次导航后，从跳过链接按 Tab 键进入 `<main>`，可以快速发现大多数焦点问题。
::

## 滚动行为

Nuxt 会在新路由上滚动到顶部，在用户返回时恢复之前的位置，并滚动到哈希目标。如果你需要不同的行为，例如平滑滚动或不同的偏移量，请配置 [`scrollBehaviorType`](/docs/4.x/guide/recipes/custom-routing#scroll-behavior-for-hash-links)，或在 [`router.options.ts`](/docs/4.x/guide/recipes/custom-routing#router-options) 中编写你自己的 `scrollBehavior`。请注意，平滑滚动应遵循用户的 `prefers-reduced-motion` 设置。

:read-more{title="自定义路由" to="/docs/4.x/guide/recipes/custom-routing"}

## 实用资源

- [Web 无障碍倡议（WAI）](https://www.w3.org/WAI/)
- [MDN：无障碍](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
