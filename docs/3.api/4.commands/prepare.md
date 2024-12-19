---
title: 'nuxi prepare'
description: 准备命令会在你的应用中创建一个 .nuxt 目录，并生成类型。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/prepare.ts
    size: xs
---

<!--prepare-cmd-->
```bash [Terminal]
npx nuxi prepare [ROOTDIR] [--dotenv] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName]
```
<!--/prepare-cmd-->

`prepare` 命令会在你的应用中创建一个 [`.nuxt`](/docs/guide/directory-structure/nuxt) 目录，并生成类型。这可以在 CI 环境中使用，或者在你的 [`package.json`](/docs/guide/directory-structure/package) 中的 `postinstall` 命令中使用。

## 参数

<!--prepare-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/prepare-args-->

## 选项

<!--prepare-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--dotenv` |  | 要加载的 `.env` 文件的路径，相对于根目录
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--envName` |  | 在解析配置覆盖时使用的环境（默认是 `production` 当构建时，和 `development` 当运行开发服务器时）
<!--/prepare-opts-->
