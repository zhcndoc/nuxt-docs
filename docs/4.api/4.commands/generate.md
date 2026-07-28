---
title: "nuxt generate"
description: 对应用的每个路由进行预渲染，并将结果以纯 HTML 文件的形式保存。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/generate.ts
    size: xs
---

<!--generate-cmd-->
```bash [Terminal]
npx nuxt generate [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--preset] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--profile[=verbose]]
```
<!--/generate-cmd-->

`generate` 命令对应用的每个路由进行预渲染，并将结果以纯 HTML 文件保存，可部署到任何静态托管服务。该命令会触发 `nuxt build` 命令，并将 `prerender` 参数设置为 `true`

## 参数

<!--generate-args-->
| 参数      | 描述                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认： `.`） |
<!--/generate-args-->

## 选项

<!--generate-opts-->
| 选项                                 | 默认值 | 描述                                                                                                                                               |
|--------------------------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `--cwd=<directory>`                  |        | 指定工作目录，这将优先于 ROOTDIR（默认：`.`）                                                                                                       |
| `--logLevel=<silent\|info\|verbose>` |        | 指定构建时日志级别                                                                                                                                |
| `--preset`                           |        | Nitro 服务器预设                                                                                                                                   |
| `--dotenv`                           |        | 要加载的 `.env` 文件路径，相对于根目录                                                                                                             |
| `--envName`                          |        | 用于解析配置覆盖项的环境（构建时默认为 `production`，运行开发服务器时默认为 `development`）                                                       |
| `-e, --extends=<layer-name>`         |        | 扩展一个 Nuxt 层                                                                                                                                     |
| `--profile` :badge[v4.4]{color="info" size="xs" class="align-middle"} |        | 性能分析。退出时会写入 V8 CPU 分析文件和 JSON 报告。使用 `--profile=verbose` 可输出完整的控制台报告。                                               |
<!--/generate-opts-->

::read-more{to="/docs/4.x/getting-started/deployment#static-hosting"}
阅读有关预渲染和静态托管的更多内容。
::
