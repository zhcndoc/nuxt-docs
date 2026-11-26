# 安全策略

## 报告漏洞

如需报告漏洞，请通过正确 GitHub 仓库的 [Security 选项卡](https://github.com/nuxt/nuxt/security/advisories/new)私下报告（参见[文档](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability#privately-reporting-a-security-vulnerability)）。如果无法通过此方式报告，也可以发送邮件至 **security@nuxtjs.org**。

所有安全漏洞都会得到及时验证和处理。

虽然发现新漏洞的情况并不常见，但我们仍建议始终使用 Nuxt 和其他依赖项的最新版本，并维护锁文件（`yarn.lock`、`package-lock.json`、`pnpm-lock.yaml` 和 `bun.lock`），以确保应用尽可能安全。

## 范围

Nuxt 构建于其他项目之上，这些项目各自拥有自己的安全处理流程：

- [Nitro](https://github.com/nitrojs/nitro) - 服务器引擎
- [h3](https://github.com/h3js/h3) - Nitro 所基于的 HTTP 框架
- [Vue](https://github.com/vuejs/core) 和 [vue-router](https://github.com/vuejs/router) - 请参阅 [Vue 安全策略](https://vuejs.org/guide/best-practices/security.html#reporting-vulnerabilities)
- [unhead](https://github.com/unjs/unhead) - head/meta 管理
- [Vite](https://github.com/vitejs/vite) 和其他构建工具

如果漏洞明确存在于其中某个项目，请直接向对应项目报告。如果你不确定问题属于哪个项目，欢迎向 Nuxt 报告；我们与这些团队密切合作，会对问题进行分类并转交。猜错也没关系。

**即使集成问题的代码位于其他地方，它仍属于 Nuxt 的报告范围。** Nuxt 将这些层组合在一起，而它们之间的不匹配可能造成安全影响，且没有任何单一层对此负责。例如，`vue-router` 历来不区分大小写地匹配路由，而 Nitro 的路由规则匹配器区分大小写，因此大小写混合的 URL 会导致页面正常渲染，却没有应用为该路径配置的服务端路由规则，例如 `redirect`、CSP 或 `X-Frame-Options` 标头，或 `proxy`（[GHSA-mm7m-92g8-7m47](https://github.com/nuxt/nuxt/security/advisories/GHSA-mm7m-92g8-7m47)）。如果 Nuxt 对其依赖项的组合造成了类似的漏洞，这就是有效的 Nuxt 漏洞报告。

## 我们认为有效的漏洞

有效的报告应表明：在按照我们的文档编写的应用中，Nuxt 本身破坏了合理的开发者会依赖的安全保障。我们接受并修复过的问题示例包括：

- 绕过 Nuxt 提供的、由服务器强制执行的访问控制机制
- SSR、负载缓存或共享服务器状态导致的跨用户数据泄露
- 按文档使用 Nuxt 自身的 API 和组件（例如 `<NuxtLink>`、`navigateTo` 和 head 组件）时发生 XSS
- Nuxt 自身处理请求时导致服务器端代码执行或资源耗尽（例如在渲染岛屿前解析或校验请求），而非组件使用请求输入执行的工作
- 开发服务器存在可被开发者未授权对象利用的问题：恶意网站通过开发者的浏览器访问开发服务器（跨源读取、DNS 重绑定）；开发服务器在开发者未主动暴露的情况下可从网络访问（例如在容器或 WSL 中，发布端口才会使其对外可见）；或开发服务器提供了其配置目录之外的文件

针对最小化且未修改的 `nuxt` 初始项目提供可运行的概念验证（或清楚说明为何无法提供）有助于我们更快地验证并修复问题。

## 不在范围内的事项

我们希望为真正的问题报告留出处理空间，因此会明确说明哪些报告不会被接受：

- **存在漏洞的应用代码。** Nuxt 无法防御本身就不安全的代码。如果概念验证要求应用作者执行文档明确警告不要做的操作，相关报告就不属于 Nuxt 漏洞。例如：
  - 将不可信输入传给 `v-html`、[`useHead`](https://nuxt.com/docs/4.x/api/composables/use-head) 中的 `innerHTML`（请使用 [`useHeadSafe`](https://nuxt.com/docs/4.x/api/composables/use-head-safe)），或 `<NuxtClientFallback>` 的 `placeholder`／`fallback` 属性
  - 使用 Vue 运行时编译器编译用户输入的模板（这等同于 `eval`）
  - 将机密信息放入 `runtimeConfig.public`，或以其他方式将私有运行时配置渲染到客户端
  - 未经校验便将用户输入插入 `createError` 消息、重定向或动态组件解析（`<component :is>`、多态 `as` 属性）
  - 未校验用户可控的内容，例如[传递给服务器组件的 props](https://nuxt.com/docs/4.x/guide/concepts/server-components)。这些内容来自请求，必须视为不可信输入；当其用于驱动循环或其他随数值增长的工作时，也必须校验其大小和数量级
- **文档中说明的信任边界和限制。** 某些行为明确属于开发者的责任，重述这些行为的报告不属于漏洞。例如，[服务器组件／岛屿的 props](https://nuxt.com/docs/4.x/guide/concepts/server-components) 会作为 GET 查询参数发送（因此可能出现在访问日志、CDN 缓存和 `Referer` 标头中），并且渲染岛屿时不会运行路由中间件；[`<NuxtIsland>` 的 `source` 属性](https://nuxt.com/docs/4.x/api/components/nuxt-island) 意味着完全信任远程服务器提供的 HTML，而 `dangerouslyLoadClientComponents` 从名称到设计都表明其具有危险性。路由中间件是改善开发体验的功能，而非安全边界：它也会在客户端运行，而用户可以覆盖任何在客户端运行的内容。因此，“我从自己的浏览器跳过了路由中间件”不属于漏洞；应在服务器上保护数据，避免用户篡改。同样，岛屿端点 URL 中的哈希用于防止缓存投毒，而非作为授权机制；任何能访问该端点的人都可以渲染岛屿，因此，将哈希视为可绕过访问控制的报告不属于有效报告。证明 Nuxt **违反**文档承诺的报告是有效的；证明文档所述限制的报告则不是。
- **页面前的路径范围服务器中间件。** Nitro 会按字面值和大小写匹配通过 `serverHandlers` 或 `addServerHandler` 注册的服务器中间件 `route`，并保留 `%2F` 等编码字符。页面路由器则可能忽略大小写，并会解码路由参数。因此，针对某个路径前缀注册的中间件，不一定会对该前缀下所有能渲染页面的 URL 生效（参见[自定义路由](https://nuxt.com/docs/4.x/guide/recipes/custom-routing#server-middleware-with-case-insensitive-routing)）。页面渲染时未运行此类中间件，不属于漏洞。请在返回受保护数据的服务器路由或 API 中执行访问检查。如果是 Nuxt 自身重写了请求路径，导致渲染页面的路径与 Nitro 匹配的路径不同，则属于报告范围。
- **访问已对外暴露的开发服务器的网络客户端。** `nuxt dev --host`、发布容器端口、隧道或 `--public` 都会让开发服务器在无身份验证的情况下可被访问，CLI 启动时会对此发出警告。任何能够访问该服务器的人都可以读取应用源码和项目中的其他文件，包括构建产物及其中内联的值。报告某个网络客户端能够读取特定文件，不属于漏洞。请勿将机密信息放入 `nuxt.config`，而应通过 `NUXT_*` 环境变量提供（参见[运行时配置](https://nuxt.com/docs/4.x/guide/going-further/runtime-config#environment-variables)）。
- **假设原型污染已经发生的攻击。** 如果概念验证一开始就污染了 `Object.prototype`（或假设攻击者已能在相关上下文中执行 JavaScript），那么漏洞在于允许这种情况发生的因素，而不在于 Nuxt 代码随后读取了被污染的属性。
- **没有 Nuxt 利用路径的依赖项 CVE。** 我们某个（传递）依赖项中的漏洞公告，即使由 `npm audit` 或扫描器报告，也不代表 Nuxt 本身存在漏洞。我们会在日常维护中保持依赖项更新。只有当你能证明 Nuxt 对该依赖项的使用方式使漏洞可在 Nuxt 应用中被利用时，它才属于有效报告。
- **缺少安全加固，而非安全保障失效。** 缺少安全标头、CSP、速率限制等纵深防御措施属于应用层面的问题，并非 Nuxt 漏洞。同样，Nuxt 在文档所述边界之上应用的限制（例如服务器组件中数值型 `v-for` 源的上限）属于纵深防御，而非安全保障。如果报告表明应用代码仍能利用不可信 props 执行无界工作，这不属于 Nuxt 漏洞。
- **需要已遭入侵的机器才能实施的攻击。** 如果概念验证一开始就要求攻击者在开发者或服务器的机器上运行任意代码或命令，那么该机器已经遭到入侵，Nuxt 并不是失效的安全边界。（如上所述，可被开发者未授权对象访问的开发服务器问题属于报告范围。）
- **自我 XSS，以及要求受害者攻击自己的问题**，例如要求受害者将有效载荷粘贴到自己的开发者工具或配置中。
- **未经分析便提交的自动扫描器输出。** 明显由 LLM 或工具生成、没有可运行复现却声称存在漏洞，或将预期行为描述为缺陷的报告，会占用本可用于处理真实报告的分类时间。反复提交低质量报告，可能导致今后来自同一来源的报告被降低处理优先级。

如果你确实不确定某个问题是否符合报告条件，请选择私下报告。我们宁愿对边界情况进行分类，也不愿漏掉真正的问题。
