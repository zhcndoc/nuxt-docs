---
navigation.title: 'Nuxt 性能'
title: Nuxt 性能
description: 提升 Nuxt 应用性能的最佳实践。
---

Nuxt 内置了多项功能，旨在提升应用性能并优化 [核心网页指标（Core Web Vitals）](https://web.dev/articles/vitals)。此外，还有多个 Nuxt 核心模块专注于特定方面的性能提升。本指南概述了优化 Nuxt 应用性能的最佳实践。

## 内置功能

Nuxt 提供了若干内置功能，帮助你优化网站性能。理解这些功能的工作原理，对于实现极速性能至关重要。

### 链接

[`<NuxtLink>`](/docs/api/components/nuxt-link) 是 Vue Router 的 `<RouterLink>` 组件和 HTML `<a>` 标签的替代品。它智能判断链接是内部链接还是外部链接，并根据情况进行渲染，利用可用的优化（预获取、默认属性等）。

```html
<template>
  <NuxtLink to="/about">关于页面</NuxtLink>
</template>

<!-- Vue Router 和智能预获取渲染为 -->
<a href="/about">关于页面</a>
```

Nuxt 会自动启用智能预获取。这意味着当链接可见（默认情况）时，比如在视口内或滚动时，会预先获取对应页面的 JavaScript，确保用户点击时页面能够快速响应。

你也可以选择互动时进行预获取：

```ts
export default defineNuxtConfig({
  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: 'interaction',
      },
    }
  }
})
```

:read-more{title="NuxtLink" to="/docs/api/components/nuxt-link"}

### 混合渲染

对于更复杂的应用，有时需要对应用的渲染方式进行完全控制，以支持部分页面在构建时生成，其他页面则客户端渲染的场景。

混合渲染允许针对不同路由使用路由规则设置不同的缓存策略，并决定服务器如何响应对特定 URL 的请求：

```ts
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true
    },
    '/products/**': {
      swr: 3600
    },
    '/blog': {
      isr: 3600
    },
    '/admin/**': {
      ssr: false
    },
  }
})
```

Nuxt 服务器将自动注册相应中间件，并利用 Nitro 缓存层为路由包裹缓存处理程序。

:read-more{title="混合渲染" to="/docs/guide/concepts/rendering#hybrid-rendering"}

### 懒加载组件

要动态导入组件（即懒加载组件），只需给组件名添加 `Lazy` 前缀。这在组件并非始终需要时非常有用。

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

使用 `Lazy` 前缀可以推迟组件代码的加载时机，有助于优化 JavaScript 包体积。

:read-more{title="懒加载组件" to="/docs/guide/directory-structure/app/components#dynamic-imports"}

### 延迟水合

并非所有组件都需要在初始加载时水合（使其交互）。使用延迟水合，你可以控制组件代码的加载时机，从而提升应用的交互时间指标。Nuxt 允许通过延迟水合控制组件何时变为交互式（该功能新增于 Nuxt v3.16）。

```html
<template>
  <div>
    <LazyMyComponent hydrate-on-visible />
  </div>
</template>
```

为优化应用，你可能希望延迟部分组件的水合，直到它们进入视口或浏览器完成更重要任务时。

:read-more{title="延迟水合" to="/docs/guide/directory-structure/app/components#delayed-or-lazy-hydration"}

### 数据获取

为了避免重复获取相同数据（一次在服务器，一次在客户端），Nuxt 提供了 [`useFetch`](/docs/api/composables/use-fetch) 和 [`useAsyncData`](/docs/api/composables/use-async-data)。它们确保如果 API 在服务器端调用，数据会随负载转发到客户端，避免再次请求。

:read-more{title="数据获取" to="/docs/getting-started/data-fetching"}

## Nuxt 核心模块

除 Nuxt 内置功能外，Nuxt 团队维护的核心模块进一步提升性能。这些模块帮助处理图像、自定义字体或第三方脚本等资源。

### 图像

未优化的图像会显著影响网站性能，尤其是 [最大内容绘制（Largest Contentful Paint, LCP）](https://web.dev/articles/lcp) 指标。

Nuxt 提供了 [Nuxt Image](https://image.nuxt.com/) 模块，它是 Nuxt 应用的开箱即用图像优化方案，支持内置优化器或你喜欢的图像 CDN 进行图片尺寸调整和转换。

:video-accordion{title="观看 LearnVue 关于 Nuxt Image 的视频" videoId="_UBff2eqGY0"}

[`<NuxtImg>`](/docs/api/components/nuxt-img) 是对原生 `<img>` 标签的替代，具备以下增强功能：

* 使用内置的提供者优化本地和远程图像
* 将 `src` 转换为优化后的提供者 URL，支持现代格式如 WebP 或 Avif
* 根据 `width` 和 `height` 自动调整图像大小
* 提供响应式 `sizes` 选项时自动生成
* 支持原生懒加载及其他 `<img>` 属性

通常，网站中的图像可分为重要图片（需在初始加载时优先交付，影响 `Largest Contentful Paint`）和可延迟或按需加载的图片。针对这两类图像，可以采用如下优化：

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

  <!-- 🐌 可稍候加载 -->
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

[Nuxt Fonts](https://fonts.nuxt.com/) 会自动优化你的字体（包括自定义字体），并移除外部网络请求，提升隐私和性能。

它内置自动自托管字体文件功能，依赖底层库 [fontaine](https://github.com/unjs/fontaine)，可优化加载网页字体并减少布局偏移。

:video-accordion{title="观看 Daniel Roe 关于 Nuxt Fonts 背后理念的演讲" videoId="D3F683UViBY"}

Nuxt Fonts 会处理所有 CSS，自动完成以下操作：

1. **解析字体** — 先查找 public/ 目录，再查询 Google、Bunny、Fontshare 等网络字体提供商。
2. **生成 `@font-face` 规则** — 注入正确来源的 CSS 规则加载字体。
3. **代理和缓存字体** — 重写为 `/_fonts` 路径，将字体下载并本地缓存。
4. **创建回退度量** — 调整本地系统字体以匹配网页字体，减少布局偏移（[CLS](https://web.dev/articles/cls)）。
5. **将字体包含进构建** — 随项目打包字体，文件名加哈希并设定长效缓存头。

它支持多种可插拔和可扩展的字体提供商，无论你的配置如何，都能使用已有的提供商或自行编写。

### 脚本

第三方资源如分析工具、视频嵌入、地图和社交媒体集成功能虽提升网站功能，但可能显著降低用户体验，进而影响 [下次交互绘制时间（INP）](https://web.dev/articles/inp) 和最大内容绘制（LCP）指标。

[Nuxt Scripts](https://scripts.nuxt.com/) 让你以更优性能、隐私、安全性和开发体验加载第三方脚本。

:video-accordion{title="观看 Alex Lichter 关于 Nuxt Scripts 的视频" videoId="sjMqUUvH9AE"}

Nuxt Scripts 对第三方脚本提供抽象层，支持 SSR 和类型安全，同时允许你完全控制脚本加载方式。

```ts
const { onLoaded, proxy } = useScriptGoogleAnalytics(
  { 
    id: 'G-1234567',
    scriptOptions: {
      trigger: 'manual',
    },
  },
)
// 在 ga 加载前排队事件
proxy.gtag('config', 'UA-123456789-1')
// 或等待 ga 加载完成
onLoaded((gtag) => {
  // 脚本加载完成
})
```

:read-more{title="Nuxt Scripts" to="https://scripts.nuxt.com/scripts"}

## 性能分析工具

提升性能前，需要先了解如何测量性能，先在开发环境中度量，然后再审核生产环境中部署的应用。

### Nuxi Analyze

`nuxi` 的[此命令](/docs/api/commands/analyze)可分析生产包或 Nuxt 应用。它基于 `vite-bundle-visualizer`（类似于 `webpack-bundle-analyzer`）生成视觉化报表，方便识别占用空间较大的组件。

可视化中出现大块内容，通常意味着优化机会，例如拆分成更小部分、实现懒加载或替换更高效的方案，尤其针对第三方库。

包含多个元素的大块内容多数可通过仅导入必要组件替代导入整个模块来减少，而大型独立模块适合懒加载，避免放入主包。

### Nuxt DevTools

[Nuxt DevTools](https://devtools.nuxt.com/) 提供 Nuxt 应用洞察和透明度，帮助识别性能瓶颈并无缝管理应用配置。

![Nuxt DevTools 示例](https://user-images.githubusercontent.com/11247099/217670806-fb39aeff-3881-44e5-b9c8-6c757f5925fc.png)

其主要功能包括：
1. **时间线** — 跟踪组件渲染、更新和初始化的时间，定位性能瓶颈。
2. **资源** — 显示文件大小（如图像）未经过转换的情况。
3. **渲染树** — 展示 Vue 组件、脚本和样式之间的关联，优化动态加载。
4. **检查** — 列出 Vue 应用中使用的所有文件及其大小和执行时间。

### Chrome DevTools

Chrome DevTools 内置两个测量性能的有用标签页：`Performance` 和 `Lighthouse`。

打开 [Performance](https://developer.chrome.com/docs/devtools/performance/overview) 面板时，会即时显示本地的 **最大内容绘制（LCP）** 和 **累计布局偏移（CLS）** 分数（优良、需改进或较差）。

你与页面交互时，还会捕获 **下次交互绘制（INP）**，基于设备和网络全方位展示核心网页指标。

![Chrome DevTools Performance 面板](https://developer.chrome.com/static/docs/devtools/performance/image/cpu-throttling_856.png)

[Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse) 可审核性能、可访问性、SEO、渐进式网页应用及最佳实践，运行测试生成报告，失败项作为网站改进指南。

![Lighthouse](https://developer.chrome.com/static/docs/lighthouse/images/lighthouse-overview_720.png)

每项审核都有参考文档，解释审核重点并提供修复方法。

### PageSpeed Insights

[PageSpeed Insights (PSI)](https://developers.google.com/speed/docs/insights/v5/about) 报告页面在移动端和桌面端的用户体验，同时给出改进建议。

它提供了实验室数据和真实环境数据两种数据。实验室数据在受控环境中采集，用于调试问题；真实环境数据可捕捉用户的真实体验。

### Web Page Test

[WebPageTest](https://www.webpagetest.org/) 是一款网页性能测试工具，提供详细的诊断信息，检测页面在各种条件下的性能表现。

测试可从全球不同位置进行，采用真实浏览器，并根据多种可自定义网络条件执行。

## 常见问题

构建更复杂的 Nuxt 应用时，可能会遇到以下问题。理解并解决它们，有助于提升你的网站性能。

### 过度使用插件

**问题**：大量插件可能导致性能问题，尤其是需要大量计算或初始化耗时的插件。插件在水合阶段运行，低效的配置会阻塞渲染，影响用户体验。

**解决方案**：检查插件，看看是否能将部分功能用 composable 或工具函数实现。

### 未使用的代码/依赖

**问题**：项目开发过程中可能存在未使用的代码或依赖。这些额外功能未被使用，却会增加项目打包体积。

**解决方案**：检查 `package.json` 是否有未用依赖，并分析代码清理未用的工具函数和 composable。

### 不使用 Vue 性能技巧

**问题**：[Vue 官方文档](https://vuejs.org/guide/best-practices/performance)列出了若干性能提升方法，这些同样适用于 Nuxt 项目。但由于是 Vue 文档，开发者往往忽视，专注 Nuxt 特有优化，而 Nuxt 应用仍是 Vue 项目。

**解决方案**：使用诸如 `shallowRef`、`v-memo`、`v-once` 等技巧提升性能。

### 不遵循规范和模式

**问题**：团队成员多时，维持代码稳定性更难。开发者倾向引入其在其他项目见过的新思想，可能导致冲突和性能问题。

**解决方案**：在项目中建立规则和模式，如 [Vue composable 的最佳实践与设计模式](https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk)。

### 不合理同时加载所有内容

**问题**：页面加载时，如果未明确指定资源加载顺序，可能导致所有内容同时请求，速度变慢，用户体验变差。

**解决方案**：采用渐进增强（Progressive Enhancement）策略，先加载核心网页内容，再按浏览器和网络条件逐渐加载其他高级表现和功能。

## 有用资源

想了解更多提升性能的技术，请参考以下资源：

1. [应用 PRPL 模式实现即时加载](https://web.dev/articles/apply-instant-loading-with-prpl)
2. [感知性能（Perceived performance）](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance)
3. [理解关键渲染路径（Critical Rendering Path）](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)
