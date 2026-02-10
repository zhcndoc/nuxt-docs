---
title: "create nuxt"
description: init 命令会初始化一个新的 Nuxt 项目。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/init.ts
    size: xs
---

<!--init-cmd-->
```bash [Terminal]
npm create nuxt@latest [DIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [-t, --template] [-f, --force] [--offline] [--preferOffline] [--no-install] [--gitInit] [--shell] [--packageManager] [-M, --modules] [--no-modules] [--nightly]
```
<!--/init-cmd-->

`create-nuxt` 命令使用 [unjs/giget](https://github.com/unjs/giget) 初始化一个新的 Nuxt 项目。

## 参数

<!--init-args-->
| Argument | Description       |
|----------|-------------------|
| `DIR=""` | 项目目录 |
<!--/init-args-->

## 选项

<!--init-opts-->
| Option                               | Default | Description                                              |
|--------------------------------------|---------|----------------------------------------------------------|
| `--cwd=<directory>`                  | `.`     | 指定工作目录                            |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时日志级别                             |
| `-t, --template`                     |         | 模板名称                                            |
| `-f, --force`                        |         | 覆盖已存在目录                              |
| `--offline`                          |         | 强制离线模式                                       |
| `--preferOffline`                    |         | 优先使用离线模式                                      |
| `--no-install`                       |         | 跳过依赖安装                             |
| `--gitInit`                          |         | 初始化 git 仓库                                |
| `--shell`                            |         | 在项目目录安装后启动 shell      |
| `--packageManager`                   |         | 包管理器选择（npm、pnpm、yarn、bun）            |
| `-M, --modules`                      |         | 要安装的 Nuxt 模块（用逗号分隔且不含空格） |
| `--no-modules`                       |         | 跳过模块安装提示                          |
| `--nightly`                          |         | 使用 Nuxt 夜间版本通道（3x 或 latest）          |
<!--/init-opts-->

## 环境变量

- `NUXI_INIT_REGISTRY`: 设置自定义模板注册表。（[了解更多](https://github.com/unjs/giget#custom-registry)）
  - 默认注册表从 [nuxt/starter/templates](https://github.com/nuxt/starter/tree/templates/templates) 加载。
