---
title: "nuxt analyze"
description: "分析生产环境的 Nuxt 应用包。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/analyze.ts
    size: xs
---

<!--analyze-cmd-->
```bash [Terminal]
npx nuxt analyze [ROOTDIR] [--cwd=<目录>] [--logLevel=<silent|info|verbose>] [--dotenv] [-e, --extends=<layer-name>] [--name=<名称>] [--no-serve]
```
<!--/analyze-cmd-->

`analyze` 命令会构建 Nuxt 并分析生产包（实验性功能）。

## 参数

<!--analyze-args-->
| 参数          | 说明                                   |
|---------------|----------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认值：`.`）            |
<!--/analyze-args-->

## 选项

<!--analyze-opts-->
| 选项                                | 默认值    | 说明                                               |
|------------------------------------|----------|----------------------------------------------------|
| `--cwd=<目录>`                     |          | 指定工作目录，该选项优先于 ROOTDIR（默认值：`.`）   |
| `--logLevel=<silent\|info\|verbose>` |          | 指定构建时的日志级别                              |
| `--dotenv`                        |          | 加载 `.env` 文件的路径，相对于根目录               |
| `-e, --extends=<layer-name>`      |          | 从 Nuxt 层扩展                                    |
| `--name=<名称>`                   | `default` | 分析名称                                         |
| `--no-serve`                     |          | 跳过分析结果的服务展示                             |
<!--/analyze-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。
::