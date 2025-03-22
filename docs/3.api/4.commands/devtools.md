---
title: "nuxi devtools"
description: devtools 命令允许你在每个项目的基础上启用或禁用 Nuxt DevTools。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [终端]
npx nuxi devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

运行 `nuxi devtools enable` 将全局安装 Nuxt DevTools，并且在你正在使用的特定项目内启用它。它会作为偏好保存到你的用户级 `.nuxtrc` 文件中。如果你想移除某个特定项目的 devtools 支持，可以运行 `nuxi devtools disable`。

## 参数

<!--devtools-args-->
参数 | 描述
--- | ---
`COMMAND` | 要运行的命令（选项：<enable\|disable>）
`ROOTDIR="."` | 指定工作目录（默认： `.`）
<!--/devtools-args-->

## 选项

<!--devtools-opts-->
选项 | 默认 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认： `.`）
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
阅读更多关于 **Nuxt DevTools** 的信息。
::