---
title: "defineNuxtComponent"
description: defineNuxtComponent() 是一个用于使用 Options API 定义类型安全组件的辅助函数。
links:
  - label: 源码
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` 是一个辅助函数，用于使用 Options API 定义类型安全的 Vue 组件，类似于 [`defineComponent()`](https://vue.zhcndoc.com/api/general.html#definecomponent)。`defineNuxtComponent()` 包装还为组件选项添加了对 `asyncData` 和 `head` 的支持。
::

::note
使用 `<script setup lang="ts">` 是在 Nuxt 中声明 Vue 组件的推荐方式。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果你选择不在应用中使用 `setup()`，你可以在组件定义中使用 `asyncData()` 方法：

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

如果你选择不在应用中使用 `setup()`，你可以在组件定义中使用 `head()` 方法：

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
