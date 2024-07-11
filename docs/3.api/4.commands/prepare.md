---
title: 'nuxi prepare'
description: 准备命令会在你的应用中创建一个 .nuxt 目录，并生成类型。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/prepare.ts
    size: xs
---

```bash [Terminal]
npx nuxi prepare [--log-level] [rootDir]
```

`prepare` 命令会在你的应用中创建一个 [`.nuxt`](/docs/guide/directory-structure/nuxt) 目录，并生成类型。这可以在 CI 环境中使用，或者在你的 [`package.json`](/docs/guide/directory-structure/package) 中的 `postinstall` 命令中使用。

Option        | Default          | Description
-------------------------|-----------------|------------------
`rootDir` | `.` | 要准备的应用的根目录。
