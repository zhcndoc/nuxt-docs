---
title: "nuxt build"
description: "构建您的 Nuxt 应用程序。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxt build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

`build` 命令会创建一个 `.output` 目录，其中包含您的应用程序、服务器及依赖项，已准备好用于生产环境。

## 参数

<!--build-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认值：`.`）
<!--/build-args-->

## 选项

<!--build-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，该选项优先于 ROOTDIR（默认值：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--prerender` |  | 构建 Nuxt 并预渲染静态路由
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 要加载的 `.env` 文件路径，相对于根目录
`--envName` |  | 用于解析配置覆盖的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
<!--/build-opts-->

::note
该命令会将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
使用 `--prerender` 时，`preset` 始终设置为 `static`。
::