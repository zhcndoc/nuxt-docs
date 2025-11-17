---
title: "defineNuxtComponent"
description: defineNuxtComponent() 是一个用于使用 Options API 定义类型安全组件的辅助函数。
links:
  - label: 源代码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` 是一个辅助函数，用于使用 Options API 定义类型安全的 Vue 组件，类似于 [`defineComponent()`](https://vue.zhcndoc.com/api/general#definecomponent)。`defineNuxtComponent()` 包装器还为组件选项添加了对 `asyncData` 和 `head` 的支持。
::

::note
在 Nuxt 中，推荐使用 `<script setup lang="ts">` 来声明 Vue 组件。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果你在应用中选择不使用 `setup()`，可以在组件定义中使用 `asyncData()` 方法：

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  asyncData () {
    return {
      data: {
        greetings: 'hello world!',
      },
    }
  },
})
</script>
```

## `head()`

如果你在应用中选择不使用 `setup()`，可以在组件定义中使用 `head()` 方法：

```vue [app/pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head (nuxtApp) {
    return {
      title: 'My site',
    }
  },
})
</script>
```
