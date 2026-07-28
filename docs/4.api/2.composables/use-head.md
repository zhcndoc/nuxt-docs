---
title: useHead
description: useHead 可自定义 Nuxt 应用中各个页面的 head 属性。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/unjs/unhead/blob/main/packages/vue/src/composables.ts
    size: xs
---

## 用法

`useHead` 组合式函数允许你以编程和响应式的方式管理 head 标签，由 [Unhead](https://unhead.unjs.io) 提供支持。它让你可以自定义 HTML 文档中 `<head>` 部分的 meta 标签、链接、脚本和其他元素。

```vue [app/app.vue]
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
如果数据来自用户或其他不受信任的来源，我们建议你查看 [`useHeadSafe`](/docs/4.x/api/composables/use-head-safe)。
::

::note
`useHead` 的属性可以是动态的，支持 `ref`、`computed` 和 `reactive` 属性。`meta` 参数也可以接受一个返回对象的函数，从而让整个对象具有响应式。
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
   * 使用新的输入更新条目。
   *
   * 会先清除先前输入的任何副作用。
   */
  patch: (input: Input) => void
  /**
   * 销毁条目，将其从活动头信息中移除。
   *
   * 会排队执行移除副作用。
   */
  dispose: () => void
}
```

有关更详细的类型，请参见 [@unhead/schema](https://github.com/unjs/unhead/blob/main/packages/vue/src/types/schema.ts)。

## 参数

`meta`：一个接收 head 元数据属性的对象，用于自定义页面的 `<head>` 部分。所有属性都支持响应式值（`ref`、`computed`、`reactive`），或者可以是一个返回元数据对象的函数。

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `title` | `string` | 设置页面标题。 |
| `titleTemplate` | `string \| ((title?: string) => string)` | 配置一个动态模板来自定义页面标题。可以是带有 `%s` 占位符的字符串，或一个函数。 |
| `base` | `Base` | 设置文档的 `<base>` 标签。 |
| `link` | `Link[]` | 链接对象数组。每个元素都会映射为一个 `<link>` 标签，对象属性对应 HTML 属性。 |
| `meta` | `Meta[]` | 元对象数组。每个元素都会映射为一个 `<meta>` 标签，对象属性对应 HTML 属性。 |
| `style` | `Style[]` | 样式对象数组。每个元素都会映射为一个 `<style>` 标签，对象属性对应 HTML 属性。 |
| `script` | `Script[]` | 脚本对象数组。每个元素都会映射为一个 `<script>` 标签，对象属性对应 HTML 属性。 |
| `noscript` | `Noscript[]` | noscript 对象数组。每个元素都会映射为一个 `<noscript>` 标签，对象属性对应 HTML 属性。 |
| `htmlAttrs` | `HtmlAttributes` | 设置 `<html>` 标签的属性。每个对象属性都会映射到对应的属性。 |
| `bodyAttrs` | `BodyAttributes` | 设置 `<body>` 标签的属性。每个对象属性都会映射到对应的属性。 |

## 返回值

此组合函数不返回任何值。它会将 head 元数据注册到 Unhead，由 Unhead 管理实际的 DOM 更新。

## 示例

### 基本元标签

```vue [app/pages/about.vue]
<script setup lang="ts">
useHead({
  title: '关于我们',
  meta: [
    { name: 'description', content: '了解更多关于我们公司的信息' },
    { property: 'og:title', content: '关于我们' },
    { property: 'og:description', content: '了解更多关于我们公司的信息' },
  ],
})
</script>
```

### 响应式元标签

```vue [app/pages/profile.vue]
<script setup lang="ts">
const profile = ref({ name: 'John Doe' })

useHead({
  title: computed(() => profile.value.name),
  meta: [
    {
      name: 'description',
      content: computed(() => `个人资料页：${profile.value.name}`),
    },
  ],
})
</script>
```

### 使用函数实现完全响应式

```vue [app/pages/dynamic.vue]
<script setup lang="ts">
const count = ref(0)

useHead(() => ({
  title: `计数：${count.value}`,
  meta: [
    { name: 'description', content: `当前计数为 ${count.value}` },
  ],
}))
</script>
```

### 添加外部脚本和样式

```vue [app/pages/external.vue]
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

### body 和 HTML 属性

```vue [app/pages/themed.vue]
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

:read-more{to="/docs/4.x/getting-started/seo-meta"}
