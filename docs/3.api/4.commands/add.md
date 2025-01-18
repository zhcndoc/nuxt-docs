---
title: "nuxi add"
description: "为你的 Nuxt 应用生成一个实体。"
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxi add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### Arguments

<!--add-args-->
参数 | 描述
--- | ---
`TEMPLATE` | 指定要生成的文件的模板（选项：<api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>）
`NAME` | 指定将创建的文件的名称
<!--/add-args-->

### 选项

<!--add-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--force` | `false` | 如果文件已存在，强制覆盖
<!--/add-opts-->

**修饰符:**

一些模板支持额外的修饰符标志，以在其名称后添加一个后缀（如 `.client` 或 `.get`）。

```bash [Terminal]
# 生成 `/plugins/sockets.client.ts`
npx nuxi add plugin sockets --client
```

## `nuxi add component`

* 修饰符标志: `--mode client|server` 或 `--client` 或 `--server`

```bash [Terminal]
# 生成 `components/TheHeader.vue`
npx nuxi add component TheHeader
```

## `nuxi add composable`

```bash [Terminal]
# 生成 `composables/foo.ts`
npx nuxi add composable foo
```

## `nuxi add layout`

```bash [Terminal]
# 生成 `layouts/custom.vue`
npx nuxi add layout custom
```

## `nuxi add plugin`

* 修饰符标志: `--mode client|server` 或 `--client` 或 `--server`

```bash [Terminal]
# 生成 `plugins/analytics.ts`
npx nuxi add plugin analytics
```

## `nuxi add page`

```bash [Terminal]
# 生成 `pages/about.vue`
npx nuxi add page about
```

```bash [Terminal]
# 生成 `pages/category/[id].vue`
npx nuxi add page "category/[id]"
```

## `nuxi add middleware`

* 修饰符标志: `--global`

```bash [Terminal]
# 生成 `middleware/auth.ts`
npx nuxi add middleware auth
```

## `nuxi add api`

* 修饰符标志: `--method`（可以接受 `connect`、`delete`、`get`、`head`、`options`、`patch`、`post`、`put` 或 `trace`），或者你可以直接使用 `--get`、`--post` 等。

```bash [Terminal]
# 生成 `server/api/hello.ts`
npx nuxi add api hello
```

## `nuxi add layer`

```bash [Terminal]
# Generates `layers/subscribe/nuxt.config.ts`
npx nuxi add layer subscribe
```
