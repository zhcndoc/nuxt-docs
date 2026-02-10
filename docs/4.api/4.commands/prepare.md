---
title: 'nuxt prepare'
description: 准备命令会在你的应用中创建一个 .nuxt 目录并生成类型。
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

`prepare` 命令会在你的应用中创建一个 [`.nuxt`](/docs/4.x/directory-structure/nuxt) 目录并生成类型。这在 CI 环境中或作为你 [`package.json`](/docs/4.x/directory-structure/package) 中的 `postinstall` 命令时很有用。

## 参数

<!--prepare-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认：`.`） |
<!--/prepare-args-->

## 选项

<!--prepare-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                                                                                          |
| `--cwd=<directory>`                  |         | 指定工作目录，该选项优先于 ROOTDIR（默认：`.`）                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志等级                                                                                                                         |
| `--envName`                          |         | 用于解析配置覆盖的环境（构建时默认是 `production`，启动开发服务器时默认是 `development`） |
| `-e, --extends=<layer-name>`         |         | 从 Nuxt 层扩展                                                                                                                             |
<!--/prepare-opts-->

::note
该命令会将 `process.env.NODE_ENV` 设置为 `production`。
::
