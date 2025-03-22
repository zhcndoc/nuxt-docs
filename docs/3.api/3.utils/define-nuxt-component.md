---
title: "defineNuxtComponent"
description: defineNuxtComponent() 是一个用于定义类型安全组件的辅助函数，采用选项 API。
links:
  - label: 来源
    icon: i-simple-icons-github
    to: https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/composables/component.ts
    size: xs
---

::note
`defineNuxtComponent()` 是一个用于定义类型安全 Vue 组件的辅助函数，使用的选项 API 类似于 [`defineComponent()`](https://vuejs.org/api/general.html#definecomponent)。`defineNuxtComponent()` 包装器还增加了对 `asyncData` 和 `head` 组件选项的支持。
::

::note
在 Nuxt 3 中，推荐使用 `<script setup lang="ts">` 声明 Vue 组件。
::

:read-more{to=/docs/getting-started/data-fetching}

## `asyncData()`

如果您选择不在应用中使用 `setup()`，可以在组件定义中使用 `asyncData()` 方法：

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

如果您选择不在应用中使用 `setup()`，可以在组件定义中使用 `head()` 方法：

```vue [pages/index.vue]
<script lang="ts">
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: '我的网站'
    }
  },
})
</script>
```