---
title: "nuxi 类型检查"
description: typecheck 命令运行 vue-tsc 以检查您应用程序中的类型。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/typecheck.ts
    size: xs
---

<!--typecheck-cmd-->
```bash [终端]
npx nuxi typecheck [ROOTDIR] [--cwd=<目录>] [--logLevel=<silent|info|verbose>]
```
<!--/typecheck-cmd-->

`typecheck` 命令运行 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) 以检查您应用程序中的类型。

## 参数

<!--typecheck-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/typecheck-args-->

## 选项

<!--typecheck-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<目录>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
<!--/typecheck-opts-->

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。要覆盖，需在 [.env](/docs/guide/directory-structure/env) 文件中或作为命令行参数定义 `NODE_ENV`。
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
了解如何在构建或开发时启用类型检查的更多信息。
::