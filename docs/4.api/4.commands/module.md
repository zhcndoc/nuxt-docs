---
title: "nuxt 模块"
description: "通过命令行搜索并将模块添加到你的 Nuxt 应用。"
links:
  - label: 源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/tree/main/packages/nuxi/src/commands/module
    size: xs
---

Nuxt 提供了一些实用工具，可以无缝地与 [Nuxt 模块](/modules) 一起使用。

## nuxt module add

<!--module-add-cmd-->
```bash [Terminal]
npx nuxt module add <MODULENAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--skipInstall] [--skipConfig] [--dev]
```
<!--/module-add-cmd-->

<!--module-add-args-->
| Argument     | Description                                                         |
|--------------|---------------------------------------------------------------------|
| `MODULENAME` | 指定一个或多个要安装的模块名称，使用空格分隔 |
<!--/module-add-args-->

<!--module-add-opts-->
| Option                               | Default | Description                         |
|--------------------------------------|---------|-------------------------------------|
| `--cwd=<directory>`                  | `.`     | 指定工作目录       |
| `--logLevel=<silent\|info\|verbose>` |         | 指定构建时的日志级别        |
| `--skipInstall`                      |         | 跳过 npm 安装                    |
| `--skipConfig`                       |         | 跳过更新 nuxt.config.ts          |
| `--dev`                              |         | 将模块作为开发依赖安装 |
<!--/module-add-opts-->

该命令可让你在应用中安装 [Nuxt 模块](/modules)，无需手动操作。

运行该命令时，它将：

- 使用你的包管理器将模块安装为依赖项
- 将其添加到你的 [package.json](/docs/4.x/directory-structure/package) 文件中
- 更新你的 [`nuxt.config`](/docs/4.x/directory-structure/nuxt-config) 文件

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

<!--module-search-args-->
| Argument | Description            |
|----------|------------------------|
| `QUERY`  | 要搜索的关键字 |
<!--/module-search-args-->

### 选项

<!--module-search-opts-->
| Option                 | Default | Description                                                                        |
|------------------------|---------|------------------------------------------------------------------------------------|
| `--cwd=<directory>`    | `.`     | 指定工作目录                                                      |
| `--nuxtVersion=<2\|3>` |         | 按 Nuxt 版本过滤，仅列出兼容的模块（默认自动检测） |
<!--/module-search-opts-->

该命令会搜索与你的查询匹配并与当前 Nuxt 版本兼容的 Nuxt 模块。

**示例：**

```bash [Terminal]
npx nuxt module search pinia
```
