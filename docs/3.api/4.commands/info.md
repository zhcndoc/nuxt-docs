---
title: "nuxi info"
description: info 命令记录关于当前或指定的 Nuxt 项目的信息。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/info.ts
    size: xs
---

<!--info-cmd-->
```bash [Terminal]
npx nuxi info [ROOTDIR] [--cwd=<directory>]
```
<!--/info-cmd-->

`info` 命令记录关于当前或指定的 Nuxt 项目的信息。

## 参数

<!--info-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`."`）
<!--/info-args-->

## 选项

<!--info-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值：`."`）
<!--/info-opts-->