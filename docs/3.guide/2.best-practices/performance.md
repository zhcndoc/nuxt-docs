---
navigation.title: 'Nuxt 性能'
title: Nuxt 性能
description: 提升 Nuxt 应用性能的最佳实践。
---

Nuxt 提供了内置功能来提升你的应用性能并有助于改善 [Core Web Vitals](https://web.dev/articles/vitals)。此外，Nuxt 团队也维护了多个核心模块，用于在特定领域进一步提升性能。本指南概述了优化 Nuxt 应用性能的最佳实践。

## 内置功能

Nuxt 提供了若干内置功能，帮助你优化网站性能。理解这些功能的工作方式对于实现极快的性能至关重要。

### 链接

[`<NuxtLink>`](/docs/4.x/api/components/nuxt-link) 是对 Vue Router 的 `<RouterLink>` 组件和 HTML `<a>` 标签的替换组件。它会智能判断链接是内部链接还是外部链接，并据此使用可用的优化（预取、默认属性等）渲染。

```html
<template>
  <NuxtLink to="/about">About page</NuxtLink>
</template>

<!-- Which will render to with Vue Router & Smart Prefetching -->
<a href="/about">About page</a>
```

Nuxt 会自动包含智能预取。这意味着它会检测链接何时可见（默认情况下），无论是在视口内还是在滚动时，并预取那些页面的 JavaScript，这样在用户点击链接时页面已经准备就绪。

你也可以选择在交互时进行预取：

```ts
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: 'interaction',
      },
    },
  },
})
```

:read-more{title="NuxtLink" to="/docs/4.x/api/components/nuxt-link"}

### 混合渲染

在更复杂的应用中，我们可能需要对应用的渲染方式进行完全控制，以支持某些页面在构建时生成，而另一些页面则应在客户端渲染的场景。

混合渲染允许为每个路由使用路由规则设定不同的缓存策略，并决定服务器应如何响应给定 URL 的新请求：

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true,
    },
    '/products/**': {
      swr: 3600,
    },
    '/blog': {
      isr: 3600,
    },
    '/admin/**': {
      ssr: false,
    },
  },
})
```

Nuxt 服务端将自动注册相应的中间件，并使用 Nitro 缓存层将路由包装为带缓存处理程序的路由。

:read-more{title="混合渲染" to="/docs/4.x/guide/concepts/rendering#hybrid-rendering"}

### 懒加载组件

要动态导入组件（也称为懒加载组件），只需在组件名称前添加 Lazy 前缀即可。如果该组件并非始终需要，这会很有用。

```html
<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
</template>
```

通过使用 Lazy 前缀，你可以延迟在合适的时刻加载组件代码，这有助于优化 JavaScript 包的大小。

:read-more{title="懒加载组件" to="/docs/4.x/directory-structure/app/components#dynamic-imports"}

### 延迟水合

并不总是需要在初始加载时对站点的所有组件进行水合（或使其可交互）。使用延迟水合，你可以控制组件何时加载其代码，这可以改善应用的可交互时间（time-to-interactive）。Nuxt 允许你使用延迟水合来控制组件何时变为可交互（在 Nuxt v3.16 中加入）。

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

为了优化应用，你可能希望将某些组件的水合延迟到它们可见时，或浏览器完成更重要任务之后再进行。

:read-more{title="延迟水合" to="/docs/4.x/directory-structure/app/components#delayed-or-lazy-hydration"}

### 数据获取

为避免重复获取相同数据（在服务端和客户端各获取一次），Nuxt 提供了 [`useFetch`](/docs/4.x/api/composables/use-fetch) 和 [`useAsyncData`](/docs/4.x/api/composables/use-async-data)。它们会确保如果在服务端进行了 API 调用，数据会在载荷中转发到客户端，而不是再次被获取。

:read-more{title="数据获取" to="/docs/4.x/getting-started/data-fetching"}

## Nuxt 核心模块

除了 Nuxt 的内置功能外，Nuxt 团队维护的核心模块还能进一步提升性能。这些模块帮助处理图像、自定义字体或第三方脚本等资源。

### 图像

未经优化的图像会对网站性能产生显著负面影响，特别是对 [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) 分数。

在 Nuxt 中我们可以使用 [Nuxt Image](https://image.nuxt.com/) 模块，它是面向 Nuxt 应用的即插即用图像优化方案。它允许使用内置优化器或你喜欢的图像 CDN 来调整大小和转换图像。

:video-accordion{title="观看 LearnVue 关于 Nuxt Image 的视频" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/4.x/api/components/nuxt-img) 是对原生 `<img>` 标签的替代，具备以下增强功能：

* 使用内置提供器优化本地和远程图像
* 将 `src` 转换为提供器优化的 URL，使用现代格式如 WebP 或 Avif
* 根据 `width` 和 `height` 自动调整图像大小
* 在提供 sizes 选项时生成响应式 `sizes`
* 支持原生 `lazy loading` 以及其他 `<img>` 属性

你网站中的图像通常可以按重要性区分；那些需要在初始加载时优先交付（即 `Largest Contentful Paint`）的图像，以及可以稍后或在需要时加载的图像。为此，我们可以使用如下优化：

```html
<template>
  <!-- 🚨 Needs to be loaded ASAP -->
  <NuxtImg
    src="/hero-banner.jpg"
    format="webp"
    :preload="{ fetchPriority: 'high' }"
    loading="eager"
    width="200"
    height="100"
  />

  <!-- 🐌 Can be loaded later -->
  <NuxtImg
    src="/facebook-logo.jpg"
    format="webp"
    loading="lazy"
    fetchpriority="low"
    width="200"
    height="100"
  />
</template>
```

:read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}

### 字体

[Nuxt Fonts](https://fonts.nuxt.com/) 会自动优化你的字体（包括自定义字体）并移除外部网络请求，以提升隐私性和性能。

它包含对任意字体文件的内置自动自托管，这意味着你可以以更优的方式加载网页字体并减少布局偏移，得益于底层包 [fontaine](https://github.com/unjs/fontaine)。

:video-accordion{title="观看 Daniel Roe 关于 Nuxt Fonts 背后理念的演讲" videoId="D3F683UViBY"}

Nuxt Fonts 会处理你的所有 CSS，并在遇到 font-family 声明时自动执行以下操作：

1. 解析字体 – 在 public/ 中寻找字体文件，然后检查 Google、Bunny、Fontshare 等网络提供者。
2. 生成 @font-face 规则 – 注入用于从正确来源加载字体的 CSS 规则。
3. 代理与缓存字体 – 将 URL 重写为 `/_fonts`，下载并在本地缓存字体。
4. 创建回退度量 – 调整本地系统字体以匹配网络字体，减少布局偏移（[CLS](https://web.dev/articles/cls)）。
5. 将字体包含在构建中 – 将字体与项目打包，哈希文件名并设置长期缓存头。

它支持多种提供者，设计为可插拔和可扩展，因此无论你的设置如何，都应该能够使用现有提供者或编写你自己的提供者。

### 脚本

第三方资源如分析工具、视频嵌入、地图和社交媒体集成可以增强网站功能，但也可能显著降低用户体验，并对 [Interaction to Next Paint (INP)](https://web.dev/articles/inp) 和 Largest Contentful Paint (LCP) 分数产生负面影响。

[Nuxt Scripts](https://scripts.nuxt.com/) 让你以更好的性能、隐私、安全性和开发者体验来加载第三方脚本。

:video-accordion{title="观看 Alex Lichter 关于 Nuxt Scripts 的视频" videoId="sjMqUUvH9AE"}

Nuxt Scripts 在第三方脚本之上提供了一个抽象层，提供 SSR 支持和类型安全，同时仍然让你对脚本的加载方式拥有底层控制。

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  {
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// queue events to be sent when ga loads
proxy.gtag('config', 'UA-123456789-1')
// or wait until ga is loaded
onLoaded((gtag) => {
  // script loaded
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## 分析工具

要提升性能，我们首先需要了解如何衡量性能，从在本地开发环境测量性能开始，然后对已部署到生产的应用进行审计。

### Nuxi Analyze

`nuxi` 的 [此命令](/docs/4.x/api/commands/analyze) 允许分析生产包或你的 Nuxt 应用。它利用 `vite-bundle-visualizer`（类似于 `webpack-bundle-analyzer`）生成应用包的可视化表示，使你更容易识别哪些组件占用了最多空间。

当你在可视化中看到一个较大的块时，通常表示存在优化机会——无论是将其拆分为更小的部分、实现懒加载，还是用更高效的替代方案替换，尤其是对于第三方库。

包含多个元素的大块通常可以通过只导入必要组件而不是整个模块来缩小，而大型独立块则更适合通过懒加载而不是包含在主包中。

### Nuxt DevTools

[Nuxt DevTools](https://devtools.nuxt.com/) 为你的 Nuxt 应用提供洞察和透明度，以识别性能差距并无缝管理应用配置。

![Nuxt DevTools 示例](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

它提供了我们可以用来衡量 Nuxt 应用性能的若干功能：
1. 时间线（Timeline） – 跟踪渲染、更新和初始化组件所花费的时间，以识别性能瓶颈。  
2. 资源（Assets） – 显示未经过转换的文件大小（例如图像）。  
3. 渲染树（Render Tree） – 显示 Vue 组件、脚本和样式之间的连接，以优化动态加载。  
4. 检查（Inspect） – 列出 Vue 应用中使用的所有文件及其大小和评估时间。

### Chrome 开发者工具

Chrome 开发者工具提供两个用于衡量性能的有用选项卡：`Performance` 和 `Lighthouse`。

打开 [Performance](https://developer.chrome.com/docs/devtools/performance/overview) 面板时，它会立即显示本地的 **Largest Contentful Paint (LCP)** 和 **Cumulative Layout Shift (CLS)** 分数（良好、需要改进或糟糕）。  

如果你与页面交互，它还会捕获 **Interaction to Next Paint (INP)**，基于你的设备和网络情况给出一套完整的 Core Web Vitals 视图。

![Chrome DevTools Performance Panel](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse) 对性能、无障碍、SEO、渐进式 Web 应用和最佳实践进行审计。它会对你的页面运行测试并生成报告。使用未通过的审计作为改进网站的指南。

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

每个审计都有参考文档，解释为何该审计重要以及如何修复问题。

### PageSpeed Insights

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about) 报告页面在移动端和桌面设备上的用户体验，并提供改进该页面的建议。

它提供页面的实验室数据和现场数据。实验室数据在受控环境中收集，适合调试问题；现场数据用于捕获真实的、真实世界的用户体验。

### Web Page Test

[WebPageTest](https://www.webpagetest.org/) 是一个网页性能工具，提供有关页面在各种条件下表现的深度诊断信息。

每个测试可以从世界不同位置运行，在真实浏览器上，并可覆盖任意数量的可定制网络条件。

## 常见问题

在构建更复杂的 Nuxt 应用时，你可能会遇到下面列出的一些问题。理解这些问题并修复它们将有助于提升你网站的性能。

### 过度使用插件

**问题**：大量插件可能导致性能问题，尤其是当它们需要昂贵的计算或初始化耗时较长时。由于插件在水合阶段运行，低效的设置会阻塞渲染并降低用户体验。

**解决方案**：检查你的插件，看看是否有些可以改为实现为 composable 或工具函数。

### 未使用的代码 / 依赖

**问题**：随着项目的发展，可能会出现一些未使用的代码或依赖。这些额外的功能如果不再使用或不需要，会增加项目的包体积。

**解决方案**：检查你的 `package.json` 以查找未使用的依赖，并分析代码中未使用的工具 / composable / 函数。

### 未使用 Vue 性能建议

**问题**：[Vue 文档](https://vue.zhcndoc.com/guide/best-practices/performance) 列出了一些我们也可以在 Nuxt 项目中使用的性能改进方法，但由于它们属于 Vue 文档的一部分，开发者往往会忘记并只关注 Nuxt 特定的改进——然而 Nuxt 应用本质上仍然是一个 Vue 项目。

**解决方案**：使用诸如 `shallowRef`、`v-memo`、`v-once` 等概念来提升性能。

### 未遵循规范

**问题**：项目中越多的人在同时工作，维护稳定代码库就越困难。开发者倾向于在项目中引入他们在其他项目中见过的新概念，这可能导致冲突并影响性能。

**解决方案**：在项目中建立规则和模式，例如 [Vue Composables 的良好实践和设计模式](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)

### 试图同时加载所有内容

**问题**：当页面加载时，如果没有正确指示元素的加载顺序，可能会导致同时获取所有资源——这会很慢并导致糟糕的用户体验。

**解决方案**：使用渐进增强（Progressive Enhancement）等概念，先加载核心网页内容，然后在浏览器/网络条件允许的情况下逐步添加更细致和更复杂的表现层和功能。

## 有用资源

要了解更多提升性能的各种技术，请查看以下资源：

1. [使用 PRPL 模式实现即时加载](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [感知性能（Perceived performance）](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [理解关键渲染路径（Critical Rendering Path）](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
