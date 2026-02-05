---
title: "nuxt 模块"
description: "使用命令行搜索并添加模块到你的 Nuxt 应用。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/tree/main/packages/nuxi/src/commands/module
    size: xs
---

Nuxt 提供了一些工具，可以无缝地使用 [Nuxt 模块](/modules)。

## nuxt module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
参数 | 说明
--- | ---
`MODULENAME` | 指定一个或多个要安装的模块名称，多个模块名称用空格分隔
<!--/module-add-args-->

<!--module-add-opts-->
选项 | 默认值 | 说明
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--skipInstall` |  | 跳过 npm 安装
`--skipConfig` |  | 跳过更新 nuxt.config.ts 文件
`--dev` |  | 作为开发依赖安装模块
<!--/module-add-opts-->

此命令让你可以无需手动操作即可在应用中安装 [Nuxt 模块](/modules)。

执行命令时，会：

- 使用你的包管理器安装模块依赖
- 将模块添加到你的 [package.json](/docs/guide/directory-structure/package) 文件中
- 更新你的 [`nuxt.config`](/docs/guide/directory-structure/nuxt-config) 配置文件

**示例：**

安装 [`Pinia`](/modules/pinia) 模块

```bash [Terminal]
npx nuxt module add pinia
```

## nuxt module search

<!--module-search-cmd-->
```bash [Terminal]
npx nuxt module search <QUERY> [--cwd=<directory>] [--nuxtVersion=<2|3>]
```
<!--/module-search-cmd-->

### 参数

参数 | 说明
--- | ---
`QUERY` | 搜索关键词

### 选项

选项 | 默认值 | 说明
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--nuxtVersion=<2\|3>` |  | 按 Nuxt 版本筛选，仅列出兼容模块（默认自动检测）

此命令搜索与你的查询匹配且与你 Nuxt 版本兼容的 Nuxt 模块。

**示例：**

```bash [Terminal]
npx nuxt module search pinia
```