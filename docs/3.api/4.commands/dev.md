---
title: 'nuxi dev'
description: 启动一个开发服务器，该服务器在 http://localhost:3000 提供热模块替换功能。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxi dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 命令启动一个在 [http://localhost:3000](https://localhost:3000) 提供热模块替换功能的开发服务器。

## 参数

<!--dev-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认：`.`）
<!--/dev-args-->

## 选项

<!--dev-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，这优先于 ROOTDIR（默认：`.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dotenv` |  | 指向另一个环境配置文件，相对于根目录的 `.env` 文件。
`--envName` |  | 在解析配置覆盖时使用的环境（默认是 `production` 当构建时，和 `development` 当运行开发服务器时）
`--no-clear` |  | 禁用重新启动时的控制台清除
`--no-fork` |  | 禁用 fork 模式
`-p, --port` |  | 监听的端口（默认：`NUXT_PORT \|\| NITRO_PORT \|\| PORT \|\| nuxtOptions.devServer.port`）
`-h, --host` |  | 监听的主机（默认：`NUXT_HOST \|\| NITRO_HOST \|\| HOST \|\| nuxtOptions._layers?.[0]?.devServer?.host`）
`--clipboard` | `false` | 复制 URL 到剪贴板
`-o, --open` | `false` | 在浏览器中打开 URL
`--https` |  | 启用 HTTPS
`--publicURL` |  | 显示的公共 URL（用于 QR 码）
`--qr` |  | 显示公共 URL 的 QR 码
`--public` |  | 监听所有网络接口
`--tunnel` |  | 使用 https://github.com/unjs/untun 打开隧道
`--sslCert` |  | (DEPRECATED) 使用 `--https.cert` 代替。
`--sslKey` |  | (DEPRECATED) 使用 `--https.key` 代替。
<!--/dev-opts-->

端口和主机可以通过 `NUXT_PORT`, `PORT`, `NUXT_HOST` 或 `HOST` 环境变量设置。

此外，`nuxi` 可以传递选项给 `listhen`，例如 `--no-qr` 来关闭开发服务器的 QR 码。您可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 选项的列表。

此命令将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果您在开发中使用自签名证书，您需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::
