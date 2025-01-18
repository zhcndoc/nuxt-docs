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
```bash [终端]
npx nuxi upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [-f, --force] [-ch, --channel=<stable|nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 命令将 Nuxt 升级到最新版本。

## 参数

<!--upgrade-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/upgrade-args-->

## 选项

<!--upgrade-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`-f, --force` |  | 强制升级以重新创建 lockfile 和 node_modules
`-ch, --channel=<stable\|nightly>` | `stable` | 指定要安装的频道（默认：stable）
<!--/upgrade-opts-->
