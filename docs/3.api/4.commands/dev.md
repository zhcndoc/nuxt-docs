---
title: 'nuxi dev'
description: 启动一个开发服务器，该服务器在 http://localhost:3000 提供热模块替换功能。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/cli/blob/main/src/commands/dev.ts
    size: xs
---

```bash [Terminal]
npx nuxi dev [rootDir] [--dotenv] [--log-level] [--clipboard] [--open, -o] [--no-clear] [--port, -p] [--host, -h] [--https] [--ssl-cert] [--ssl-key] [--tunnel]
```

`dev` 命令启动一个在 [http://localhost:3000](https://localhost:3000) 提供热模块替换功能的开发服务器。

选项        | 默认值            | 描述
-------------------------|-----------------|------------------
`rootDir` | `.` | 要服务的应用程序的根目录。
`--dotenv` | `.` | 指定另一个 `.env` 文件以加载，该文件**相对于**根目录。
`--open, -o` | `false` | 在浏览器中打开 URL。
`--clipboard` | `false` | 将 URL 复制到剪贴板。
`--no-clear` | `false` | 启动后不清除控制台。
`--port, -p` | `3000` | 监听的端口。
`--host, -h` | `localhost` | 服务器的主机名。
`--https` | `false` | 默认使用带有自签名证书的 https 协议监听。
`--ssl-cert` |`null` | 指定 https 的证书。
`--ssl-key` |`null` | 指定 https 证书的密钥。
`--tunnel` | `false` | 使用 [unjs/untun](https://github.com/unjs/untun) 将本地服务器隧道至互联网。

端口和主机也可以通过 NUXT_PORT、PORT、NUXT_HOST 或 HOST 环境变量设置。

除了上述选项之外，`nuxi` 还可以将选项传递给 `listhen`，例如 `--no-qr` 以关闭开发服务器的 QR 码。你可以在 [unjs/listhen](https://github.com/unjs/listhen) 文档中找到 `listhen` 选项列表。

此命令将 `process.env.NODE_ENV` 设置为 `development`。

::note
如果你在开发中使用自签名证书，你需要在环境中设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。
::
