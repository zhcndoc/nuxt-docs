---
title: "nuxi analyze"
description: "分析生产包或您的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/analyze.ts
    size: xs
---

```bash [Terminal]
npx nuxi analyze [--log-level] [rootDir]
```

`analyze` 命令构建 Nuxt 并分析生产包（实验性）。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 目标应用程序的目录。

::note
这个命令将 `process.env.NODE_ENV` 设置为 `production`。
::
