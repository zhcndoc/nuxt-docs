---
title: "defineNuxtComponent"
description: defineNuxtComponent() 是一个用于定义带有 Options API 的类型安全组件的辅助函数。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` 是一个辅助函数，用于使用类似于 [`defineComponent()`](https://vuejs.org/api/general.html#definecomponent) 的选项 API 定义类型安全的 Vue 组件。`defineNuxtComponent()` 包装器还支持 `asyncData` 和 `head` 组件选项。
::

::note
在 Nuxt 3 中，使用 `<script setup lang="ts">` 是推荐的声明 Vue 组件的方法。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果您选择不在您的应用程序中使用 `setup()`，您可以在组件定义中使用 `asyncData()` 方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  async asyncData() {
    return {
      data: {
        greetings: 'hello world!'
      }
    }
  },
})
</script>
```

## `head()`

如果您选择不在您的应用程序中使用 `setup()`，您可以在组件定义中使用 `head()` 方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: 'My site'
    }
  },
})
</script>
```
