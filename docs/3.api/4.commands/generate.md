---
title: "nuxi generate"
description: 预渲染应用程序的每个路由，并将结果存储为普通的 HTML 文件。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxi generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

`generate` 命令预渲染你的应用程序的每个路由，并将结果存储为普通的 HTML 文件，你可以在任何静态托管服务上部署这些文件。该命令触发 `nuxi build` 命令，并将 `prerender` 参数设置为 `true`。

## 参数

<!--generate-args-->
Argument | Description
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值: `.`）
<!--/generate-args-->

## 选项

<!--generate-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认值: `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 要加载的 `.env` 文件的路径，相对于根目录
`--envName` |  | 解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
<!--/generate-opts-->

::read-more{to="/docs/getting-started/deployment#static-hosting"}
了解更多关于预渲染和静态托管的信息。
::