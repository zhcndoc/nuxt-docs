---
title: "nuxi build"
description: "构建您的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build.ts
    size: xs
---

```bash [Terminal]
npx nuxi build [--prerender] [--preset] [--dotenv] [--log-level] [rootDir]
```

`build` 命令创建一个包含所有应用程序、服务器和依赖项的 `.output` 目录，准备好用于生产环境。

选项           | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要捆绑的应用程序的根目录。
`--prerender` | `false` | 预渲染您的应用程序的每个路由。（**注意:** 这是一个实验性标志。行为可能会改变。）
`--preset` | - | 设置一个 [Nitro 预设](https://nitro.unjs.io/deploy#changing-the-deployment-preset)
`--dotenv` | `.` | 指向另一个环境配置文件，相对于根目录的 `.env` 文件。
`--log-level` | `info` | 指定构建时的日志级别，允许 `silent` \| `info` \| `verbose`。

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 总是将 `preset` 设置为 `static`。
::
