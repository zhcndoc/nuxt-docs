---
navigation.title: 'Nuxt 插件'
title: Nuxt 插件
description: 使用 Nuxt 插件的最佳实践。
---

Plugins in Nuxt allow you to extend your application with additional functionality. However, improper use can lead to performance bottlenecks. This guide outlines best practices to optimize your Nuxt plugins.

## Avoid costly plugin setup

A large number of plugins can cause performance issues, especially if they require expensive computations or take too long to initialize. Since plugins run during the hydration phase, inefficient setups can block rendering and degrade the user experience.

## Use Composition whenever possible

Whenever possible, favor composition over plugins. Just like in Vue, many utilities and composables can be used directly without the need for a plugin. This keeps your project lightweight and improves maintainability.

## If `async`, enable `parallel`

By default, all plugins loads synchronously.
When defining asynchronous plugins, setting `parallel: true` allows multiple plugins to load concurrently, improving performance by preventing blocking operations.