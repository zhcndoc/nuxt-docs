---
title: 'nuxi prepare'
description: prepare 命令在您的应用程序中创建一个 .nuxt 目录并生成类型。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxi prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName]
```
<!--/prepare-cmd-->

`prepare` 命令在您的应用程序中创建一个 [`.nuxt`](/docs/guide/directory-structure/nuxt) 目录并生成类型。这在 CI 环境中或作为您 [`package.json`](/docs/guide/directory-structure/package) 中的 `postinstall` 命令时非常有用。

## 参数

<!--prepare-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值： `.`）
<!--/prepare-args-->

## 选项

<!--prepare-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--dotenv` |  | 要加载的 `.env` 文件的路径，相对于根目录
`--cwd=<directory>` |  | 指定工作目录，此项优先于 ROOTDIR（默认值： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--envName` |  | 用于解决配置覆盖时使用的环境（默认在构建时为 `production`，在运行开发服务器时为 `development`）
<!--/prepare-opts-->