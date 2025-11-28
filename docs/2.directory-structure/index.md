---
title: 'Nuxt 目录结构'
description: '了解 Nuxt 应用程序的目录结构及其使用方法。'
navigation: false
---

Nuxt 应用程序具有特定的目录结构，用于组织代码。该结构设计为易于理解且使用方式统一。

## 根目录

Nuxt 应用程序的根目录是包含 `nuxt.config.ts` 文件的目录。此文件用于配置 Nuxt 应用程序。

## 应用目录

`app/` 目录是 Nuxt 应用程序的主目录。它包含以下子目录：
- [`assets/`](/docs/4.x/directory-structure/app/assets)：网站的资源，构建工具（Vite 或 webpack）将处理这些资源
- [`components/`](/docs/4.x/directory-structure/app/components)：应用程序的 Vue 组件
- [`composables/`](/docs/4.x/directory-structure/app/composables)：添加 Vue 组合函数
- [`layouts/`](/docs/4.x/directory-structure/app/layouts)：Vue 组件，用于包裹页面并避免页面之间的重复渲染
- [`middleware/`](/docs/4.x/directory-structure/app/middleware)：在导航至特定路由前运行代码
- [`pages/`](/docs/4.x/directory-structure/app/pages)：基于文件的路由，用于在 Web 应用程序中创建路由
- [`plugins/`](/docs/4.x/directory-structure/app/plugins)：在 Nuxt 应用创建时使用 Vue 插件及更多
- [`utils/`](/docs/4.x/directory-structure/app/utils)：添加可以在组件、组合函数和页面中使用的工具函数

该目录还包括特定文件：
- [`app.config.ts`](/docs/4.x/directory-structure/app/app-config)：应用内的响应式配置
- [`app.vue`](/docs/4.x/directory-structure/app/app)：Nuxt 应用的根组件
- [`error.vue`](/docs/4.x/directory-structure/app/error)：Nuxt 应用的错误页面

## 公共目录

[`public/`](/docs/4.x/directory-structure/public) 目录包含 Nuxt 应用的公共文件。该目录中的文件会作为根路径直接提供，不会被构建过程修改。

适用于必须保持文件名不变（例如 `robots.txt`）或内容不常变化（例如 `favicon.ico`）的文件。

## 服务器目录

[`server/`](/docs/4.x/directory-structure/server) 目录包含 Nuxt 应用的服务端代码。它包括以下子目录：
- [`api/`](/docs/4.x/directory-structure/server#server-routes)：包含应用的 API 路由
- [`routes/`](/docs/4.x/directory-structure/server#server-routes)：包含应用的服务器路由（例如动态的 `/sitemap.xml`）
- [`middleware/`](/docs/4.x/directory-structure/server#server-middleware)：在处理服务器路由前运行代码
- [`plugins/`](/docs/4.x/directory-structure/server#server-plugins)：在 Nuxt 服务器创建时使用插件等
- [`utils/`](/docs/4.x/directory-structure/server#server-utilities)：在服务器代码中可用的工具函数

## 共享目录

[`shared/`](/docs/4.x/directory-structure/shared) 目录包含 Nuxt 应用和 Nuxt 服务器共享的代码。这些代码既可用于 Vue 应用，也可用于 Nitro 服务器。

## 内容目录

[`content/`](/docs/4.x/directory-structure/content) 目录由 [Nuxt Content](https://content.nuxt.com) 模块启用，用于通过 Markdown 文件创建基于文件的内容管理系统（CMS）。

## 模块目录

[`modules/`](/docs/4.x/directory-structure/modules) 目录包含 Nuxt 应用的本地模块。模块用于扩展 Nuxt 应用的功能。

## Nuxt 文件

- [`nuxt.config.ts`](/docs/4.x/directory-structure/nuxt-config) 是 Nuxt 应用的主配置文件。
- [`.nuxtrc`](/docs/4.x/directory-structure/nuxtrc) 文件是另一种配置 Nuxt 应用的语法（适用于全局配置）。
- [`.nuxtignore`](/docs/4.x/directory-structure/nuxtignore) 文件用于在构建阶段忽略根目录中的文件。