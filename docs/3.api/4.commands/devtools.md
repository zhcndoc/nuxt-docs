---
title: "nuxi devtools"
description: nuxi devtools 命令允许你在每个项目的基础上启用或禁用 Nuxt DevTools。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/devtools.ts
    size: xs
---

```bash [Terminal]
npx nuxi devtools enable|disable [rootDir]
```

运行 `nuxi devtools enable` 将会在全球范围内安装 Nuxt DevTools，并在你正在使用的特定项目中启用它。它被保存在你的用户级别 `.nuxtrc` 中。如果你想为特定项目移除 DevTools 支持，你可以运行 `nuxi devtools disable`。

选项 | 默认值 | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 您想要为哪个应用程序启用 DevTools 的根目录。

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="_blank"}
阅读更多关于 **Nuxt DevTools** 的信息。
::
