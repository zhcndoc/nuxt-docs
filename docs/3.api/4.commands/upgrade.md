---
title: "nuxi upgrade"
description: 升级命令将 Nuxt 升级到最新版本。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxi upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 命令将 Nuxt 升级到最新版本。

## 参数

<!--upgrade-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值： `.`）
<!--/upgrade-args-->

## 选项

<!--upgrade-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，该选项优先于 ROOTDIR（默认值： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dedupe` |  | 将去重依赖项，但不会重新创建锁定文件
`-f, --force` |  | 强制升级以重新创建锁定文件和 node_modules
`-ch, --channel=<stable\|nightly>` | `stable` | 指定要安装的通道（默认值：stable）
<!--/upgrade-opts-->
