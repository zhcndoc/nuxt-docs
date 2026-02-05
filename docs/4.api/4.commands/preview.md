---
title: "nuxt preview"
description: 预览命令在执行构建命令后启动一个服务器来预览你的应用程序。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [Terminal]
npx nuxt preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [-e, --extends=<layer-name>] [-p, --port] [--dotenv]
```
<!--/preview-cmd-->

`preview` 命令在运行 `build` 命令后启动一个服务器来预览你的 Nuxt 应用。`start` 命令是 `preview` 的别名。生产环境运行你的应用时，请参考[部署章节](/docs/3.x/getting-started/deployment)。

## 参数

<!--preview-args-->
| 参数             | 说明                                 |
|------------------|------------------------------------|
| `ROOTDIR="."`    | 指定工作目录（默认值：`.`）         |
<!--/preview-args-->

## 选项

<!--preview-opts-->
| 选项                                   | 默认值 | 说明                                                                                                           |
|--------------------------------------|-------|--------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |       | 指定工作目录，此选项优先于 ROOTDIR（默认：`.`）                                                               |
| `--logLevel=<silent\|info\|verbose>` |       | 指定构建时日志级别                                                                                            |
| `--envName`                          |       | 解析配置覆盖时使用的环境（构建时默认是 `production`，开发服务器运行时默认是 `development`）                      |
| `-e, --extends=<layer-name>`         |       | 从 Nuxt 层扩展                                                                                                 |
| `-p, --port`                         |       | 监听端口（使用环境变量 `PORT` 可覆盖）                                                                        |
| `--dotenv`                           |       | 要加载的 `.env` 文件路径，相对于根目录                                                                         |
<!--/preview-opts-->

此命令会将 `process.env.NODE_ENV` 设置为 `production`。如需覆盖，请在 `.env` 文件或命令行参数中定义 `NODE_ENV`。

::note
为了方便，在预览模式下，你的[`.env`](/docs/3.x/directory-structure/env) 文件将被加载到 `process.env` 中。（不过在生产环境中，你需要自行确保环境变量的设置。例如，在 Node.js 20+ 中，可以通过运行 `node --env-file .env .output/server/index.mjs` 来启动服务器。）
::