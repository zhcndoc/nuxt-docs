---
title: "nuxt typecheck"
description: typecheck 命令运行 vue-tsc 来检查整个应用的类型。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [终端]
npx nuxt typecheck [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>]
```
<!--/typecheck-cmd-->

`typecheck` 命令运行 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) 来检查整个应用的类型。

## 参数

<!--typecheck-args-->
| 参数           | 描述                                           |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认值：`.`）                    |
<!--/typecheck-args-->

## 选项

<!--typecheck-opts-->
| 选项                                 | 默认值 | 描述                                                         |
|-------------------------------------|---------|--------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）            |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志级别                                         |
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                       |
| `-e, --extends=<layer-name>`        |         | 从 Nuxt 层扩展                                              |
<!--/typecheck-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。若想覆盖，请在 [`.env`](/docs/3.x/directory-structure/env) 文件中定义 `NODE_ENV` 或作为命令行参数传入。
::

::read-more{to="/docs/3.x/guide/concepts/typescript#type-checking"}
了解更多关于如何在构建或开发时启用类型检查的信息。
::