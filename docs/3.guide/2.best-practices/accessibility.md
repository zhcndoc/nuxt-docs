---
navigation.title: '无障碍'
title: Nuxt 无障碍
description: Nuxt 应用中的无障碍最佳实践。
---

让应用具备无障碍性的绝大部分内容并不特定于 Nuxt：颜色对比、表单语义和 ARIA 在这里与在任何 Vue 或纯 HTML 应用中一样，而本指南末尾的 [资源](#useful-resources) 对这些内容都有很好的覆盖。

Nuxt 的不同之处在于导航。一旦你的应用完成 hydration，它就会在客户端路由，因此文档不会重新加载，浏览器也不会再为你播报新页面或重置焦点。Nuxt 提供了一些功能来填补其中一部分缺口，另外一些约定则覆盖剩余部分。本指南概述了处理这些问题的最佳实践。

::tip
[`@nuxt/a11y`](https://github.com/nuxt/a11y) 会在你开发时，结合下面的实践，发现组件中的无障碍问题。它仍处于 alpha 阶段，因此其 API 可能会发生变化。
::

## 路由公告

屏幕阅读器会自行宣布整页加载，但它们无法知道发生了客户端侧导航。[`<NuxtRouteAnnouncer>`](/docs/4.x/api/components/nuxt-route-announcer) 通过渲染一个隐藏的实时区域，并在每次导航后将新页面标题写入其中来解决这个问题：

```vue [app.vue]
<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
```

公告器会读取 Unhead 渲染的标题，因此它的作用大小取决于你的标题质量。如果两个路由共享相同的 `<title>`，用户在它们之间切换时将听不到任何提示。

当你需要公告其他内容，或者需要改变公告的紧急程度时，请改用 [`useRouteAnnouncer`](/docs/4.x/api/composables/use-route-announcer)：

```vue [app/pages/search.vue]
<script setup lang="ts">
const { set } = useRouteAnnouncer()
const { data: results } = await useFetch('/api/search')

watch(results, (results) => {
  set(`${results?.length ?? 0} 条结果`)
})
</script>
```

:read-more{title="NuxtRouteAnnouncer" to="/docs/4.x/api/components/nuxt-route-announcer"}

对于页面内的更新而非导航，例如表单校验或提示通知，请改用 [`<NuxtAnnouncer>`](/docs/4.x/api/components/nuxt-announcer) 和 [`useAnnouncer`](/docs/4.x/api/composables/use-announcer)。

## 页面标题

由于路由播报器会跟随文档标题，为每个路由设置一个不同的标题是你能做的最有价值的事情。请在 `app.vue` 中设置一个全局模板，并让每个页面填充自己那部分内容：

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
  title: '关于我们',
})
</script>
```

如果你的标题来自路由元数据而不是页面本身，你可以在布局中通过 [`useRoute`](/docs/4.x/api/composables/use-route) 读取 [`definePageMeta`](/docs/4.x/directory-structure/app/pages#page-metadata) 的值。

:read-more{title="SEO 和元数据" to="/docs/4.x/getting-started/seo-meta#dynamic-title"}

## 链接

在应用内导航时使用 [`<NuxtLink>`](/docs/4.x/api/components/nuxt-link)。它会渲染一个真实的 `<a href="...">`，这意味着它可以获得焦点、会出现在 Tab 顺序中，并且支持中键点击和“在新标签页中打开”，而这些功能如果使用带有调用 `navigateTo` 的 `@click` 处理器的 `<div>`，你都必须自己重新实现。

```vue
<template>
  <NuxtLink to="/about">关于页面</NuxtLink>
</template>
```

在菜单或面包屑导航中，当前路由对应的链接已经会暴露 `aria-current="page"`，因此辅助技术可以知道你当前所在的位置。如果另一种标记更能描述这种关系，例如多页表单中的某一步，请设置 [`ariaCurrentValue`](/docs/4.x/api/components/nuxt-link#routerlink)：

```vue
<template>
  <NuxtLink
    to="/checkout/payment"
    aria-current-value="step"
  >支付</NuxtLink>
</template>
```

指向 `public/` 目录中文件的链接，或指向同一源上的另一个应用的链接，都不是 Vue Router 所了解的路由。将它们标记为 [`external`](/docs/4.x/api/components/nuxt-link#handling-static-file-and-cross-app-links)，这样浏览器就会执行真正的导航，而不是因无法匹配路由而失败。

:read-more{title="NuxtLink" to="/docs/4.x/api/components/nuxt-link"}

## 焦点管理

在客户端导航之后，焦点会停留在原来的位置，通常就是用户刚刚激活的那个链接。Vue Router 不会移动它，Nuxt 也不会，所以键盘用户可能需要再次把整个页眉都按一遍 Tab，才能到达刚刚变化的内容。

将跳过链接作为应用中的第一个 Tab 停止点是一种常规修复方式，而且它在首次页面加载时也有帮助：

```vue [app.vue]
<template>
  <a
    class="skip-link"
    href="#main"
  >跳转到主内容</a>
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

`<main>` 本身不能获得焦点，因此它需要 `tabindex="-1"`，这样才能从跳过链接或脚本中接受焦点。请使用 `-1`，而不是正值，因为正值会改变元素在 Tab 顺序中的位置，并让其他人感到意外。

如果适合你的应用，你还可以更进一步，通过一个插件在每次导航后将焦点移动到主区域：

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
仅使用键盘在你的应用中到处导航。经过几次导航后，从跳过链接 Tab 到 `<main>`，可以很快暴露出大多数焦点问题。
::

## 滚动行为

Nuxt 在新路由时会滚动到顶部，在用户返回时恢复之前的位置，并滚动到 hash 目标。如果你需要不同的行为，例如平滑滚动或不同的偏移量，请配置 [`scrollBehaviorType`](/docs/4.x/guide/recipes/custom-routing#scroll-behavior-for-hash-links) 或在 [`router.options.ts`](/docs/4.x/guide/recipes/custom-routing#router-options) 中编写你自己的 `scrollBehavior`。请记住，平滑滚动应尊重用户的 `prefers-reduced-motion` 设置。

:read-more{title="自定义路由" to="/docs/4.x/guide/recipes/custom-routing"}

## 有用资源

- [Web 无障碍倡议（WAI）](https://www.w3.org/WAI/)
- [MDN：无障碍](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [理解 WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
