---
title: 'nuxt build-module'
description: 'Nuxt 命令，用于在发布前构建您的 Nuxt 模块。'
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

`build-module` 命令运行 `@nuxt/module-builder` 来生成位于您的 `rootDir` 内的 `dist` 目录，包含您 **nuxt-module** 的完整构建。

## 参数

<!--build-module-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/build-module-args-->

## 选项

<!--build-module-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--build` | `false` | 构建模块以供发布
`--stub` | `false` | 伪造 dist 目录而非实际构建，用于开发
`--sourcemap` | `false` | 生成源码映射
`--prepare` | `false` | 准备模块以便本地开发
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
了解更多有关 `@nuxt/module-builder` 的信息。
::