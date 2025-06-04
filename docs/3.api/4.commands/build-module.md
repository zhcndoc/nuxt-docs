---
title: 'nuxt build-module'
description: 'Nuxt 命令，用于在发布前构建您的 Nuxt 模块。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/module-builder/blob/main/src/cli.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxt build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

`build-module` 命令运行 `@nuxt/module-builder` 以在您的 `rootDir` 中生成 `dist` 目录，该目录包含您 **nuxt-module** 的完整构建。

## 参数

<!--build-module-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值： `.`）
<!--/build-module-args-->

## 选项

<!--build-module-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--build` | `false` | 为分发构建模块
`--stub` | `false` | 为开发构建存根 dist，而不是实际构建
`--sourcemap` | `false` | 生成源映射
`--prepare` | `false` | 为本地开发准备模块
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" target="\_blank"}
了解更多关于 `@nuxt/module-builder` 的信息。
::
