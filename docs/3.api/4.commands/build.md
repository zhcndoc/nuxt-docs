---
title: "nuxi build"
description: "构建您的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/build.ts
    size: xs
---

<!--build-cmd-->
```bash [Terminal]
npx nuxi build [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--prerender] [--preset] [--dotenv] [--envName]
```
<!--/build-cmd-->

`build` 命令创建一个包含所有应用程序、服务器和依赖项的 `.output` 目录，准备好用于生产环境。

## 参数

<!--build-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/build-args-->

## 选项

<!--build-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--prerender` |  | 构建 Nuxt 并预渲染静态路由
`--preset` |  | Nitro 服务器预设
`--dotenv` |  | 指向另一个环境配置文件，相对于根目录的 `.env` 文件。
`--envName` |  | 在解析配置覆盖时使用的环境（默认是 `production` 当构建时，和 `development` 当运行开发服务器时）
<!--/build-opts-->

::note
此命令将 `process.env.NODE_ENV` 设置为 `production`。
::

::note
`--prerender` 总是将 `preset` 设置为 `static`。
::
