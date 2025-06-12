---
title: "nuxt devtools"
description: devtools 命令允许你在每个项目的基础上启用或禁用 Nuxt DevTools。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/devtools.ts
    size: xs
---

<!--devtools-cmd-->
```bash [Terminal]
npx nuxt devtools <COMMAND> [ROOTDIR] [--cwd=<directory>]
```
<!--/devtools-cmd-->

运行 `nuxt devtools enable` 将会全局安装 Nuxt DevTools，并在你所使用的特定项目中启用它。该偏好设置将保存在用户级别的 `.nuxtrc` 文件中。如果你想移除某个特定项目对 devtools 的支持，可以运行 `nuxt devtools disable`。

## 参数

<!--devtools-args-->
参数 | 说明
--- | ---
`COMMAND` | 要执行的命令（选项：<enable\|disable>）
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/devtools-args-->

## 选项

<!--devtools-opts-->
选项 | 默认值 | 说明
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，优先于 ROOTDIR 参数（默认：`.`）
<!--/devtools-opts-->

::read-more{icon="i-simple-icons-nuxtdotjs" to="https://devtools.nuxt.com" target="\_blank"}
阅读更多关于 **Nuxt DevTools** 的内容。
::