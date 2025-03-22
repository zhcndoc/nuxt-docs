---
title: "nuxi 模块"
description: "使用命令行搜索和添加模块到你的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/module/
    size: xs
---

Nuxi 提供了一些工具，以无缝的方式与 [Nuxt 模块](/modules) 一起工作。

## nuxi module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxi module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
参数 | 描述
--- | ---
`MODULENAME` | 模块名称
<!--/module-add-args-->

<!--module-add-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--skipInstall` |  | 跳过 npm 安装
`--skipConfig` |  | 跳过 nuxt.config.ts 更新
`--dev` |  | 将模块作为开发依赖安装
<!--/module-add-opts-->

此命令允许您在应用程序中安装 [Nuxt 模块](/modules)，无需手动工作。

运行此命令时，它将：

- 使用您的包管理器安装模块作为依赖
- 将其添加到您的 [package.json](/docs/guide/directory-structure/package) 文件中
- 更新您的 [`nuxt.config`](/docs/guide/directory-structure/nuxt-config) 文件

**示例：**

安装 [`Pinia`](/modules/pinia) 模块

```bash [Terminal]
npx nuxi module add pinia
```

## nuxi module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxi module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### 参数

<!--module-search-args-->
参数 | 描述
--- | ---
`QUERY` | 要搜索的关键字
<!--/module-search-args-->

### 选项

<!--module-search-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--nuxtVersion=<2\|3>` |  | 按 Nuxt 版本过滤，并仅列出兼容模块（默认自动检测）
<!--/module-search-opts-->

该命令会搜索与您的查询匹配并与您的 Nuxt 版本兼容的 Nuxt 模块。

**示例：**

```bash [Terminal]
npx nuxi module search pinia
```