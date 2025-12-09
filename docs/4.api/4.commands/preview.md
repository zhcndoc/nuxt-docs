---
title: "nuxt 预览"
description: 预览命令在运行 build 命令后启动一个服务器以预览你的应用。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>] [-p, --port] [--dotenv]
```
<!--/preview-cmd-->

`preview` 命令在运行 `build` 命令后启动一个服务器以预览你的 Nuxt 应用。`start` 命令是 `preview` 的别名。在生产环境运行你的应用时，请参考 [部署 部分](/docs/4.x/getting-started/deployment)。

## Arguments

<!--preview-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认：`.`） |
<!--/preview-args-->

## Options

<!--preview-opts-->
| Option                               | Default | Description                                                                                                                                          |
|--------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |         | 指定工作目录，此项优先于 ROOTDIR（默认：`.`）                                                                     |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志级别                                                                                                                         |
| `--envName`                          |         | 用于解析配置覆盖的环境（在构建时默认是 `production`，在运行开发服务器时默认是 `development`） |
| `-e, --extends=<layer-name>`         |         | 从 Nuxt 层扩展                                                                                                                             |
| `-p, --port`                         |         | 监听端口（可用 `PORT` 环境变量覆盖）                                                                                      |
| `--dotenv`                           |         | 要加载的 `.env` 文件路径，相对于根目录                                                                                          |
<!--/preview-opts-->

此命令会将 `process.env.NODE_ENV` 设置为 `production`。若要覆盖，请在 `.env` 文件中或作为命令行参数定义 `NODE_ENV`。

::note
为方便起见，在预览模式下，你的 [`.env`](/docs/4.x/directory-structure/env) 文件将被加载到 `process.env` 中。（但是在生产环境中你需要自己确保环境变量已被设置。例如，在 Node.js 20+ 中，你可以通过运行 `node --env-file .env .output/server/index.mjs` 来启动服务器。）
::
