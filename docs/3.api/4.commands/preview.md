---
title: "nuxi preview"
description: 预览命令在构建命令之后启动一个服务器来预览您的应用程序。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/preview.ts
    size: xs
---

```bash [终端]
npx nuxi preview|start [rootDir] [--dotenv]
```

`preview` 命令在运行 `build` 命令之后启动一个服务器来预览您的 Nuxt 应用程序。`start` 命令是 `preview` 命令的别名。在生产环境中运行您的应用程序时，请参考[部署部分](/docs/getting-started/deployment)。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要预览的应用程序的根目录。
`--dotenv` | `.` | 指向另一个 `.env` 文件以加载，相对于根目录的**相对**路径。

这个命令设置 `process.env.NODE_ENV` 为 `production`。要覆盖，请在 `.env` 文件中或作为命令行参数定义 `NODE_ENV`。

::note
为了方便起见，在预览模式下，您的 [`.env`](/docs/guide/directory-structure/env) 文件将被加载到 `process.env` 中。（然而，在生产环境中，您将需要确保自己设置环境变量。）
::
