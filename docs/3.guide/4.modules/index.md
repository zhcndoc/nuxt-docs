---
title: '模块作者指南'
titleTemplate: '%s'
description: '学习如何创建一个 Nuxt 模块，以集成、增强或扩展任何 Nuxt 应用程序。'
navigation: false
surround: false
---

Nuxt 的 [配置](/docs/3.x/api/nuxt-config) 和 [钩子](/docs/3.x/guide/going-further/hooks) 系统使得定制 Nuxt 的各个方面成为可能，并可添加任何你可能需要的集成（Vue 插件、CMS、服务器路由、组件、日志等）。

**Nuxt 模块** 是在使用 `nuxt dev` 以开发模式启动 Nuxt 或使用 `nuxt build` 为生产环境构建项目时顺序执行的函数。  
通过模块，你可以封装、合理测试并作为 npm 包共享自定义解决方案，而无需向项目添加冗余模板代码，也无需更改 Nuxt 本身。

::card-group{class="sm:grid-cols-1"}
  ::card{icon="i-lucide-rocket" title="创建你的第一个模块" to="/docs/3.x/guide/modules/getting-started"}
  学习如何使用官方入门模板创建你的第一个 Nuxt 模块。
  ::
  ::card{icon="i-lucide-box" title="了解模块结构" to="/docs/3.x/guide/modules/module-anatomy"}
  了解 Nuxt 模块的结构以及如何定义它们。
  ::
  ::card{icon="i-lucide-code" title="添加插件、组件及更多" to="/docs/3.x/guide/modules/recipes-basics"}
  学习如何从模块中注入插件、组件、组合函数和服务器路由。
  ::
  ::card{icon="i-lucide-layers" title="使用钩子并扩展类型" to="/docs/3.x/guide/modules/recipes-advanced"}
  掌握模块中的生命周期钩子、虚拟文件和 TypeScript 声明。
  ::
  ::card{icon="i-lucide-test-tube" title="测试你的模块" to="/docs/3.x/guide/modules/testing"}
  学习如何对你的 Nuxt 模块进行单元测试、集成测试和端到端测试。
  ::
  ::card{icon="i-lucide-medal" title="遵循最佳实践" to="/docs/3.x/guide/modules/best-practices"}
  按照这些指导原则构建高性能且易维护的 Nuxt 模块。
  ::
  ::card{icon="i-lucide-globe" title="发布并分享你的模块" to="/docs/3.x/guide/modules/ecosystem"}
  加入 Nuxt 模块生态系统并将你的模块发布到 npm。
  ::
::