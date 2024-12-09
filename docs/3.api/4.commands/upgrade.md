---
title: "nuxi upgrade"
description: 升级命令将 Nuxt 升级到最新版本。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/upgrade.ts
    size: xs
---

```bash [终端]
npx nuxi upgrade [--force|-f]
```

`upgrade` 命令将 Nuxt 升级到最新版本。

选项        | 默认值          | 描述
-------------------------|-----------------|------------------
`--force, -f` | `false` | 升级前删除 `node_modules` 和锁文件。
`--channel, -ch` | `"stable"` | 指定要安装的频道 ("nightly" 或 "stable")
