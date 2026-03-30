---
title: "nuxt 构建"
description: "构建你的 Nuxt 应用。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/build-cmd-->

`build` 命令会创建一个 `.output` 目录，其中包含为生产准备的应用、服务器和依赖项。

## 参数

<!--build-args-->
| 参数      | 描述                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认： `.`） |
<!--/build-args-->

## 选项

<!--build-opts-->
| 选项                               | 默认 | 描述                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 指定工作目录，该选项优先于 ROOTDIR（默认： `.`）                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志级别                                                                                                                         |
| `--prerender`                        |         | 构建 Nuxt 并预渲染静态路由                                                                                                               |
| `--preset=<preset>`                  |         | 指定 Nitro 服务器 preset。可用的 preset 取决于 Nitro（例如 `node-server`、`vercel`、`netlify`、`static`）                                  |
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                                                                                          |
| `--envName`                          |         | 在解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`） |
| `-e, --extends=<layer-name>`         |         | 从一个 Nuxt layer 进行扩展                                                                                                                             |
| `--profile`                          |         | 分析性能（v4.4+）。退出时会写入一个 V8 CPU profile 和 JSON 报告。若要完整的控制台报告，请使用 `--profile=verbose`。                     |
<!--/build-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 将始终把 `preset` 设置为 `static`
::
