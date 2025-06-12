---
title: 'nuxt dev'
description: dev 命令启动一个带有热模块替换的开发服务器，地址为 http://localhost:3000
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/packages/nuxi/src/commands/dev.ts
    size: xs
---

<!--dev-cmd-->
```bash [Terminal]
npx nuxt dev [ROOTDIR] [--cwd=<directory>] [--logLevel=<silent|info|verbose>] [--dotenv] [--envName] [--no-clear] [--no-fork] [-p, --port] [-h, --host] [--clipboard] [-o, --open] [--https] [--publicURL] [--qr] [--public] [--tunnel] [--sslCert] [--sslKey]
```
<!--/dev-cmd-->

`dev` 命令启动一个带有热模块替换的开发服务器，访问地址为 [http://localhost:3000](https://localhost:3000)

## 参数

<!--dev-args-->
参数 | 描述
--- | ---
`ROOTDIR="."` | 指定工作目录（默认: `.`）
<!--/dev-args-->

## 选项

<!--dev-opts-->
选项 | 默认值 | 描述
--- | --- | ---
`--cwd=<directory>` |  | 指定工作目录，优先级高于 ROOTDIR（默认: `.`）
`--logLevel=<silent\|info\|verbose>` |  | 指定构建时日志级别
`--dotenv` |  | 加载的 `.env` 文件路径，基于根目录
`--envName` |  | 解析配置覆盖时使用的环境（构建时默认是 `production`，运行开发服务器时默认是 `development`）
`--no-clear` |  | 禁用重启时清除控制台
`--no-fork` |  | 禁用 fork 模式
`-p, --port` |  | 监听端口（默认：`NUXT_PORT || NITRO_PORT || PORT || nuxtOptions.devServer.port`）
`-h, --host` |  | 监听主机（默认：`NUXT_HOST || NITRO_HOST || HOST || nuxtOptions._layers?.[0]?.devServer?.host`）
`--clipboard` | `false` | 将 URL 复制到剪贴板
`-o, --open` | `false` | 在浏览器中打开 URL
`--https` |  | 启用 HTTPS
`--publicURL` |  | 显示的公共 URL（用于二维码）
`--qr` |  | 可用时显示公共 URL 的二维码
`--public` |  | 监听所有网络接口
`--tunnel` |  | 使用 https://github.com/unjs/untun 打开隧道
`--sslCert` |  | （已废弃）请使用 `--https.cert`
`--sslKey` |  | （已废弃）请使用 `--https.key`
<!--/dev-opts-->

端口和主机也可以通过环境变量 NUXT_PORT、PORT、NUXT_HOST 或 HOST 设置。

除了上述选项外，`@nuxt/cli` 还可以将选项传递给 `listhen`，例如 `--no-qr` 来关闭开发服务器二维码。您可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 的所有选项。

该命令会将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果您在开发中使用自签名证书，需要在环境变量中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::