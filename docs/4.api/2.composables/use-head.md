---
title: useHead
description: useHead 自定义你的 Nuxt 应用中各个页面的 head 属性。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## 用法

`useHead` 组合式函数允许你以编程和响应式的方式管理你的 head 标签，由 [Unhead](https://unhead.unjs.io) 提供支持。它让你可以自定义 HTML 文档 `<head>` 部分的 meta 标签、链接、脚本及其它元素。

```vue [app.vue]
<script setup lang="ts">
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
})
</script>
```

::warning
如果数据来自用户或其它不可信来源，我们建议你查看 [`useHeadSafe`](/docs/3.x/api/composables/use-head-safe)。
::

::note
`useHead` 的属性可以是动态的，支持传入 `ref`、`computed` 和 `reactive` 属性。`meta` 参数也可以接受返回对象的函数，从而使整个对象响应化。
::

## 类型

```ts [Signature]
export function useHead (meta: MaybeComputedRef<MetaObject>): ActiveHeadEntry<UseHeadInput>

interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}

interface ActiveHeadEntry<Input> {
  /**
   * Updates the entry with new input.
   *
   * Will first clear any side effects for previous input.
   */
  patch: (input: Input) => void
  /**
   * Dispose the entry, removing it from the active head.
   *
   * Will queue side effects for removal.
   */
  dispose: () => void
}
```

更多详细类型请参见 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)。

## 参数

`meta`：一个接受 head 元数据属性的对象，用来定制页面 `<head>` 部分。所有属性均支持响应式值（`ref`、`computed`、`reactive`），也可以是返回元数据对象的函数。

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `title` | `string` | 设置页面标题。 |
| `titleTemplate` | `string \| ((title?: string) => string)` | 配置动态模板自定义页面标题。可以是包含 `%s` 占位符的字符串或函数。 |
| `base` | `Base` | 设置文档的 `<base>` 标签。 |
| `link` | `Link[]` | 链接对象数组。每个元素映射为 `<link>` 标签，对象属性对应 HTML 属性。 |
| `meta` | `Meta[]` | 元信息对象数组。每个元素映射为 `<meta>` 标签，对象属性对应 HTML 属性。 |
| `style` | `Style[]` | 样式对象数组。每个元素映射为 `<style>` 标签，对象属性对应 HTML 属性。 |
| `script` | `Script[]` | 脚本对象数组。每个元素映射为 `<script>` 标签，对象属性对应 HTML 属性。 |
| `noscript` | `Noscript[]` | 无脚本对象数组。每个元素映射为 `<noscript>` 标签，对象属性对应 HTML 属性。 |
| `htmlAttrs` | `HtmlAttributes` | 设置 `<html>` 标签的属性。对象的每个属性对应相应的 HTML 属性。 |
| `bodyAttrs` | `BodyAttributes` | 设置 `<body>` 标签的属性。对象的每个属性对应相应的 HTML 属性。 |

## 返回值

此组合式函数无返回值。它将 head 元数据注册到 Unhead，Unhead 负责实际的 DOM 更新。

## 示例

### 基础 Meta 标签

```vue [pages/about.vue]
<script setup lang="ts">
useHead({
  title: '关于我们',
  meta: [
    { name: 'description', content: '了解更多关于我们的公司' },
    { property: 'og:title', content: '关于我们' },
    { property: 'og:description', content: '了解更多关于我们的公司' },
  ],
})
</script>
```

### 响应式 Meta 标签

```vue [pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: 'John Doe' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `个人主页 - ${profile.value.name}`),
    },
  ],
})
</script>
```

### 使用函数实现完全响应式

```vue [pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `计数: ${count.value}`,
  meta: [
    { name: 'description', content: `当前计数值是 ${count.value}` },
  ],
}))
</script>
```

### 添加外部脚本和样式

```vue [pages/external.vue]
<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.example.com/styles.css',
    },
  ],
  script: [
    {
      src: 'https://cdn.example.com/script.js',
      async: true,
    },
  ],
})
</script>
```

### 设置 Body 和 HTML 属性

```vue [pages/themed.vue]
<script setup lang="ts">
const isDark = ref(true)

useHead({
  htmlAttrs: {
    lang: 'en',
    class: computed(() => isDark.value ? 'dark' : 'light'),
  },
  bodyAttrs: {
    class: 'themed-page',
  },
})
</script>
```

:read-more{to="/docs/3.x/getting-started/seo-meta"}
