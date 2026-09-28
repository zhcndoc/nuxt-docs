---
title: 'Nuxt 目录结构'
description: '了解 Nuxt 应用程序的目录结构及其使用方法。'
navigation: false
---

Nuxt 应用程序有一个特定的目录结构，用于组织代码。该结构设计得易于理解且保持一致的使用方式。

## 根目录

Nuxt 应用程序的根目录是包含 `nuxt.config.ts` 文件的目录。该文件用于配置 Nuxt 应用程序。

## 应用目录及文件

以下目录与通用 Nuxt 应用程序相关：
- [`assets/`](/docs/directory-structure/assets)：网站的资源文件，由构建工具（Vite 或 webpack）处理
- [`components/`](/docs/directory-structure/components)：应用程序的 Vue 组件
- [`composables/`](/docs/directory-structure/composables)：添加 Vue 组合式函数
- [`layouts/`](/docs/directory-structure/layouts)：包裹页面并避免页面切换时重新渲染的 Vue 组件
- [`middleware/`](/docs/directory-structure/middleware)：在导航到特定路由之前运行代码
- [`pages/`](/docs/directory-structure/pages)：通过基于文件的路由在 Web 应用程序中创建路由
- [`plugins/`](/docs/directory-structure/plugins)：在创建 Nuxt 应用程序时使用 Vue 插件等
- [`utils/`](/docs/directory-structure/utils)：添加可在组件、组合式函数和页面中使用的应用程序通用函数

此目录还包含特定文件：
- [`app.config.ts`](/docs/directory-structure/app-config)：应用程序中的响应式配置
- [`app.vue`](/docs/directory-structure/app)：Nuxt 应用程序的根组件
- [`error.vue`](/docs/directory-structure/error)：Nuxt 应用程序的错误页面

## 服务器目录

[`public/`](/docs/directory-structure/public) 目录包含 Nuxt 应用程序的公共文件。此目录中的文件在根路径下提供服务，且不会被构建过程修改。

## 公共目录

[`public/`](/docs/3.x/directory-structure/public) 目录包含 Nuxt 应用的公共文件。此目录内的文件在根路径下提供服务，并且不会被构建过程修改。

[`server/`](/docs/directory-structure/server) 目录包含 Nuxt 应用程序的服务器端代码。它包含以下子目录：
- [`api/`](/docs/directory-structure/server#server-routes)：包含应用程序的 API 路由
- [`routes/`](/docs/directory-structure/server#server-routes)：包含应用程序的服务器路由（例如，动态 `/sitemap.xml`）
- [`middleware/`](/docs/directory-structure/server#server-middleware)：在处理服务器路由之前运行代码
- [`plugins/`](/docs/directory-structure/server#server-plugins)：在创建 Nuxt 服务器时使用插件等
- [`utils/`](/docs/directory-structure/server#server-utilities)：添加可在服务器代码中使用的应用程序通用函数

## 共享目录

[`shared/`](/docs/directory-structure/shared) 目录包含 Nuxt 应用程序和 Nuxt 服务器的共享代码。这些代码既可用于 Vue 应用，也可用于 Nitro 服务器。

## 内容目录

[`content/`](/docs/directory-structure/content) 目录由 [Nuxt Content](https://content.nuxt.com) 模块启用。它用于使用 Markdown 文件为应用程序创建基于文件的 CMS。

## 模块目录

[`modules/`](/docs/directory-structure/modules) 目录包含 Nuxt 应用程序的本地模块。模块用于扩展 Nuxt 应用程序的功能。

## Layers 目录

[`layers/`](/docs/directory-structure/layers) 目录可用于组织和共享可复用的代码、组件、组合式函数和配置。此目录中的 Layers 会在项目中自动注册。

## Nuxt 文件

- [`nuxt.config.ts`](/docs/directory-structure/nuxt-config) 文件是 Nuxt 应用程序的主要配置文件。
- [`.nuxtrc`](/docs/directory-structure/nuxtrc) 文件是配置 Nuxt 应用程序的另一种语法（适用于全局配置）。
- [`.nuxtignore`](/docs/directory-structure/nuxtignore) 文件用于在构建阶段忽略根目录中的文件。
