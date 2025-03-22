---
title: 'nuxi dev'
description: dev 命令在 http://localhost:3000 启动一个带热模块替换的开发服务器
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxi dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 命令在 [http://localhost:3000](https://localhost:3000) 启动一个带热模块替换的开发服务器。

## 参数

<!--dev-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认为 `.`）
<!--/dev-args-->

## 选项

<!--dev-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，优先于 ROOTDIR（默认为 `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时的日志级别
`--dotenv` |  | 加载的 `.env` 文件的路径，相对于根目录
`--envName` |  | 在解析配置覆盖时使用的环境（构建时默认为 `production`，运行开发服务器时默认为 `development`）
`--no-clear` |  | 禁用重启时清除控制台
`--no-fork` |  | 禁用分叉模式
`-p, --port` |  | 监听的端口（默认为 `NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`）
`-h, --host` |  | 监听的主机（默认为 `NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions._layers?.[0]?.devServer?.host`）
`--clipboard` | `false` | 将 URL 复制到剪贴板
`-o, --open` | `false` | 在浏览器中打开 URL
`--https` |  | 启用 HTTPS
`--publicURL` |  | 显示的公共 URL（用于二维码）
`--qr` |  | 当可用时显示公共 URL 的二维码
`--public` |  | 监听所有网络接口
`--tunnel` |  | 使用 https://github.com/unjs/untun 打开隧道
`--sslCert` |  | （已弃用）请使用 `--https.cert`。
`--sslKey` |  | （已弃用）请使用 `--https.key`。
<!--/dev-opts-->

端口和主机也可以通过 NUXT_PORT、PORT、NUXT_HOST 或 HOST 环境变量设置。

除了上述选项，`nuxi` 还可以将选项传递给 `listhen`，例如 `--no-qr` 可以关闭开发服务器的二维码。您可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 选项的列表。

此命令将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果您在开发中使用自签名证书，您需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::