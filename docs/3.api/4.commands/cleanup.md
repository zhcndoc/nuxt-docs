---
title: 'nuxi cleanup'
description: '移除常见的 Nuxt 生成文件和缓存。'
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/cleanup.ts
    size: xs
---

<!--cleanup-cmd-->
```bash [Terminal]
npx nuxi cleanup [ROOTDIR] [--cwd=<directory>]
```
<!--/cleanup-cmd-->

`cleanup` 命令会移除常见的 Nuxt 生成文件和缓存，包括：

- `.nuxt`
- `.output`
- `node_modules/.vite`
- `node_modules/.cache`

## 参数

<!--cleanup-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/cleanup-args-->

## 选项

<!--cleanup-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
<!--/cleanup-opts-->
