---
navigation.title: 'Nuxt 性能'
title: Nuxt 性能
description: 提升 Nuxt 应用性能的最佳实践。
---

Nuxt 内置了旨在提升应用性能并改善 [核心网页指标（Core Web Vitals）](https://web.dev/articles/vitals) 的功能。此外，Nuxt 还提供了多个核心模块，帮助在特定领域提升性能。本文档概述了优化 Nuxt 应用性能的最佳实践。

## 内置功能

Nuxt 提供了多种内置功能，帮助你优化网站性能。理解这些功能的工作原理对于实现极致快速的性能至关重要。

### 链接

[`<NuxtLink>`](/docs/3.x/api/components/nuxt-link) 是 Vue Router 的 `<RouterLink>` 组件和 HTML `<a>` 标签的替代方案。它能智能判断链接是内部还是外部链接，并应用相应的优化（预取、默认属性等）进行渲染。

```html
<template>
  <NuxtLink to="/about">关于页面</NuxtLink>
</template>

<!-- 渲染后通过 Vue Router 和智能预取 -->
<a href="/about">关于页面</a>
```

Nuxt 会自动开启智能预取。这意味着它会在链接可见时（默认情况下）检测到，无论是处于视口内还是滚动时，预先加载相关页面的 JavaScript，使用户点击时立即可用。

你也可以选择交互时预取：

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

:read-more{title="NuxtLink" to="/docs/3.x/api/components/nuxt-link"}

### 混合渲染

对于更复杂的应用，我们可能需要完全控制应用的渲染方式，以支持部分页面在构建时生成，而其他页面则在客户端渲染的情况。

混合渲染允许通过路由规则对不同路由使用不同的缓存策略，并决定服务器如何响应特定 URL 的新请求：

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

Nuxt 服务器会自动注册相应的中间件，并利用 Nitro 缓存层为路由包装缓存处理器。

:read-more{title="混合渲染" to="/docs/guide/concepts/rendering#hybrid-rendering"}

### 组件懒加载

动态导入组件（又称懒加载组件）只需为组件名添加 Lazy 前缀。如果组件不是总需要使用，这种方式非常有用。

```html
<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div>
    <h1>山脉</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">显示列表</button>
  </div>
</template>
```

使用 Lazy 前缀可以延迟加载组件代码，直到真正需要时再加载，这有助于优化 JavaScript 包体积。

:read-more{title="组件懒加载" to="/docs/guide/directory-structure/components#dynamic-imports"}

### 延迟激活（水合）

无需在初始加载时对所有组件进行激活（水合）使其可交互。使用延迟激活，你可以控制何时加载组件代码，从而提升应用的首屏可交互时间。Nuxt 支持延迟激活功能（自 Nuxt v3.16 起）。

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

为了优化你的应用，你可能想延迟部分组件的激活，直到它们可见，或者直到浏览器完成更重要的任务。

:read-more{title="延迟激活（懒水合）" to="/docs/guide/directory-structure/components#delayed-or-lazy-hydration"}

### 获取数据

为避免重复获取数据（服务器端和客户端各获取一次），Nuxt 提供了 [`useFetch`](/docs/3.x/api/composables/use-fetch) 和 [`useAsyncData`](/docs/3.x/api/composables/use-async-data)。它们确保如果 API 请求在服务器端调用，数据会随负载转发到客户端，而不会重复请求。

:read-more{title="数据获取" to="/docs/getting-started/data-fetching"}

## Nuxt 核心模块

除了 Nuxt 的内置功能，Nuxt 官方维护的核心模块也能进一步提升性能。这些模块能够优化处理图片、自定义字体或第三方脚本等资产。

### 图片

未优化的图片会严重影响网站性能，尤其是 [最大内容绘制时间（Largest Contentful Paint, LCP）](https://web.dev/articles/lcp) 。

Nuxt 提供了 [Nuxt Image](https://image.nuxt.com/) 模块，是 Nuxt 应用的开箱即用的图片优化解决方案。它允许通过内置优化器或你喜欢的图片 CDN 调整图片大小和进行转换。

:video-accordion{title="观看 LearnVue 关于 Nuxt Image 的视频" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/3.x/api/components/nuxt-img) 是对原生 `<img>` 标签的替代，带有如下增强功能：

* 支持内置提供者优化本地和远程图片
* 将 `src` 转换为优化后的提供者 URL，支持现代格式如 WebP 或 Avif
* 自动根据 `width` 和 `height` 调整图片大小
* 提供 `sizes` 选项时生成响应式尺寸
* 支持原生懒加载和其他 `<img>` 属性

网站中的图片通常可按重要性区分；首屏优先加载（例如影响最大内容绘制时间的图片），以及次要或按需加载的图片。针对这一点，可以使用如下优化：

```html
<template>
  <!-- 🚨 需尽快加载 -->
  <NuxtImg
    src="/hero-banner.jpg"
    format="webp"
    preload
    loading="eager"
    fetch-priority="high"
    width="200"
    height="100"
  />

  <!-- 🐌 可延迟加载 -->
  <NuxtImg
    src="/facebook-logo.jpg"
    format="webp"
    loading="lazy"
    fetch-priority="low"
    width="200"
    height="100"
  />
</template>
```

:read-more{title="Nuxt Image" to="https://image.nuxt.com/usage/nuxt-img"}

### 字体

[Nuxt Fonts](https://fonts.nuxt.com/) 会自动优化你的字体（包括自定义字体），并移除外部网络请求，提高隐私和性能。

它内置了自动自托管字体文件功能，可以更优地加载 Web 字体，减少布局抖动，得益于底层库 [fontaine](https://github.com/unjs/fontaine)。

:video-accordion{title="观看 Daniel Roe 讲解 Nuxt Fonts 背后理念的视频" videoId="D3F683UViBY"}

Nuxt Fonts 会处理所有 CSS，并在遇到 font-family 声明时自动做以下操作：

1. **解析字体** — 优先查找 public/ 下的字体文件，然后检查如 Google、Bunny 和 Fontshare 等网络提供者。
2. **生成 @font-face 规则** — 注入 CSS 规则以从正确的来源加载字体。
3. **代理与缓存字体** — 重写 URL 到 `/_fonts`，并将字体下载到本地缓存。
4. **创建回退指标** — 调整本地系统字体以匹配 Web 字体，减少布局抖动 （[CLS](https://web.dev/articles/cls)）。
5. **将字体纳入构建** — 将字体捆绑进项目，生成带哈希的文件名并设置长效缓存头。

它支持多种提供者，设计为可插拔和扩展，因此无论你的方案如何，都能使用现有提供者或自定义开发。

### 脚本

第三方资源如分析工具、视频嵌入、地图以及社交媒体整合，虽然提升了网站功能，但可能会显著降低用户体验并对 [交互到下一次绘制（INP）](https://web.dev/articles/inp) 和最大内容绘制时间（LCP）造成负面影响。

[Nuxt Scripts](https://scripts.nuxt.com/) 让你以更高性能、更好隐私、更安全且更佳开发体验的方式加载第三方脚本。

:video-accordion{title="观看 Alex Lichter 关于 Nuxt Scripts 的讲解视频" videoId="sjMqUUvH9AE"}

Nuxt Scripts 在第三方脚本之上提供抽象层，支持服务端渲染和类型安全，同时仍允许你对脚本加载方式进行完全底层控制。

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  {
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// 在 GA 加载完成前将事件排队
proxy.gtag('config', 'UA-123456789-1')
// 或者等待 GA 加载完成后执行
onLoaded((gtag) => {
  // 脚本已加载
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## 性能分析工具

要提升性能，首先需要知道如何衡量性能，先在开发环境测量，再在生产环境审计。

### Nuxi Analyze

[`nuxi`](/docs/3.x/api/commands/analyze) 的该命令允许你分析生产环境的打包文件或 Nuxt 应用。它利用 `vite-bundle-visualizer`（类似 `webpack-bundle-analyzer`）生成应用包的视觉化表示，更易识别占用空间最大的组件。

当可视化图中出现大块时，通常意味着优化机会 —— 可以将它拆分为更小部分，实现懒加载，或使用更高效替代方案（尤其是第三方库）。

包含多个元素的大块通常可通过按需导入组件替代整体模块来缩减，而体积庞大的独立块则更适合做懒加载而非打包入主包。

### Nuxt DevTools

[Nuxt DevTools](https://devtools.nuxt.com/) 为你提供 Nuxt 应用的透明性和洞察，帮助定位性能瓶颈并无缝管理应用配置。

![Nuxt DevTools 示例](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

它提供以下可用功能来测量 Nuxt 应用的性能：
1. **时间线** — 跟踪渲染、更新和组件初始化时间，识别性能瓶颈。  
2. **资源** — 显示未转换的文件大小（如图片）。  
3. **渲染树** — 展示 Vue 组件、脚本和样式的依赖与关系，优化动态加载。  
4. **检查** — 列出应用中所有文件及其大小和执行时间。

### Chrome DevTools

Chrome DevTools 有两个用于测量性能的标签页：`Performance` 和 `Lighthouse`。

打开 [Performance](https://developer.chrome.com/docs/devtools/performance/overview) 面板时，会立刻显示本地的 **最大内容绘制时间（LCP）** 和 **累计布局偏移（CLS）** 分数（良好、需改进或差）。

当你与页面交互时，还会捕获 **交互到下一次绘制（INP）**，让你基于设备和网络情况完整查看核心网页指标。

![Chrome DevTools Performance 面板](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse) 审计性能、无障碍性、SEO、渐进式 Web 应用及最佳实践。它会对页面运行测试并生成报告，根据未通过的审计项优化网站。

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

每个审计都有参考文档，解释其重要性及修复方法。

### PageSpeed Insights

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about) 报告页面在移动端和桌面端的用户体验，并提供改进建议。

它同时提供实验室数据和现场数据。实验室数据有助于调试，因其收集于受控环境；现场数据则反映真实用户体验。

### Web Page Test

[WebPageTest](https://www.webpagetest.org/) 是一款网页性能工具，提供页面在多种条件下的深度诊断信息。

每项测试均可从全球不同地点，使用真实浏览器，并在任意自定义网络条件下执行。

## 常见问题

构建更复杂的 Nuxt 应用时，你可能会遇到以下问题。理解这些问题并加以解决有助于提升网站性能。

### 过度使用插件

**问题**：大量插件会导致性能问题，尤其是插件含有高计算开销或初始化时间过长。由于插件在水合阶段执行，低效的插件会阻塞渲染，影响用户体验。

**解决方案**：检查插件，看看是否可以将部分功能改用组合式函数或工具函数实现。

### 未使用的代码 / 依赖

**问题**：随着项目发展，可能会有未使用的代码或依赖。这些额外功能未被使用，却增加了包体积。

**解决方案**：检查 `package.json` 中的未用依赖，分析代码中未用的工具函数/组合式函数。

### 未利用 Vue 性能技巧

**问题**：[Vue 文档](https://vuejs.org/guide/best-practices/performance) 中列举了多种性能提升技巧，但作为 Vue 项目，开发者往往只关注 Nuxt 相关改进，而忽视 Vue 层面的优化。

**解决方案**：使用如 `shallowRef`、`v-memo`、`v-once` 等概念提升性能。

### 不遵守统一规范

**问题**：项目成员越多，维护稳定代码库越困难。开发者倾向引入自己在其他项目见过的新概念，可能造成冲突和性能问题。

**解决方案**：在项目中建立规范和模式，如 [Vue 组合式函数的最佳实践和设计模式](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)

### 试图一次性加载所有内容

**问题**：页面加载时若未合理指定元素加载顺序，会导致所有内容同时请求，加载缓慢，造成用户体验下降。

**解决方案**：采用渐进增强（Progressive Enhancement）策略，先加载核心网页内容，再根据浏览器和网络状况逐步加载更复杂的表现层和功能。

## 有用资源

想了解更多性能优化技巧，请参考以下资源：

1. [使用 PRPL 模式实现即时加载](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [感知性能](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [理解关键渲染路径（Critical Rendering Path）](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)