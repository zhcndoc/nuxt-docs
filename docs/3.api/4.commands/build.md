---
title: "nuxi build"
description: "构建你的 Nuxt 应用程序。"
links:
  - label: Source
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxi build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

`build` 命令会创建一个 `.output` 目录，里面包含所有已准备好用于生产的应用程序、服务器和依赖项。

## 参数

<!--build-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值： `.`）
<!--/build-args-->

## 选项

<!--build-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，优先于 ROOTDIR（默认值： `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--prerender` |  | 构建 Nuxt 并预渲染静态路由
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 要加载的 `.env` 文件的路径，相对于根目录
`--envName` |  | 使用何种环境来解析配置覆盖（构建时默认是 `production`，运行开发服务器时默认是 `development`）
<!--/build-opts-->

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 将始终将 `preset` 设置为 `static`
::