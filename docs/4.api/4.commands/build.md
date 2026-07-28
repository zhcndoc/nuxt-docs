---
title: "Nuxt 构建"
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
| `--cwd=<directory>`                  |         | 指定工作目录，此项优先于 ROOTDIR（默认：`.`）                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时日志级别                                                                                                                         |
| `--prerender`                        |         | 构建 Nuxt 并预渲染静态路由                                                                                                               |
| `--preset=<preset>`                  |         | 指定 Nitro 服务器预设。可用预设取决于 Nitro（例如 `node-server`、`vercel`、`netlify`、`static`）                                  |
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                                                                                          |
| `--envName`                          |         | 解析配置覆盖项时使用的环境（构建时默认为 `production`，运行开发服务器时默认为 `development`） |
| `-e, --extends=<layer-name>`         |         | 继承一个 Nuxt 层                                                                                                                             |
| `--profile` :badge[v4.4]{color="info" size="xs" class="align-middle"} |         | 性能分析。退出时写入 V8 CPU 性能分析和 JSON 报告。使用 `--profile=verbose` 可获得完整的控制台报告。                             |
<!--/build-opts-->

::note
此命令会将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 将始终把 `preset` 设置为 `static`
::
