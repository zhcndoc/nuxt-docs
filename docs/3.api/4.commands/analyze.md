---
title: "nuxt analyze"
description: "分析生产包或您的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--name=<name>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 命令构建 Nuxt 并分析生产包（实验性）。

## 参数

<!--analyze-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认： `.`）
<!--/analyze-args-->

## 选项

<!--analyze-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，优先于 ROOTDIR（默认： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dotenv` |  | 要加载的 `.env` 文件的路径，相对于根目录
`--name=<name>` | `default` | 分析的名称
`--no-serve` |  | 跳过提供分析结果
<!--/analyze-opts-->

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。
::
