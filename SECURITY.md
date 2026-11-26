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

**即使集成问题的代码位于其他地方，它仍属于 Nuxt 的报告范围。** Nuxt 将这些层组合在一起，而它们之间的不匹配可能造成安全影响，且没有任何单一层对此负责。例如，`vue-router` 历来不区分大小写地匹配路由，而 Nitro 的路由规则匹配器区分大小写，因此大小写混合的 URL 会导致页面正常渲染，却没有应用为该路径配置的服务端路由规则，例如 `redirect`、CSP 或 `X-Frame-Options` 标头，或 `proxy`（[GHSA-mm7m-92g8-7m47](https://github.com/nuxt/nuxt/security/advisories/GHSA-mm7m-92g8-7m47)）。如果 Nuxt 对其依赖项的组合造成了类似的漏洞，这就是有效的 Nuxt 漏洞报告。

## 我们认定的有效漏洞

有效报告应表明：Nuxt 本身破坏了合理开发者会依赖的安全保证，且应用是按照我们的文档编写的。我们曾接受并修复的问题示例：

- Bypassing server-enforced access-control mechanisms Nuxt provides
- Cross-user data leakage in SSR, payload caching, or shared server state
- XSS through Nuxt's own APIs and components when used as documented (e.g. `<NuxtLink>`, `navigateTo`, head components)
- Server-side code execution or resource exhaustion in Nuxt's own handling of a request (e.g. parsing or validating an island request before rendering it), as opposed to work your components do with request input
- Dev-server issues exploitable by a party the developer has not given access to: a malicious website reaching the dev server through the developer's browser (cross-origin reads, DNS rebinding), the dev server becoming reachable from the network without the developer exposing it (inside a container or WSL, publishing a port is how you expose it), or files served from outside the directories the dev server is configured to serve

针对最简、未经修改的 `nuxt` starter 项目提供可运行的概念验证（或清楚说明无法提供的原因），有助于我们更快地验证并修复问题。

## 范围之外的情况

我们希望为真正的问题留出处理空间，因此会明确说明哪些报告不会被接受：

- **Vulnerable application code.** Nuxt cannot defend against code that is insecure in the first place. Reports whose proof of concept requires the app author to do something our documentation warns against are not Nuxt vulnerabilities. That includes, for example:
  - passing untrusted input to `v-html`, `innerHTML` in [`useHead`](https://nuxt.com/docs/4.x/api/composables/use-head) (use [`useHeadSafe`](https://nuxt.com/docs/4.x/api/composables/use-head-safe)), or the `placeholder`/`fallback` props of `<NuxtClientFallback>`
  - compiling templates from user input with the Vue runtime compiler (this is equivalent to `eval`),
  - putting secrets in `runtimeConfig.public`, or otherwise rendering private runtime config to the client
  - interpolating user input into `createError` messages, redirects, or dynamic component resolution (`<component :is>`, polymorphic `as` props) without validation
  - failing to validate anything that is user-controlled, such as [props passed to a server component](https://nuxt.com/docs/4.x/guide/concepts/server-components), which come from the request and must be treated as untrusted input, including their size and magnitude when they drive loops or other proportional work
- **Documented trust boundaries and limitations.** Some behaviours are explicitly documented as the developer's responsibility, and reports that restate them are not vulnerabilities. For example, [server component / island props](https://nuxt.com/docs/4.x/guide/concepts/server-components) are sent as GET query parameters (so they may appear in access logs, CDN caches, and `Referer` headers) and route middleware does not run when rendering islands; the [`source` prop of `<NuxtIsland>`](https://nuxt.com/docs/4.x/api/components/nuxt-island) means fully trusting the remote server's HTML, and `dangerouslyLoadClientComponents` is dangerous by name and by design. Route middleware is a DX feature, not a security boundary: it runs on the client as well, and anything running on the client can be overridden by the user, so "I skipped route middleware from my own browser" is not a vulnerability (protect data on the server, where the user cannot tamper with it). Similarly, the hash in island endpoint URLs exists to prevent cache poisoning, not to act as an authorisation mechanism; anyone who can reach the endpoint can render islands, and reports treating the hash as an access-control bypass are not valid. A report showing Nuxt *violating* one of its documented guarantees is valid; a report demonstrating a documented limitation is not.
- **Path-scoped server middleware in front of pages.** Nitro matches the `route` of server middleware registered with `serverHandlers` or `addServerHandler` literally and case-sensitively, with encoded characters such as `%2F` left encoded. The page router can ignore case and decodes route params, so a middleware registered for a path prefix does not run for every URL that renders a page under that prefix (see [custom routing](https://nuxt.com/docs/4.x/guide/recipes/custom-routing#server-middleware-with-case-insensitive-routing)). Reports that a page rendered without such a middleware running are not vulnerabilities. Check access in the server route or API that returns the protected data. If Nuxt itself rewrites the request path, so that the page it renders differs from the path Nitro matched, that is in scope.
- **Network clients of a dev server you have exposed.** `nuxt dev --host`, a published container port, a tunnel, or `--public` make the dev server reachable without authentication, and the CLI warns about this when it starts. Anyone who can reach it can read the app's source and other files in the project, including build output and any values inlined into it. Reports that such a client can read a particular file are not vulnerabilities. Keep secrets out of `nuxt.config` and provide them through `NUXT_*` environment variables instead (see [runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config#environment-variables)).
- **Attacks that assume prototype pollution has already occurred.** If the proof of concept starts by polluting `Object.prototype` (or otherwise assumes an attacker can already execute JavaScript in the relevant context), the vulnerability lies with whatever allowed that, not with Nuxt code that subsequently reads a polluted property.
- **Dependency CVEs without a Nuxt exploit path.** A vulnerability advisory in one of our (transitive) dependencies, reported by `npm audit` or a scanner, is not itself a Nuxt vulnerability. We keep dependencies up to date as part of normal maintenance. It becomes a valid report only if you can show that Nuxt's usage of the dependency makes the vulnerability exploitable in a Nuxt app.
- **Missing hardening, not broken guarantees.** Absence of security headers, CSP, rate limiting, and similar defence-in-depth measures are application-level concerns, not vulnerabilities in Nuxt. Likewise, limits Nuxt applies on top of a documented boundary (such as the cap on numeric `v-for` sources in server components) are defence in depth, not security guarantees: a report showing that application code can still do unbounded work with untrusted props is not a vulnerability.
- **Attacks that require an already-compromised machine.** If the proof of concept starts with the attacker running arbitrary code or commands on the developer's or server's machine, the machine is already compromised and Nuxt is not the boundary that failed. (Dev-server issues reachable by a party the developer has not given access to, as above, are in scope.)
- **Self-XSS and issues requiring the victim to attack themselves**, such as pasting a payload into their own devtools or config.
- **Automated scanner output submitted without analysis.** Reports that are clearly LLM- or tool-generated, assert a vulnerability without a working reproduction, or describe intended behaviour as a flaw consume triage time that would otherwise go to real reports. Repeated low-quality submissions may cause future reports from the same source to be deprioritised.

如果你确实不确定某个问题是否符合条件，请谨慎起见，私下报告。我们宁愿对边界情况进行分类，也不愿遗漏真正的问题。
