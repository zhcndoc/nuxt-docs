---
title: "nuxt generate"
description: 预渲染应用程序的每个路由，并将结果存储为纯 HTML 文件。
links:
  - label: 资源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [终端]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName]
```
<!--/generate-cmd-->

`generate` 命令会预渲染应用的每个路由，并将结果存储为纯 HTML 文件，这些文件可以部署到任何静态托管服务上。该命令会触发带有 `prerender` 参数设为 `true` 的 `nuxt build` 命令。

## 参数

<!--generate-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/generate-args-->

## 选项

<!--generate-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，该选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 载入的 `.env` 文件路径，相对于根目录
`--envName` |  | 解析配置覆盖时使用的环境（构建时默认是 `production`，开发服务器运行时默认是 `development`）
<!--/generate-opts-->

::read-more{to="/docs/getting-started/deployment#static-hosting"}
阅读更多关于预渲染和静态托管的信息。
::