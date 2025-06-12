---
title: "nuxt add"
description: "在您的 Nuxt 应用程序中生成实体骨架。"
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/add.ts
    size: xs
---

<!--add-cmd-->
```bash [Terminal]
npx nuxt add <TEMPLATE> <NAME> [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--force]
```
<!--/add-cmd-->

### 参数

<!--add-args-->
参数 | 描述
--- | ---
`TEMPLATE` | 指定生成的模板类型（选项：<api\|plugin\|component\|composable\|middleware\|layout\|page\|layer>）
`NAME` | 指定生成文件的名称
<!--/add-args-->

### 选项

<!--add-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` | `.` | 指定工作目录
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志等级
`--force` | `false` | 如果文件已存在，强制覆盖
<!--/add-opts-->

**修饰符：**

某些模板支持附加修饰符标记，以在名称后添加后缀（比如 `.client` 或 `.get`）。

```bash [Terminal]
# 生成 `/plugins/sockets.client.ts`
npx nuxt add plugin sockets --client
```

## `nuxt add component`

* 修饰符标记：`--mode client|server` 或 `--client` 或 `--server`

```bash [Terminal]
# 生成 `components/TheHeader.vue`
npx nuxt add component TheHeader
```

## `nuxt add composable`

```bash [Terminal]
# 生成 `composables/foo.ts`
npx nuxt add composable foo
```

## `nuxt add layout`

```bash [Terminal]
# 生成 `layouts/custom.vue`
npx nuxt add layout custom
```

## `nuxt add plugin`

* 修饰符标记：`--mode client|server` 或 `--client` 或 `--server`

```bash [Terminal]
# 生成 `plugins/analytics.ts`
npx nuxt add plugin analytics
```

## `nuxt add page`

```bash [Terminal]
# 生成 `pages/about.vue`
npx nuxt add page about
```

```bash [Terminal]
# 生成 `pages/category/[id].vue`
npx nuxt add page "category/[id]"
```

## `nuxt add middleware`

* 修饰符标记：`--global`

```bash [Terminal]
# 生成 `middleware/auth.ts`
npx nuxt add middleware auth
```

## `nuxt add api`

* 修饰符标记：`--method` （支持 `connect`, `delete`, `get`, `head`, `options`, `patch`, `post`, `put` 或 `trace`），或者你也可以直接使用 `--get`, `--post` 等。

```bash [Terminal]
# 生成 `server/api/hello.ts`
npx nuxt add api hello
```

## `nuxt add layer`

```bash [Terminal]
# 生成 `layers/subscribe/nuxt.config.ts`
npx nuxt add layer subscribe
```
