# 安全政策

## 报告漏洞

若要报告漏洞，请通过正确 GitHub 仓库中的 [Security 选项卡](https://github.com/nuxt/nuxt/security/advisories/new)私下报告（参见[文档](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability#privately-reporting-a-security-vulnerability)）。如果无法做到，也可以发送邮件至 **security@nuxtjs.org**。

所有安全漏洞都会得到及时验证和处理。

虽然发现新漏洞的情况并不常见，但我们仍建议始终使用 Nuxt 和其他依赖项的最新版本，并维护锁文件（`yarn.lock`、`package-lock.json`、`pnpm-lock.yaml` 和 `bun.lock`），以确保你的应用尽可能安全。

## 范围

Nuxt 构建在其他项目之上，每个项目都有自己的安全处理流程：

- [Nitro](https://github.com/nitrojs/nitro) - 服务器引擎
- [h3](https://github.com/h3js/h3) - Nitro 所基于的 HTTP 框架
- [Vue](https://github.com/vuejs/core) 和 [vue-router](https://github.com/vuejs/router) - 请参阅 [Vue 安全政策](https://vuejs.org/guide/best-practices/security.html#reporting-vulnerabilities)
- [unhead](https://github.com/unjs/unhead) - head/meta 管理
- [Vite](https://github.com/vitejs/vite) 和其他构建工具

如果漏洞明显存在于这些项目之一中，请直接向相应项目报告。如果你不确定边界在哪里，欢迎向 Nuxt 报告；我们与这些团队密切合作，会进行分类并转交。猜错也没关系。

**即使代码位于其他地方，集成错误也属于 Nuxt 的范围。** Nuxt 将这些层组合在一起，而它们之间的不匹配可能造成安全后果，且没有任何单一层对此负责。例如，`vue-router` 历来以不区分大小写的方式匹配路由，而 Nitro 的路由规则匹配器区分大小写，因此可以通过混合大小写的 URL 绕过基于 `routeRules` 的保护（[GHSA-mm7m-92g8-7m47](https://github.com/nuxt/nuxt/security/advisories/GHSA-mm7m-92g8-7m47)）。如果 Nuxt 组合其依赖项的方式造成了此类漏洞，这就是有效的 Nuxt 报告。

## 我们认定的有效漏洞

有效报告应表明：Nuxt 本身破坏了合理开发者会依赖的安全保证，且应用是按照我们的文档编写的。我们曾接受并修复的问题示例：

- 绕过 Nuxt 提供的、由服务器强制执行的访问控制机制
- SSR、负载缓存或共享服务器状态中的跨用户数据泄露
- 按照文档使用 Nuxt 自身的 API 和组件时发生的 XSS（例如 `<NuxtLink>`、`navigateTo`、head 组件）
- 通过 Nuxt 端点执行服务器端代码或耗尽资源
- 可被*远程*攻击者利用的开发服务器问题：恶意网站访问开发服务器、LAN 暴露，或向不应获得项目信息的来源泄露信息

针对最简、未经修改的 `nuxt` starter 项目提供可运行的概念验证（或清楚说明无法提供的原因），有助于我们更快地验证并修复问题。

## 范围之外的情况

我们希望为真正的问题留出处理空间，因此会明确说明哪些报告不会被接受：

- **存在漏洞的应用代码。** Nuxt 无法防御一开始就不安全的代码。如果概念验证要求应用作者做出我们的文档明确警告不要做的事情，那么这就不是 Nuxt 漏洞。例如：
  - 将不可信输入传递给 `v-html`、[`useHead`](https://nuxt.com/docs/4.x/api/composables/use-head) 中的 `innerHTML`（请使用 [`useHeadSafe`](https://nuxt.com/docs/4.x/api/composables/use-head-safe)），或 `<NuxtClientFallback>` 的 `placeholder`/`fallback` 属性
  - 使用 Vue 运行时编译器编译用户输入的模板（这等同于 `eval`）
  - 将密钥放入 `runtimeConfig.public`，或以其他方式将私有运行时配置渲染到客户端
  - 未经验证就将用户输入插入 `createError` 消息、重定向或动态组件解析（`<component :is>`、多态 `as` 属性）
  - 未验证任何由用户控制的内容，例如[传递给服务器组件的 props](https://nuxt.com/docs/4.x/guide/concepts/server-components)，这些 props 来自请求，必须视为不可信输入
- **文档中说明的信任边界和限制。** 某些行为明确属于开发者的责任，重申这些行为的报告不属于漏洞。例如，[服务器组件／岛屿 props](https://nuxt.com/docs/4.x/guide/concepts/server-components) 会作为 GET 查询参数发送（因此可能出现在访问日志、CDN 缓存和 `Referer` 标头中），并且渲染岛屿时不会运行路由中间件；[`<NuxtIsland>` 的 `source` prop](https://nuxt.com/docs/4.x/api/components/nuxt-island) 意味着完全信任远程服务器的 HTML，而 `dangerouslyLoadClientComponents` 从名称到设计都明确具有危险性。路由中间件是 DX 功能，而非安全边界：它也会在客户端运行，任何在客户端运行的内容都可以被用户覆盖，因此“我从自己的浏览器跳过了路由中间件”不属于漏洞（应在服务器上保护数据，因为用户无法篡改服务器上的数据）。同样，岛屿端点 URL 中的哈希用于防止缓存投毒，而非作为授权机制；任何能够访问该端点的人都可以渲染岛屿，因此，将哈希视为访问控制绕过的报告无效。证明 Nuxt **违反**其某项文档保证的报告有效；证明文档所述限制的报告则无效。
- **假设原型污染已经发生的攻击。** 如果概念验证一开始就污染了 `Object.prototype`（或以其他方式假定攻击者已经能在相关上下文中执行 JavaScript），那么漏洞存在于允许其发生的环节，而不在于 Nuxt 代码随后读取了被污染的属性。
- **没有 Nuxt 利用路径的依赖项 CVE。** 我们某个（传递）依赖项中的漏洞公告（由 `npm audit` 或扫描器报告）本身并不是 Nuxt 漏洞。我们会在日常维护中保持依赖项为最新版本。只有在你能证明 Nuxt 对该依赖项的使用方式会使漏洞在 Nuxt 应用中可被利用时，它才是有效报告。
- **缺少安全加固，而非安全保证遭到破坏。** 缺少安全标头、CSP、速率限制以及类似的纵深防御措施属于应用层面的问题，并非 Nuxt 漏洞。
- **需要已被攻陷的机器才能实施的攻击。** 如果概念验证以攻击者已在开发者或服务器的机器上运行任意代码或命令为前提，那么该机器已经被攻陷，Nuxt 并不是失效的安全边界。（如上所述，可被远程访问的开发服务器问题属于范围之内。）
- **Self-XSS，以及要求受害者攻击自己的问题**，例如将有效载荷粘贴到自己的开发者工具或配置中。
- **未经过分析就提交的自动化扫描器输出。** 明显由 LLM 或工具生成、在没有可运行复现的情况下断言存在漏洞，或将预期行为描述为缺陷的报告，会占用原本可用于处理真实报告的分类时间。反复提交低质量报告可能导致来自同一来源的后续报告被降低优先级。

如果你确实不确定某个问题是否符合条件，请谨慎起见，私下报告。我们宁愿对边界情况进行分类，也不愿遗漏真正的问题。
