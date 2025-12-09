---
title: "nuxt 升级"
description: 升级命令将 Nuxt 升级到最新版本。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/upgrade.ts
    size: xs
---

<!--upgrade-cmd-->
```bash [Terminal]
npx nuxt upgrade [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dedupe] [-f, --force] [-ch, --channel=<stable|nightly|v3|v4|v4-nightly|v3-nightly>]
```
<!--/upgrade-cmd-->

`upgrade` 命令将 Nuxt 升级到最新版本。

## 参数

<!--upgrade-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认： `.`） |
<!--/upgrade-args-->

## 选项

<!--upgrade-opts-->
| Option                                                             | Default  | Description                                                                      |
|--------------------------------------------------------------------|----------|----------------------------------------------------------------------------------|
| `--cwd=<directory>`                                                |          | 指定工作目录，此选项优先于 ROOTDIR（默认： `.`） |
| `--logLevel=<silent\|info\|verbose>`                               |          | 指定构建时的日志级别                                                     |
| `--dedupe`                                                         |          | 升级后对依赖执行去重                                              |
| `-f, --force`                                                      |          | 强制升级以重新创建 lockfile 和 node_modules                              |
| `-ch, --channel=<stable\|nightly\|v3\|v4\|v4-nightly\|v3-nightly>` | `stable` | 指定要从其安装的通道（默认： stable）                              |
<!--/upgrade-opts-->
