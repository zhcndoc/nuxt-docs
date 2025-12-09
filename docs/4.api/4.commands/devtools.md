---
title: "nuxt 开发工具"
description: 该 devtools 命令允许你为每个项目启用或禁用 Nuxt DevTools。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

运行 `nuxt devtools enable` 会在全局安装 Nuxt DevTools，同时在你正在使用的特定项目中启用它。该设置会保存在用户级别的 `.nuxtrc` 偏好中。如果你想为某个特定项目移除 devtools 支持，可以运行 `nuxt devtools disable`。

## 参数

<!--devtools-args-->
| 参数      | 描述                                    |
|---------------|------------------------------------------------|
| `COMMAND`     | 要运行的命令（选项：<enable\|disable>）    |
| `ROOTDIR="."` | 指定工作目录（默认：`.`） |
<!--/devtools-args-->

## 选项

<!--devtools-opts-->
| 选项              | 默认 | 描述                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------|
| `--cwd=<directory>` |         | 指定工作目录，该选项优先于 ROOTDIR（默认：`.`） |
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
阅读有关 **Nuxt DevTools** 的更多内容。
::
