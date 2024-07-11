---
title: "nuxi typecheck"
description: 该命令运行 vue-tsc 来检查整个应用程序中的类型。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/typecheck.ts
    size: xs
---

```bash [Terminal]
npx nuxi typecheck [--log-level] [rootDir]
```

`typecheck` 命令运行 [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) 来检查整个应用程序中的类型。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 目标应用程序的目录。

::note
这个命令将 `process.env.NODE_ENV` 设置为 `production`。要覆盖，请在 [`.env`](/docs/guide/directory-structure/env) 文件或在命令行参数中定义 `NODE_ENV`。
::

::read-more{to="/docs/guide/concepts/typescript#type-checking"}
了解如何在构建或开发时启用类型检查的更多信息。
::
