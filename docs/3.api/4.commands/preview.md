---
title: "nuxi 预览"
description: 预览命令在构建命令后启动一个服务器以预览您的应用程序。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/preview.ts
    size: xs
---

<!--preview-cmd-->
```bash [终端]
npx nuxi preview [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--envName] [--dotenv] [-p, --port]
```
<!--/preview-cmd-->

`preview` 命令在运行 `build` 命令后启动一个服务器以预览您的 Nuxt 应用程序。`start` 命令是 `preview` 的别名。在生产环境中运行应用程序时，请参考 [部署部分](/docs/getting-started/deployment)。

## 参数

<!--preview-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值： `.`）
<!--/preview-args-->

## 选项

<!--preview-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR （默认值： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--envName` |  | 解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
`--dotenv` |  | 要加载的 `.env` 文件路径，相对于根目录
`-p, --port` |  | 监听的端口（默认值： `NUXT_PORT \|\| NITRO_PORT \|\| PORT`）
<!--/preview-opts-->

此命令将 `process.env.NODE_ENV` 设置为 `production`。要覆盖此设置，可以在 `.env` 文件中或作为命令行参数定义 `NODE_ENV`。

::note
为了方便，在预览模式下，您的 [`.env`](/docs/guide/directory-structure/env) 文件将被加载到 `process.env` 中。（但是，在生产环境中，您需要确保自行设置环境变量。）
::