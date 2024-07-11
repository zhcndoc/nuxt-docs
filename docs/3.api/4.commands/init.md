---
title: "nuxi init"
description: 初始化命令用于创建一个新的 Nuxt 项目。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/init.ts
    size: xs
---

```bash [Terminal]
npx nuxi init [--verbose|-v] [--template,-t] [dir]
```

`init` 命令使用 [unjs/giget](https://github.com/unjs/giget) 初始化一个新的 Nuxt 项目。

## 选项

Option        | Default          | Description
-------------------------|-----------------|------------------
`--cwd` | | 当前工作目录
`--log-level` | | 日志级别
`--template, -t` | `v3` | 指定使用作为模板的模板名称或 Git 仓库。格式为 `gh:org/name` 以使用自定义的 GitHub 模板。
`--force, -f` | `false` | 强制克隆到任何现有目录。
`--offline` | `false` | 强制离线模式（不尝试从 GitHub 下载模板，只使用本地缓存）。
`--prefer-offline` | `false` | 偏好离线模式（首先尝试本地缓存下载模板）。
`--no-install` | `false` | 跳过安装依赖。
`--git-init` | `false` | 初始化 Git 仓库。
`--shell` | `false` | 安装后，在项目目录中启动 shell（实验性）。
`--package-manager` | `npm` | 包管理器选择（npm, pnpm, yarn, bun）。
`--dir` | | 项目目录。

## 环境变量

- `NUXI_INIT_REGISTRY`: 设置为自定义模板注册表。 ([了解更多](https://github.com/unjs/giget#custom-registry))
  - 默认注册表从 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates) 加载
