---
title: 'nuxi build-module'
description: 'Nuxt 命令，用于在发布前构建您的 Nuxt 模块。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/build-module.ts
    size: xs
---

```bash [Terminal]
npx nuxi build-module [--stub] [rootDir]
```

`build-module` 命令运行 `@nuxt/module-builder`，在您的 `rootDir` 内生成包含您 **nuxt-module** 的完整构建的 `dist` 目录。

选项       | 默认值          | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要捆绑的模块根目录。
`--stub` | `false` | 使用 [jiti](https://github.com/unjs/jiti#jiti) 替代理模块，用于开发。（**注意：** 这主要用于开发目的。）

::read-more{to="https://github.com/nuxt/module-builder" icon="i-simple-icons-github" color="gray" target="_blank"}
阅读更多关于 `@nuxt/module-builder`。
::
