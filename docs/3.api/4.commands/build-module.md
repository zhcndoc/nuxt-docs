---
title: 'nuxt build-module'
description: '在发布前构建 Nuxt 模块的命令。'
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxt build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

`build-module` 命令运行 `@nuxt/module-builder`，在你的 `rootDir` 中生成包含完整构建的 `dist` 目录，用于你的 **nuxt-module**。

## 参数

<!--build-module-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认： `.`）
<!--/build-module-args-->

## 选项

<!--build-module-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，会优先于 ROOTDIR（默认： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--build` | `false` | 为发布构建模块
`--stub` | `false` | 在开发时生成 dist 的存根而不实际构建
`--sourcemap` | `false` | 生成 sourcemap
`--prepare` | `false` | 为本地开发准备模块
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
阅读有关 `@nuxt/module-builder` 的更多信息。
::