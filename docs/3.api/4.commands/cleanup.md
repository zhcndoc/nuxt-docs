---
title: 'nuxt cleanup'
description: '移除常见的生成 Nuxt 文件和缓存。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxt cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

`cleanup` 命令用于移除常见的生成 Nuxt 文件和缓存，包括：

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## 参数

<!--cleanup-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认: `.`）
<!--/cleanup-args-->

## 选项

<!--cleanup-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认: `.`）
<!--/cleanup-opts-->
