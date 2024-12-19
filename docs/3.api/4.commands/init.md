---
title: "nuxi init"
description: 初始化命令用于创建一个新的 Nuxt 项目。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npx nuxi init [DIR] [--cwd=<directory>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager]
```
<!--/init-cmd-->

`init` 命令使用 [unjs/giget](https://github.com/unjs/giget) 初始化一个新的 Nuxt 项目。

## 参数

<!--init-args-->
参数 | 描述
--- | ---
`DIR=""` | 项目目录
<!--/init-args-->

## 选项

<!--init-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`-t, --template` |  | 模板名称
`-f, --force` |  | 覆盖现有目录
`--offline` |  | 强制离线模式
`--preferOffline` |  | 优先离线模式
`--no-install` |  | 跳过安装依赖
`--gitInit` |  | 初始化 git 仓库
`--shell` |  | 安装后在项目目录中启动 shell
`--packageManager` |  | 包管理器选择 (npm, pnpm, yarn, bun)
<!--/init-opts-->

## 环境变量

- `NUXI_INIT_REGISTRY`: 设置为自定义模板注册表。 ([了解更多](https://github.com/unjs/giget#custom-registry))
  - 默认注册表从 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates) 加载
