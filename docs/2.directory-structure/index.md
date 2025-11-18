---
title: 'Nuxt 目录结构'
description: '了解 Nuxt 应用程序的目录结构及其使用方法。'
navigation: false
---

Nuxt 应用程序有一个特定的目录结构，用于组织代码。该结构设计得易于理解且保持一致的使用方式。

## 根目录

Nuxt 应用程序的根目录是包含 `nuxt.config.ts` 文件的目录。该文件用于配置 Nuxt 应用程序。

### 应用目录及文件

以下目录与通用的 Nuxt 应用程序相关：
- [`assets/`](/docs/3.x/directory-structure/assets)：网站的资源文件，构建工具（Vite 或 webpack）将会处理这些资源
- [`components/`](/docs/3.x/directory-structure/components)：应用的 Vue 组件
- [`composables/`](/docs/3.x/directory-structure/composables)：添加您的 Vue 组合函数
- [`layouts/`](/docs/3.x/directory-structure/layouts)：包裹页面的 Vue 组件，避免页面之间重复渲染
- [`middleware/`](/docs/3.x/directory-structure/middleware)：在导航到特定路由之前运行代码
- [`pages/`](/docs/3.x/directory-structure/pages)：基于文件的路由，用于创建 Web 应用内的路由
- [`plugins/`](/docs/3.x/directory-structure/plugins)：在 Nuxt 应用创建时使用 Vue 插件及其他功能
- [`utils/`](/docs/3.x/directory-structure/utils)：添加可在组件、组合函数及页面中使用的工具函数

该目录还包含特定文件：
- [`app.config.ts`](/docs/3.x/directory-structure/app-config)：应用内的响应式配置
- [`app.vue`](/docs/3.x/directory-structure/app)：Nuxt 应用的根组件
- [`error.vue`](/docs/3.x/directory-structure/error)：Nuxt 应用的错误页面

### 服务器目录

[`server/`](/docs/3.x/directory-structure/server) 目录包含 Nuxt 应用的服务器端代码。该目录包含以下子目录：
- [`api/`](/docs/3.x/directory-structure/server#server-routes)：应用的 API 路由
- [`routes/`](/docs/3.x/directory-structure/server#server-routes)：应用的服务器路由（例如动态的 `/sitemap.xml`）
- [`middleware/`](/docs/3.x/directory-structure/server#server-middleware)：在处理服务器路由前运行代码
- [`plugins/`](/docs/3.x/directory-structure/server#server-plugins)：在 Nuxt 服务器创建时使用插件及更多功能
- [`utils/`](/docs/3.x/directory-structure/server#server-utilities)：添加可在服务器端代码中使用的工具函数

## 公共目录

[`public/`](/docs/3.x/directory-structure/public) 目录包含 Nuxt 应用的公共文件。此目录内的文件在根路径下提供服务，并且不会被构建过程修改。

适合放置需要保持文件名不变（例如 `robots.txt`）或不太可能变化的文件（例如 `favicon.ico`）。

## 共享目录

[`shared/`](/docs/3.x/directory-structure/shared) 目录包含 Nuxt 应用和 Nuxt 服务器共享的代码。这些代码可在 Vue 应用和 Nitro 服务器中使用。

## 内容目录

[`content/`](/docs/3.x/directory-structure/content) 目录由 [Nuxt Content](https://content.nuxt.com) 模块启用，用于通过 Markdown 文件创建基于文件的 CMS。

## 模块目录

[`modules/`](/docs/3.x/directory-structure/modules) 目录包含 Nuxt 应用的本地模块。模块用于扩展 Nuxt 应用的功能。

## Nuxt 文件

- [`nuxt.config.ts`](/docs/3.x/directory-structure/nuxt-config) 文件是 Nuxt 应用的主配置文件。
- [`.nuxtrc`](/docs/3.x/directory-structure/nuxtrc) 文件是另一种配置 Nuxt 应用的语法（适用于全局配置）。
- [`.nuxtignore`](/docs/3.x/directory-structure/nuxtignore) 文件用于在构建阶段忽略根目录中的文件。