---
title: 'nuxi build-module'
description: 'Nuxt 命令，用于在发布前构建您的 Nuxt 模块。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build-module.ts
    size: xs
---

<!--build-module-cmd-->
```bash [Terminal]
npx nuxi build-module [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--build] [--stub] [--sourcemap] [--prepare]
```
<!--/build-module-cmd-->

`build-module` 命令运行 `@nuxt/module-builder`，在您的 `rootDir` 内生成包含您 **nuxt-module** 的完整构建的 `dist` 目录。

## 参数

<!--build-module-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/build-module-args-->

## 选项

<!--build-module-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--build` | `false` | 为分发构建模块
`--stub` | `false` | 使用 [jiti](https://github.com/unjs/jiti#jiti) 替代理模块，用于开发。（**注意：** 这主要用于开发目的。）
`--sourcemap` | `false` | 生成 sourcemaps
`--prepare` | `false` | 为本地开发准备模块
<!--/build-module-opts-->

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" color="gray" target="_blank"}
阅读更多关于 `@nuxt/module-builder`。
::
