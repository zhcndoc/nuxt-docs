---
title: "nuxi generate"
description: 预渲染应用程序的每个路由，并将结果存储为纯 HTML 文件。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/generate.ts
    size: xs
---

```bash [Terminal]
npx nuxi generate [rootDir] [--dotenv]
```

`generate` 命令会预渲染您的应用程序的每个路由，并将结果存储为纯 HTML 文件，您可以将这些文件部署在任何静态托管服务上。该命令触发了 `nuxi build` 命令，并将 `prerender` 参数设置为 `true`。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要生成的应用程序的根目录
`--dotenv` | `.` | 指向另一个 `.env` 文件以加载，相对于根目录的**相对**路径。

::read-more{to="/docs/getting-started/deployment#static-hosting"}
阅读更多关于预渲染和静态托管的资料。
::
