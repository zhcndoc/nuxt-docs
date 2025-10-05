---
title: "nuxt analyze"
description: "分析生产包或你的 Nuxt 应用程序。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 命令构建 Nuxt 并分析生产包（实验性）。

## 参数

<!--analyze-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 指定工作目录（默认： `.`）
<!--/analyze-args-->

## 选项

<!--analyze-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此项优先于 ROOTDIR（默认： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dotenv` |  | 要加载的 `.env` 文件路径，相对于根目录
`-e, --extends=<layer-name>` |  | 从 Nuxt 层扩展
`--name=<name>` | `default` | 分析名称
`--no-serve` |  | 跳过提供分析结果
<!--/analyze-opts-->

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。
::