---
title: "create nuxt"
description: init 命令用于初始化一个全新的 Nuxt 项目。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [终端]
npm create nuxt@latest [DIR] [--cwd=<directory>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager]
```
<!--/init-cmd-->

`create-nuxt` 命令使用 [unjs/giget](https://github.com/unjs/giget) 初始化一个全新的 Nuxt 项目。

## 参数

<!--init-args-->
参数 | 说明
--- | ---
`DIR=""` | 项目目录
<!--/init-args-->

## 选项

<!--init-opts-->
选项 | 默认值 | 说明
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`-t, --template` |  | 模板名称
`-f, --force` |  | 覆盖已存在的目录
`--offline` |  | 强制离线模式
`--preferOffline` |  | 优先使用离线模式
`--no-install` |  | 跳过依赖安装
`--gitInit` |  | 初始化 git 仓库
`--shell` |  | 安装完成后在项目目录启动 shell
`--packageManager` |  | 选择包管理器（npm, pnpm, yarn, bun）
<!--/init-opts-->

## 环境变量

- `NUXI_INIT_REGISTRY`：设置自定义模板注册表。（[了解更多](https://github.com/unjs/giget#custom-registry)）。
  - 默认注册表从 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates) 加载。
