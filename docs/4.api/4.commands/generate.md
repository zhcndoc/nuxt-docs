---
title: "nuxt generate"
description: 对应用的每个路由进行预渲染，并将结果以纯 HTML 文件的形式保存。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/generate-cmd-->

`generate` 命令对应用的每个路由进行预渲染，并将结果以纯 HTML 文件保存，可部署到任何静态托管服务。该命令会触发 `nuxt build` 命令，并将 `prerender` 参数设置为 `true`

## 参数

<!--generate-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认： `.`） |
<!--/generate-args-->

## 选项

<!--generate-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 指定工作目录，该选项优先于 ROOTDIR（默认： `.`）                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志级别                                                                                                                         |
| `--preset`                           |         | Nitro 服务器预设                                                                                                                                  |
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                                                                                          |
| `--envName`                          |         | 解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`） |
| `-e, --extends=<layer-name>`         |         | 从 Nuxt 层进行扩展                                                                                                                             |
| `--profile`                          |         | 分析性能（v4.4+）。退出时会写入 V8 CPU profile 和 JSON 报告。使用 `--profile=verbose` 输出完整的控制台报告。                     |
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
阅读有关预渲染和静态托管的更多内容。
::
