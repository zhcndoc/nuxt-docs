---
title: "nuxi module"
description: "使用命令行搜索并添加模块到你的 Nuxt 应用程序。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/module/
    size: xs
---

Nuxi 提供了几个工具，可以无缝地与 [Nuxt 模块](/modules) 合作。

## nuxi module add

```bash [Terminal]
npx nuxi module add <NAME>
```

选项        | 默认          | 描述
-------------------------|-----------------|------------------
`NAME` | - | 要安装的模块的名称。

该命令允许你在应用程序中安装 [Nuxt 模块](/modules)，无需手动操作。

运行命令时，它会：
- 使用你的包管理器安装模块
- 添加到你的 [package.json](/docs/guide/directory-structure/package) 文件中
- 更新你的 [`nuxt.config`](/docs/guide/directory-structure/nuxt-config) 文件

**示例：**

安装 [`Pinia`](/modules/pinia) 模块
```bash [Terminal]
npx nuxi module add pinia 
```

## nuxi module search

```bash [Terminal]
npx nuxi module search <QUERY>
```

选项        | 默认          | 描述
-------------------------|-----------------|------------------
`QUERY` | - | 要搜索的模块的名称。

该命令搜索与你的 Nuxt 版本兼容的 Nuxt 模块，以匹配你的查询。

**示例：**

```bash [Terminal]
npx nuxi module search pinia
```
