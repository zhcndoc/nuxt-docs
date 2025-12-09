---
title: 'nuxt dev'
description: dev 命令在 http://localhost:3000 启动带有热模块替换的开发服务器
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [-e, --extends=<layer-name>] [--clear] [--no-f, --no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 命令在 [http://localhost:3000](https://localhost:3000) 启动带有热模块替换的开发服务器

## 参数

<!--dev-args-->
| Argument      | Description                                    |
|---------------|------------------------------------------------|
| `ROOTDIR="."` | 指定工作目录（默认：`.`） |
<!--/dev-args-->

## 选项

<!--dev-opts-->
Option | Default | Description
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，此选项优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dotenv` |  | 要加载的 `.env` 文件路径，相对于根目录
`--envName` |  | 用于解析配置覆盖的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
`-e, --extends=<layer-name>` |  | 从 Nuxt 层扩展
`--clear` | `false` | 在重启时清除控制台
`--no-f, --no-fork` |  | 禁用 fork 模式
`-p, --port` |  | 监听端口（默认：`NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`）
`-h, --host` |  | 监听主机（默认：`NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions.devServer?.host`）
`--clipboard` | `false` | 将 URL 复制到剪贴板
`-o, --open` | `false` | 在浏览器中打开该 URL
`--https` |  | 启用 HTTPS
`--publicURL` |  | 显示的公共 URL（用于二维码）
`--qr` |  | 在可用时显示公共 URL 的二维码
`--public` |  | 监听所有网络接口
`--tunnel` |  | 使用 https://github.com/unjs/untun 打开隧道
`--sslCert` |  | （已弃用）请改用 `--https.cert`
`--sslKey` |  | （已弃用）请改用 `--https.key`
<!--/dev-opts-->

端口和主机也可以通过环境变量 NUXT_PORT、PORT、NUXT_HOST 或 HOST 设置。

除了上述选项外，`@nuxt/cli` 还可以将选项传递给 `listhen`，例如 `--no-qr` 可关闭开发服务器的二维码。你可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 的可用选项列表。

此命令会将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果您在开发中使用自签名证书，则需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::
