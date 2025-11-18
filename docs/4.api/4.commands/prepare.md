---
title: 'nuxt prepare'
description: prepare 命令会在你的应用中创建一个 .nuxt 目录并生成类型。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxt prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>]
```
<!--/prepare-cmd-->

`prepare` 命令会在你的应用中创建一个 [`.nuxt`](/docs/guide/directory-structure/nuxt) 目录并生成类型。这在 CI 环境中或作为 [`package.json`](/docs/guide/directory-structure/package) 中的 `postinstall` 命令时非常有用。

## 参数

<!--prepare-args-->
参数 | 说明
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/prepare-args-->

## 选项

<!--prepare-opts-->
选项 | 默认值 | 说明
--- | --- | ---
`--dotenv` |  | 指定要加载的 `.env` 文件路径，路径相对于根目录
`--cwd=<directory>` |  | 指定工作目录，该选项优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--envName` |  | 解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
`-e, --extends=<layer-name>` |  | 从 Nuxt 层继承
<!--/prepare-opts-->

::note
该命令会将 `process.env.NODE_ENV` 设置为 `production`。
::